/**
 * Filtra la lista de proyectos open source por búsqueda de texto, lenguaje, dificultad y favoritos.
 */
export function filterProjects(projects, { search = '', language = 'Todos', difficulty = 'Todos', onlyFavorites = false, favorites = [] }) {
  const normalizedSearch = search.trim().toLowerCase();

  return projects.filter(project => {
    if (onlyFavorites && !favorites.includes(project.id)) {
      return false;
    }

    if (language !== 'Todos' && project.language !== language) {
      return false;
    }

    if (difficulty !== 'Todos' && project.difficulty !== difficulty) {
      return false;
    }

    if (normalizedSearch) {
      const matchesName = project.name.toLowerCase().includes(normalizedSearch);
      const matchesFullName = project.fullName.toLowerCase().includes(normalizedSearch);
      const matchesDesc = project.description.toLowerCase().includes(normalizedSearch);
      const matchesTopics = Array.isArray(project.topics) && project.topics.some(t => t.toLowerCase().includes(normalizedSearch));
      return matchesName || matchesFullName || matchesDesc || matchesTopics;
    }

    return true;
  });
}

export function getUniqueLanguages(projects) {
  const set = new Set(projects.map(p => p.language));
  return ['Todos', ...Array.from(set)];
}

export const DIFFICULTY_LEVELS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
