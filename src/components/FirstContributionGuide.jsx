import React from 'react';
import {
  GitFork,
  GitBranch,
  GitPullRequest,
  MessageSquarePlus,
  Terminal,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CONTRIBUTION_STEPS } from '../data/verifiedProjects.js';

const CONCEPTS = [
  {
    term: 'Issue (Incidencia)',
    icon: MessageSquarePlus,
    color: 'text-purple-700 bg-purple-100',
    definition:
      'Es una tarea, reporte de error o propuesta de mejora dentro de un repositorio. Busca siempre la etiqueta "good first issue" para empezar.'
  },
  {
    term: 'Fork (Bifurcación)',
    icon: GitFork,
    color: 'text-emerald-700 bg-emerald-100',
    definition:
      'Es tu copia personal del repositorio en tu propia cuenta de GitHub. Allí puedes hacer cambios con total libertad sin afectar el proyecto original.'
  },
  {
    term: 'Branch (Rama)',
    icon: GitBranch,
    color: 'text-purple-700 bg-purple-100',
    definition:
      'Es una línea de trabajo independiente dentro de tu repositorio. Crear una rama para cada tarea mantiene tu código ordenado.'
  },
  {
    term: 'Pull Request (PR)',
    icon: GitPullRequest,
    color: 'text-emerald-700 bg-emerald-100',
    definition:
      'Es la solicitud formal que envías a los mantenedores del proyecto original para que revisen tus cambios y los fusionen (merge).'
  }
];

export function FirstContributionGuide({ onGoToMentorWithQuestion }) {
  return (
    <section aria-labelledby="first-contribution-heading" className="space-y-8">
      {/* Encabezado de la sección educativa */}
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-900 via-emerald-800 to-purple-900 p-6 text-white shadow-md sm:p-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-200">
          Guía Interactiva Paso a Paso
        </span>
        <h2 id="first-contribution-heading" className="mt-3 text-2xl font-extrabold sm:text-3xl">
          Tu primera contribución
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-100">
          Aprende el flujo universal de colaboración en GitHub utilizado en Hacktoberfest y en equipos de ingeniería de todo el mundo.
        </p>
      </div>

      {/* Diccionario visual de los 4 conceptos fundamentales */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          1. Los 4 conceptos clave que debes dominar
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONCEPTS.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.term}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{item.term}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {item.definition}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ruta paso a paso con comandos Git */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-slate-900">
          2. Ruta práctica en 4 pasos para tu primer Pull Request
        </h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CONTRIBUTION_STEPS.map(item => (
            <div
              key={item.step}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-700 text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 space-y-2.5">
                <div className=" flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 font-mono text-xs text-emerald-300">
                  <Terminal className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                  <span className="overflow-x-auto">{item.command}</span>
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-purple-50/70 p-2.5 text-xs text-purple-950">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-700" />
                  <span>{item.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Llamado a la acción hacia el Mentor IA */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple-200 bg-purple-50/80 p-5">
        <div>
          <h3 className="text-sm font-bold text-purple-950">
            ¿Encontraste un archivo CONTRIBUTING.md difícil de entender?
          </h3>
          <p className="text-xs text-purple-800">
            Pídele a OpenSource AI Mentor que te explique cómo configurar el proyecto y abordar una issue paso a paso.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            onGoToMentorWithQuestion(
              '¿Cómo abordo una issue paso a paso y qué debo revisar en el archivo CONTRIBUTING.md?'
            )
          }
          className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-purple-800"
        >
          <span>Preguntar al Mentor IA</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
