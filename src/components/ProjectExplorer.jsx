import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  BookmarkCheck,
  Sparkles,
  RotateCcw,
  Terminal,
  Users
} from 'lucide-react';
import { ProjectCard } from './ProjectCard.jsx';
import {
  filterProjects,
  getUniqueLanguages,
  DIFFICULTY_LEVELS
} from '../utils/projectFilters.js';

export function ProjectExplorer({
  projects,
  favorites,
  onToggleFavorite,
  onAskMentorAboutProject,
  onGoToMentor
}) {
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const languages = useMemo(() => getUniqueLanguages(projects), [projects]);

  const filteredProjects = useMemo(
    () =>
      filterProjects(projects, {
        search,
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        onlyFavorites,
        favorites
      }),
    [projects, search, selectedLanguage, selectedDifficulty, onlyFavorites, favorites]
  );

  const handleResetFilters = () => {
    setSearch('');
    setSelectedLanguage('Todos');
    setSelectedDifficulty('Todos');
    setOnlyFavorites(false);
  };

  return (
    <section aria-labelledby="explorer-heading" className="space-y-8">
      {/* Hero Banner con identidad Caribe / Barranquilla y Hacktoberfest */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-200/80 bg-gradient-to-br from-purple-900 via-purple-800 to-emerald-900 p-6 text-white shadow-lg sm:p-10">
        <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-8">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Demo Oficial · Hacktoberfest Barranquilla, Colombia</span>
            </div>
            <h1 id="explorer-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Encuentra tu primer proyecto Open Source con ayuda de{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-purple-200 bg-clip-text text-transparent">
                Gemma 4
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-purple-100 sm:text-base">
              Explora repositorios verificados de GitHub con tareas amigables para principiantes
              (<code className="rounded bg-white/10 px-1.5 py-0.5 text-emerald-200">good first issue</code>)
              y recibe mentoría personalizada en español con nuestro asistente <strong>OpenSource AI Mentor</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onGoToMentor}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-md transition hover:bg-emerald-400"
              >
                <Terminal className="h-4 w-4" />
                <span>Hablar con OpenSource AI Mentor</span>
              </button>
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs text-purple-100">
                <Users className="h-4 w-4 text-emerald-300" />
                <span>{projects.length} repositorios verificados listos para explorar</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm lg:col-span-4">
            <h2 className="mb-2 text-sm font-bold text-emerald-200">
              ¿Por qué contribuir en código abierto?
            </h2>
            <ul className="space-y-2 text-xs text-purple-100">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Construyes un portafolio público real en GitHub.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Aprendes flujo de trabajo profesional (Issues, Branches, Pull Requests).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Conectas con la comunidad tech de Barranquilla y Latinoamérica.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
          {/* Buscador por nombre o descripción */}
          <div className="md:col-span-5">
            <label htmlFor="project-search" className="mb-1.5 block text-xs font-semibold text-slate-700">
              Buscar por nombre, tecnología o descripción
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="project-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Ej. React, Python, traducción, algoritmos..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Filtro por lenguaje */}
          <div className="md:col-span-3">
            <label htmlFor="language-filter" className="mb-1.5 block text-xs font-semibold text-slate-700">
              Lenguaje principal
            </label>
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-purple-600" />
              <select
                id="language-filter"
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/60 py-2.5 pl-9 pr-3 text-sm font-medium text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-none"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro por nivel de experiencia */}
          <div className="md:col-span-2">
            <label htmlFor="difficulty-filter" className="mb-1.5 block text-xs font-semibold text-slate-700">
              Nivel de experiencia
            </label>
            <select
              id="difficulty-filter"
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50/60 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-purple-600 focus:bg-white focus:outline-none"
            >
              {DIFFICULTY_LEVELS.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de favoritos */}
          <div className="flex items-center gap-2 md:col-span-2">
            <button
              type="button"
              onClick={() => setOnlyFavorites(prev => !prev)}
              className={`flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                onlyFavorites
                  ? 'border-purple-600 bg-purple-700 text-white shadow-sm'
                  : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>Favoritos ({favorites.length})</span>
            </button>
          </div>
        </div>

        {/* Resumen de resultados y limpiar filtros */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
          <span>
            Mostrando <strong>{filteredProjects.length}</strong> de <strong>{projects.length}</strong> proyectos verificados de GitHub
          </span>
          {(search || selectedLanguage !== 'Todos' || selectedDifficulty !== 'Todos' || onlyFavorites) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 font-semibold text-purple-700 hover:text-purple-900"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restablecer filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Grilla de tarjetas de proyectos */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-base font-semibold text-slate-800">
            No encontramos proyectos que coincidan con tus filtros actuales.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Prueba buscando otro término o restablece los filtros para ver todo el catálogo verificado.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Ver todos los proyectos</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              isFavorite={favorites.includes(project.id)}
              onToggleFavorite={onToggleFavorite}
              onAskMentorAboutProject={onAskMentorAboutProject}
            />
          ))}
        </div>
      )}
    </section>
  );
}
