import React from 'react';
import {
  Star,
  GitFork,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Bot,
  Code2,
  Lightbulb
} from 'lucide-react';

const DIFFICULTY_STYLES = {
  Principiante: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Intermedio: 'border-purple-200 bg-purple-50 text-purple-800',
  Avanzado: 'border-amber-200 bg-amber-50 text-amber-900'
};

export function ProjectCard({ project, isFavorite, onToggleFavorite, onAskMentorAboutProject }) {
  const badgeStyle = DIFFICULTY_STYLES[project.difficulty] || DIFFICULTY_STYLES.Principiante;

  const formatStars = count => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return String(count);
  };

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md">
      <div>
        {/* Cabecera: Verificación + Favorito */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              {project.verifiedSource}
            </span>
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeStyle}`}>
              {project.difficulty}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(project.id)}
            aria-label={isFavorite ? `Quitar ${project.name} de favoritos` : `Guardar ${project.name} en favoritos`}
            className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
              isFavorite
                ? 'border-purple-300 bg-purple-100 text-purple-900'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-800'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isFavorite ? 'fill-purple-700 text-purple-700' : ''}`} />
            <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
          </button>
        </div>

        {/* Título y repositorio completo */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700">
          {project.name}
        </h3>
        <p className="mb-2.5 font-mono text-xs text-slate-500">{project.fullName}</p>

        {/* Descripción */}
        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        {/* Consejo rápido de contribución */}
        <div className="mb-4 rounded-xl border border-purple-100 bg-purple-50/50 p-3 text-xs text-slate-700">
          <div className="mb-1 flex items-center gap-1.5 font-semibold text-purple-900">
            <Lightbulb className="h-3.5 w-3.5 text-purple-700" />
            <span>Tip para tu primer PR:</span>
          </div>
          <p className="leading-relaxed">{project.contributionTip}</p>
        </div>
      </div>

      <div>
        {/* Metadatos: Lenguaje, Estrellas, Good First Issues */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
            <Code2 className="h-4 w-4 text-purple-600" />
            {project.language}
          </span>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-medium text-slate-600" title="Estrellas en GitHub">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              {formatStars(project.stars)}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800"
              title="Issues amigables para principiantes"
            >
              <GitFork className="h-3.5 w-3.5 text-emerald-600" />
              {project.goodFirstIssues} good first issues
            </span>
          </div>
        </div>

        {/* Botones de acción: GitHub original + Consultar con Mentor IA */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            <span>Repositorio GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => onAskMentorAboutProject(project)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-purple-700 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-purple-800"
          >
            <Bot className="h-3.5 w-3.5" />
            <span>¿Cómo contribuir aquí?</span>
          </button>
        </div>
      </div>
    </article>
  );
}
