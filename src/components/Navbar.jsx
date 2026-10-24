import React from 'react';
import {
  Compass,
  Bot,
  BookOpen,
  Bookmark,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export function Navbar({ activeSection, onSelectSection, favoritesCount, aiStatus }) {
  const navItems = [
    { id: 'explorer', label: 'Explorador de Proyectos', icon: Compass },
    { id: 'mentor', label: 'OpenSource AI Mentor', icon: Bot },
    { id: 'guide', label: 'Tu primera contribución', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Marca e identidad Hacktoberfest Barranquilla */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 via-purple-600 to-emerald-600 text-white shadow-md shadow-purple-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                OpenSource <span className="text-purple-700">Finder</span>{' '}
                <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs font-bold text-emerald-800">
                  AI
                </span>
              </span>
              <span className="hidden rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-800 sm:inline-block">
                Hacktoberfest Barranquilla 🇨🇴
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Descubre repositorios verificados y contribuye con Gemma 4
            </p>
          </div>
        </div>

        {/* Navegación principal */}
        <nav aria-label="Navegación principal" className="flex items-center gap-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  isActive
                    ? 'bg-purple-700 text-white shadow-sm shadow-purple-200'
                    : 'text-slate-600 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Estado de Gemma 4 y contador de favoritos */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <div
            title={aiStatus?.label || 'Estado del modelo'}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              aiStatus?.live
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
          >
            {aiStatus?.live ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
            )}
            <span>
              {aiStatus?.live
                ? `Gemma 4 Activo (${aiStatus.modelId})`
                : 'IA en Modo Demo'}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50/70 px-3 py-1 text-xs font-semibold text-purple-800">
            <Bookmark className="h-3.5 w-3.5 fill-purple-600 text-purple-600" />
            <span>Favoritos: {favoritesCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
