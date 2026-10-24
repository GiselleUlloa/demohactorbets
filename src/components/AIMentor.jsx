import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  User,
  Send,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Sliders,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../data/verifiedProjects.js';
import { sendMentorMessage } from '../services/aiClient.js';

const INITIAL_ASSISTANT_MESSAGE = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `¡Hola! Soy **OpenSource AI Mentor**, tu guía para realizar tu primera contribución en código abierto durante este Hacktoberfest en Barranquilla.

Puedo ayudarte a:
1. **Recomendar tipos de proyectos** según los lenguajes que conoces y tu nivel.
2. **Explicar conceptos clave** como *issues*, *forks*, *branches* y *pull requests*.
3. **Abordar una issue paso a paso** y entender archivos \`CONTRIBUTING.md\`.
4. **Darte tus próximos pasos** con repositorios verificados de GitHub sin inventar enlaces.

Cuéntame qué lenguajes estás aprendiendo o elige una de las preguntas sugeridas para empezar.`,
  meta: {
    verificationNote: 'Distingo entre recomendaciones pedagógicas generadas por IA y repositorios verificados de GitHub.'
  }
};

export function AIMentor({ aiStatus, initialQuestion, onClearInitialQuestion }) {
  const [messages, setMessages] = useState([INITIAL_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Perfil del estudiante para personalizar recomendaciones
  const [userProfile, setUserProfile] = useState({
    level: 'Principiante',
    languages: 'JavaScript, React',
    goal: 'Hacer mi primer Pull Request en Hacktoberfest'
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isLoading]);

  // Si el usuario pulsó "¿Cómo contribuir aquí?" desde una tarjeta de proyecto
  useEffect(() => {
    if (initialQuestion) {
      handleSendQuestion(initialQuestion);
      if (onClearInitialQuestion) onClearInitialQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  const handleSendQuestion = async questionText => {
    const textToSend = (questionText ?? input).trim();
    if (!textToSend || isLoading) return;

    setError('');
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const response = await sendMentorMessage({
        message: textToSend,
        userProfile
      });

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        meta: {
          live: response.live,
          provider: response.provider,
          modelId: response.modelId,
          warning: response.warning,
          verificationNote: response.verificationNote
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al consultar al asistente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([INITIAL_ASSISTANT_MESSAGE]);
    setInput('');
    setError('');
  };

  return (
    <section aria-labelledby="mentor-heading" className="space-y-6">
      {/* Cabecera del Mentor IA con estado de Gemma 4 */}
      <div className="rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-900 via-purple-800 to-emerald-900 p-6 text-white shadow-md sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Impulsado por Gemma 4 · Mentoría en Español</span>
            </div>
            <h2 id="mentor-heading" className="text-2xl font-extrabold sm:text-3xl">
              OpenSource AI Mentor
            </h2>
            <p className="max-w-2xl text-xs text-purple-100 sm:text-sm">
              Resuelve tus dudas sobre Git, GitHub, <em>good first issues</em> y cómo hacer tu primera contribución.
              El asistente distingue entre recomendaciones de IA y datos verificados de GitHub.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetConversation}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Nueva conversación</span>
          </button>
        </div>
      </div>

      {/* Layout en 2 columnas: Perfil + Preguntas sugeridas a la izquierda, Chat interactivo a la derecha */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Panel lateral: Perfil del usuario, Estado de Gemma 4 y Preguntas sugeridas */}
        <aside className="space-y-5 lg:col-span-4">
          {/* Tarjeta de perfil de conocimientos */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Sliders className="h-4 w-4 text-purple-700" />
              <h3>Tu perfil de desarrollador</h3>
            </div>
            <p className="mb-4 text-xs text-slate-500">
              Describe tus conocimientos para que el mentor adapte sus recomendaciones a tu nivel.
            </p>

            <div className="space-y-3">
              <div>
                <label htmlFor="profile-level" className="mb-1 block text-xs font-semibold text-slate-700">
                  Nivel de experiencia
                </label>
                <select
                  id="profile-level"
                  value={userProfile.level}
                  onChange={e => setUserProfile(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-none"
                >
                  <option value="Principiante">Principiante (Mi primera vez en Open Source)</option>
                  <option value="Intermedio">Intermedio (Conozco Git básico)</option>
                  <option value="Avanzado">Avanzado (Busco retos de arquitectura)</option>
                </select>
              </div>

              <div>
                <label htmlFor="profile-languages" className="mb-1 block text-xs font-semibold text-slate-700">
                  Lenguajes o tecnologías que conoces
                </label>
                <input
                  id="profile-languages"
                  type="text"
                  value={userProfile.languages}
                  onChange={e => setUserProfile(prev => ({ ...prev, languages: e.target.value }))}
                  placeholder="Ej. JavaScript, Python, HTML/CSS, Markdown..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  handleSendQuestion(
                    `Hola mentor, mi nivel es ${userProfile.level} y conozco ${
                      userProfile.languages || 'programación básica'
                    }. ¿Qué tipo de proyectos puedo explorar y cuáles son mis próximos pasos?`
                  )
                }
                className="w-full rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
              >
                Recomiéndame según mi perfil
              </button>
            </div>
          </div>

          {/* Preguntas sugeridas requeridas */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
              <HelpCircle className="h-4 w-4 text-purple-700" />
              <h3>Preguntas sugeridas</h3>
            </div>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map(question => (
                <button
                  key={question}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendQuestion(question)}
                  className="rounded-xl border border-purple-100 bg-purple-50/60 px-3 py-2 text-left text-xs font-medium text-purple-900 transition hover:border-purple-300 hover:bg-purple-100/70 disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Nota de transparencia y verificación */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950">
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-emerald-900">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>Verificación contra alucinaciones</span>
            </div>
            <p className="leading-relaxed text-emerald-800">
              <strong>OpenSource AI Mentor</strong> no inventa enlaces, repositorios ni números de issues.
              Solo enlaza a repositorios verificados de GitHub e identifica el estado real del modelo:{' '}
              <span className="font-semibold underline">
                {aiStatus?.live ? `Gemma 4 Activo (${aiStatus.modelId})` : 'Modo Demostración Educativo'}
              </span>.
            </p>
          </div>
        </aside>

        {/* Ventana principal de Chat */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-8">
          {/* Lista de mensajes */}
          <div className="max-h-[540px] min-h-[420px] flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {messages.map(msg => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isUser
                        ? 'bg-purple-700 text-white'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-5 w-5" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-purple-700 text-white'
                        : 'border border-slate-200 bg-slate-50/80 text-slate-800'
                    }`}
                  >
                    {/* Badge superior en mensajes del asistente */}
                    {!isUser && (
                      <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-1.5 text-[11px]">
                        <span className="font-bold text-purple-800">OpenSource AI Mentor</span>
                        {msg.meta?.live ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">
                            <CheckCircle2 className="h-3 w-3" />
                            Gemma 4 ({msg.meta.modelId})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 font-semibold text-purple-800">
                            Guía Verificada / Modo Demo
                          </span>
                        )}
                      </div>
                    )}

                    {/* Contenido formateado con saltos de línea legibles */}
                    <div className="whitespace-pre-line">{msg.content}</div>

                    {/* Aviso o nota de verificación */}
                    {!isUser && msg.meta?.warning && (
                      <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[11px] text-amber-900">
                        {msg.meta.warning}
                      </div>
                    )}
                    {!isUser && msg.meta?.verificationNote && (
                      <div className="mt-2 border-t border-slate-200/70 pt-1.5 text-[11px] text-slate-500">
                        {msg.meta.verificationNote}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Indicador de carga */}
            {isLoading && (
              <div className="flex items-center gap-3 text-xs font-medium text-purple-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-200 bg-purple-50">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-700" />
                </div>
                <div className="rounded-2xl border border-purple-100 bg-purple-50/70 px-4 py-2.5">
                  OpenSource AI Mentor (Gemma 4) está preparando tu guía en español...
                </div>
              </div>
            )}

            {/* Mensaje de error si ocurre */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-800"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de entrada de chat */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendQuestion();
            }}
            className="border-t border-slate-200 bg-slate-50/60 p-3.5 sm:p-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe tu duda sobre open source, Git, issues o pull requests..."
                aria-label="Escribe tu pregunta para OpenSource AI Mentor"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Enviar</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
