import { generateStructuredMentorFallback, validateMentorInput } from './mentorPrompt.js';

/**
 * Consulta al backend local el estado real de Gemma 4 (Ollama / Google AI Studio / Modo Demo).
 */
export async function fetchAiStatus() {
  try {
    const res = await fetch('/api/ai/status');
    if (!res.ok) throw new Error('Estado no disponible');
    return await res.json();
  } catch {
    return {
      live: false,
      provider: 'demo',
      modelId: 'modo-demostracion-educativo',
      label: 'Modo Demostración (Backend IA sin configurar)'
    };
  }
}

/**
 * Envía el mensaje del usuario al backend seguro de Gemma 4 (/api/ai/chat).
 * Si el servidor estático no tiene el middleware activo, responde con el modo demostración identificado.
 */
export async function sendMentorMessage({ message, userProfile, forceDemo = false }) {
  const validation = validateMentorInput({ message, userProfile });
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: validation.message,
        userProfile: validation.userProfile,
        forceDemo
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || 'Error al procesar la consulta en el asistente.');
    }
    return data;
  } catch (err) {
    // Si es un error de validación lo propagamos para mostrar alerta en el chat
    if (err.message.includes('Por favor escribe') || err.message.includes('límite máximo')) {
      throw err;
    }

    // Fallback seguro si se ejecuta en un hosting estático sin backend Node
    return {
      reply: generateStructuredMentorFallback(validation.message, validation.userProfile),
      live: false,
      provider: 'demo',
      modelId: 'modo-demostracion-educativo',
      warning: 'Modo Demostración activo (el servidor de inferencia no está disponible en este momento).',
      verificationNote: 'Guía del Modo Demostración con enlaces verificados de GitHub.'
    };
  }
}
