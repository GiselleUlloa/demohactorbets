import {
  SYSTEM_PROMPT,
  validateMentorInput,
  generateStructuredMentorFallback,
  buildUserPrompt
} from '../src/services/mentorPrompt.js';

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 50_000) {
        reject(new Error('Payload demasiado grande'));
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

/**
 * Consulta si Ollama está activo localmente y si tiene un modelo Gemma 4 disponible.
 */
async function checkOllamaStatus(baseUrl, configuredModel) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const resp = await fetch(`${baseUrl}/api/tags`, { signal: controller.signal });
    clearTimeout(timer);
    if (!resp.ok) return { available: false };
    const data = await resp.json();
    const models = Array.isArray(data?.models) ? data.models : [];
    const exact = models.find(m => m.name === configuredModel || m.model === configuredModel);
    const anyGemma4 = models.find(m => (m.name || '').toLowerCase().includes('gemma4'));
    const chosen = exact?.name || anyGemma4?.name || null;
    return {
      available: Boolean(chosen),
      modelId: chosen || configuredModel,
      allModels: models.map(m => m.name)
    };
  } catch {
    return { available: false };
  }
}

/**
 * Llama a Gemma 4 a través de Ollama local (/api/chat).
 */
async function callOllamaGemma4({ baseUrl, modelId, message, userProfile }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: modelId,
        stream: false,
        options: {
          temperature: 0.4,
          num_predict: 700
        },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(message, userProfile) }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Ollama respondió con estado ${response.status}: ${errText.slice(0, 140)}`);
    }

    const data = await response.json();
    const reply = data?.message?.content?.trim();
    if (!reply) {
      throw new Error('El modelo Gemma 4 en Ollama devolvió una respuesta vacía.');
    }
    return reply;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Llama a Gemma 4 a través de Google AI Studio / Gemini API (models/{model}:generateContent).
 */
async function callGoogleGemma4({ apiKey, modelId, message, userProfile }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      modelId
    )}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: buildUserPrompt(message, userProfile) }]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800
        }
      })
    });

    if (response.status === 429) {
      throw new Error('Se alcanzó el límite de cuota (Rate Limit 429) en Google AI Studio.');
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Google AI Studio respondió con estado ${response.status}: ${errText.slice(0, 140)}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map(p => p.text || '')
      .join('\n')
      .trim();

    if (!reply) {
      throw new Error('Google AI Studio devolvió una respuesta vacía.');
    }
    return reply;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Plugin Vite que expone endpoints seguros de backend (/api/ai/status, /api/ai/chat, /api/github/search)
 * manteniendo las credenciales en el servidor Node y nunca en el navegador.
 */
export function createGemmaApiPlugin(env = {}) {
  const getSettings = () => ({
    providerPref: (env.GEMMA_PROVIDER || process.env.GEMMA_PROVIDER || 'auto').toLowerCase(),
    ollamaBaseUrl: env.OLLAMA_BASE_URL || process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    ollamaModel: env.OLLAMA_MODEL || process.env.OLLAMA_MODEL || 'gemma4:e4b',
    geminiApiKey: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
    geminiModel: env.GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemma-4-31b-it',
    githubToken: env.GITHUB_TOKEN || process.env.GITHUB_TOKEN || ''
  });

  return {
    name: 'opensource-finder-gemma4-backend',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // 1. Endpoint de estado real de Gemma 4
        if (url === '/api/ai/status' && req.method === 'GET') {
          const settings = getSettings();

          if (settings.providerPref === 'demo') {
            return sendJson(res, 200, {
              live: false,
              provider: 'demo',
              modelId: 'modo-demostracion-educativo',
              label: 'Modo Demostración (Sin conexión a IA externa)',
              officialIds: {
                ollama: ['gemma4:e4b', 'gemma4:e2b', 'gemma4:12b', 'gemma4:26b-a4b', 'gemma4:31b'],
                geminiApi: ['gemma-4-31b-it', 'gemma-4-26b-a4b-it', 'gemma-4-4b-it'],
                huggingFace: ['google/gemma-4-31b-it', 'google/gemma-4-26b-a4b-it', 'google/gemma-4-12b-it', 'google/gemma-4-e4b-it']
              }
            });
          }

          if (settings.providerPref === 'ollama' || settings.providerPref === 'auto') {
            const ollamaCheck = await checkOllamaStatus(settings.ollamaBaseUrl, settings.ollamaModel);
            if (ollamaCheck.available) {
              return sendJson(res, 200, {
                live: true,
                provider: 'ollama',
                modelId: ollamaCheck.modelId,
                label: `Gemma 4 Activo (${ollamaCheck.modelId} vía Ollama local)`,
                officialIds: {
                  ollama: ['gemma4:e4b', 'gemma4:e2b', 'gemma4:12b', 'gemma4:26b-a4b', 'gemma4:31b'],
                  geminiApi: ['gemma-4-31b-it', 'gemma-4-26b-a4b-it', 'gemma-4-4b-it'],
                  huggingFace: ['google/gemma-4-31b-it', 'google/gemma-4-26b-a4b-it', 'google/gemma-4-12b-it', 'google/gemma-4-e4b-it']
                }
              });
            }
          }

          if ((settings.providerPref === 'google' || settings.providerPref === 'auto') && settings.geminiApiKey) {
            return sendJson(res, 200, {
              live: true,
              provider: 'google',
              modelId: settings.geminiModel,
              label: `Gemma 4 Activo (${settings.geminiModel} vía Google AI Studio)`,
              officialIds: {
                ollama: ['gemma4:e4b', 'gemma4:e2b', 'gemma4:12b', 'gemma4:26b-a4b', 'gemma4:31b'],
                geminiApi: ['gemma-4-31b-it', 'gemma-4-26b-a4b-it', 'gemma-4-4b-it'],
                huggingFace: ['google/gemma-4-31b-it', 'google/gemma-4-26b-a4b-it', 'google/gemma-4-12b-it', 'google/gemma-4-e4b-it']
              }
            });
          }

          return sendJson(res, 200, {
            live: false,
            provider: 'demo',
            modelId: 'modo-demostracion-educativo',
            label: 'Modo Demostración (Configura Ollama o GEMINI_API_KEY para Gemma 4 en vivo)',
            officialIds: {
              ollama: ['gemma4:e4b', 'gemma4:e2b', 'gemma4:12b', 'gemma4:26b-a4b', 'gemma4:31b'],
              geminiApi: ['gemma-4-31b-it', 'gemma-4-26b-a4b-it', 'gemma-4-4b-it'],
              huggingFace: ['google/gemma-4-31b-it', 'google/gemma-4-26b-a4b-it', 'google/gemma-4-12b-it', 'google/gemma-4-e4b-it']
            }
          });
        }

        // 2. Endpoint de conversación con OpenSource AI Mentor (Gemma 4)
        if (url === '/api/ai/chat' && req.method === 'POST') {
          let body;
          try {
            body = await readJsonBody(req);
          } catch (err) {
            return sendJson(res, 400, { error: err.message || 'Solicitud mal formada.' });
          }

          const validation = validateMentorInput(body);
          if (!validation.valid) {
            return sendJson(res, 400, { error: validation.error });
          }

          const settings = getSettings();
          const forceDemo = body.forceDemo === true || settings.providerPref === 'demo';

          if (!forceDemo) {
            // Intentar Ollama local primero si está en 'auto' o 'ollama'
            if (settings.providerPref === 'ollama' || settings.providerPref === 'auto') {
              const ollamaCheck = await checkOllamaStatus(settings.ollamaBaseUrl, settings.ollamaModel);
              if (ollamaCheck.available) {
                try {
                  const reply = await callOllamaGemma4({
                    baseUrl: settings.ollamaBaseUrl,
                    modelId: ollamaCheck.modelId,
                    message: validation.message,
                    userProfile: validation.userProfile
                  });
                  return sendJson(res, 200, {
                    reply,
                    live: true,
                    provider: 'ollama',
                    modelId: ollamaCheck.modelId,
                    verificationNote: 'Respuesta generada en vivo por Gemma 4 (' + ollamaCheck.modelId + '). Los repositorios recomendados provienen del catálogo verificado de GitHub.'
                  });
                } catch (err) {
                  // Si el usuario forzó explícitamente 'ollama', informamos del error además de entregar respaldo educativo
                  const fallback = generateStructuredMentorFallback(validation.message, validation.userProfile);
                  return sendJson(res, 200, {
                    reply: fallback,
                    live: false,
                    provider: 'demo-fallback',
                    modelId: 'modo-demostracion-educativo',
                    warning: `Aviso: No se pudo completar la inferencia con Ollama (${err.message}). Se muestra la guía del Modo Demostración.`,
                    verificationNote: 'Respuesta del Modo Demostración Educativo con enlaces verificados de GitHub.'
                  });
                }
              }
            }

            // Intentar Google AI Studio si hay GEMINI_API_KEY
            if ((settings.providerPref === 'google' || settings.providerPref === 'auto') && settings.geminiApiKey) {
              try {
                const reply = await callGoogleGemma4({
                  apiKey: settings.geminiApiKey,
                  modelId: settings.geminiModel,
                  message: validation.message,
                  userProfile: validation.userProfile
                });
                return sendJson(res, 200, {
                  reply,
                  live: true,
                  provider: 'google',
                  modelId: settings.geminiModel,
                  verificationNote: `Respuesta generada en vivo por Gemma 4 (${settings.geminiModel} vía Google AI Studio).`
                });
              } catch (err) {
                const fallback = generateStructuredMentorFallback(validation.message, validation.userProfile);
                return sendJson(res, 200, {
                  reply: fallback,
                  live: false,
                  provider: 'demo-fallback',
                  modelId: 'modo-demostracion-educativo',
                  warning: `Aviso: Error al consultar Google AI Studio (${err.message}). Se muestra la guía del Modo Demostración.`,
                  verificationNote: 'Respuesta del Modo Demostración Educativo con enlaces verificados de GitHub.'
                });
              }
            }
          }

          // Modo Demostración transparente cuando no se ha configurado proveedor o se eligió Demo
          const demoReply = generateStructuredMentorFallback(validation.message, validation.userProfile);
          return sendJson(res, 200, {
            reply: demoReply,
            live: false,
            provider: 'demo',
            modelId: 'modo-demostracion-educativo',
            verificationNote: 'Modo Demostración Educativo activo (sin simulación de conexión en vivo). Todos los enlaces corresponden a repositorios verificados de GitHub.'
          });
        }

        // 3. Endpoint opcional para sincronizar conteo real de estrellas desde la API pública de GitHub
        if (url === '/api/github/verify' && req.method === 'GET') {
          const query = new URL(req.url, 'http://localhost').searchParams;
          const repo = query.get('repo') || '';
          if (!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repo)) {
            return sendJson(res, 400, { error: 'Formato de repositorio inválido. Usa owner/repo.' });
          }

          const settings = getSettings();
          const headers = {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'OpenSource-Finder-AI-Hacktoberfest'
          };
          if (settings.githubToken) {
            headers.Authorization = `Bearer ${settings.githubToken}`;
          }

          try {
            const ghRes = await fetch(`https://api.github.com/repos/${repo}`, { headers });
            if (!ghRes.ok) {
              return sendJson(res, ghRes.status, {
                verified: false,
                error: `GitHub API devolvió estado ${ghRes.status}`
              });
            }
            const ghData = await ghRes.json();
            return sendJson(res, 200, {
              verified: true,
              fullName: ghData.full_name,
              stars: ghData.stargazers_count,
              openIssues: ghData.open_issues_count,
              language: ghData.language,
              htmlUrl: ghData.html_url
            });
          } catch (err) {
            return sendJson(res, 503, {
              verified: false,
              error: `No fue posible conectar con api.github.com: ${err.message}`
            });
          }
        }

        next();
      });
    }
  };
}
