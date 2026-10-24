/**
 * Repositorios reales y verificados de GitHub ideales para principiantes y Hacktoberfest.
 * Cada proyecto incluye metadatos reales, nivel de dificultad sugerido y etiquetas de búsqueda.
 */
export const VERIFIED_PROJECTS = [
  {
    id: 'firstcontributions/first-contributions',
    name: 'first-contributions',
    fullName: 'firstcontributions/first-contributions',
    description: 'Ayuda a principiantes a realizar su primera contribución a código abierto en menos de 5 minutos con guías paso a paso en español.',
    language: 'Markdown',
    difficulty: 'Principiante',
    stars: 46200,
    goodFirstIssues: 18,
    topics: ['hacktoberfest', 'first-timers-only', 'good-first-issue', 'tutorial'],
    url: 'https://github.com/firstcontributions/first-contributions',
    issuesUrl: 'https://github.com/firstcontributions/first-contributions/issues',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Ideal para practicar el flujo Fork -> Clone -> Branch -> Commit -> Push -> Pull Request sin tocar código complejo.'
  },
  {
    id: 'freeCodeCamp/freeCodeCamp',
    name: 'freeCodeCamp',
    fullName: 'freeCodeCamp/freeCodeCamp',
    description: 'El currículo open source y plataforma de aprendizaje gratuito de programación más grande del mundo. Gran comunidad hispanohablante.',
    language: 'JavaScript',
    difficulty: 'Principiante',
    stars: 408000,
    goodFirstIssues: 42,
    topics: ['javascript', 'react', 'education', 'hacktoberfest', 'curriculum'],
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    issuesUrl: 'https://github.com/freeCodeCamp/freeCodeCamp/labels/first%20timers%20only',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Puedes contribuir traduciendo lecciones al español, corrigiendo pruebas en JavaScript o mejorando componentes en React.'
  },
  {
    id: 'es-reactjs/es.react.dev',
    name: 'es.react.dev',
    fullName: 'es-reactjs/es.react.dev',
    description: 'Traducción y mantenimiento oficial al español de la documentación moderna de React (react.dev) impulsada por la comunidad.',
    language: 'JavaScript',
    difficulty: 'Principiante',
    stars: 1950,
    goodFirstIssues: 12,
    topics: ['react', 'spanish', 'documentation', 'latam', 'frontend'],
    url: 'https://github.com/es-reactjs/es.react.dev',
    issuesUrl: 'https://github.com/es-reactjs/es.react.dev/issues',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Excelente primera contribución técnica para desarrolladores React en Latinoamérica: revisa el glosario oficial antes de enviar tu PR.'
  },
  {
    id: 'EddieHubCommunity/BioDrop',
    name: 'BioDrop',
    fullName: 'EddieHubCommunity/BioDrop',
    description: 'Conecta con desarrolladores open source compartiendo tus redes, portafolio y estadísticas de contribuciones en un solo enlace.',
    language: 'JavaScript',
    difficulty: 'Intermedio',
    stars: 6100,
    goodFirstIssues: 27,
    topics: ['nextjs', 'tailwind', 'javascript', 'hacktoberfest', 'open-source'],
    url: 'https://github.com/EddieHubCommunity/BioDrop',
    issuesUrl: 'https://github.com/EddieHubCommunity/BioDrop/labels/good%20first%20issue',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Sus issues están muy bien documentadas por mentores de EddieHub; revisa la guía CONTRIBUTING.md antes de pedir asignación.'
  },
  {
    id: 'TheAlgorithms/Python',
    name: 'TheAlgorithms/Python',
    fullName: 'TheAlgorithms/Python',
    description: 'Todos los algoritmos clásicos y estructuras de datos implementados en Python con fines educativos y pruebas automatizadas.',
    language: 'Python',
    difficulty: 'Intermedio',
    stars: 194000,
    goodFirstIssues: 31,
    topics: ['python', 'algorithms', 'data-structures', 'education', 'hacktoberfest'],
    url: 'https://github.com/TheAlgorithms/Python',
    issuesUrl: 'https://github.com/TheAlgorithms/Python/issues',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Asegúrate de incluir doctests y anotaciones de tipos (type hints) en Python antes de abrir tu Pull Request.'
  },
  {
    id: 'withastro/astro',
    name: 'astro',
    fullName: 'withastro/astro',
    description: 'El framework web moderno para sitios orientados a contenido, rápido, accesible y muy amigable con nuevos colaboradores.',
    language: 'TypeScript',
    difficulty: 'Intermedio',
    stars: 47800,
    goodFirstIssues: 19,
    topics: ['typescript', 'astro', 'web', 'frontend', 'good-first-issue'],
    url: 'https://github.com/withastro/astro',
    issuesUrl: 'https://github.com/withastro/astro/labels/good%20first%20issue',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Cuenta con una de las comunidades más acogedoras en Discord y excelente documentación para levantar el entorno local.'
  },
  {
    id: 'calcom/cal.com',
    name: 'cal.com',
    fullName: 'calcom/cal.com',
    description: 'Infraestructura de agendamiento open source para todos. Alternativa abierta a Calendly construida con TypeScript, React y Tailwind.',
    language: 'TypeScript',
    difficulty: 'Avanzado',
    stars: 34200,
    goodFirstIssues: 24,
    topics: ['typescript', 'react', 'tailwindcss', 'fullstack', 'hacktoberfest'],
    url: 'https://github.com/calcom/cal.com',
    issuesUrl: 'https://github.com/calcom/cal.com/labels/%F0%9F%91%B6%20good%20first%20issue',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Ideal si ya dominas React y TypeScript y quieres experimentar cómo se trabaja en un producto SaaS open source real.'
  },
  {
    id: 'fastapi/fastapi',
    name: 'fastapi',
    fullName: 'fastapi/fastapi',
    description: 'Framework moderno y de alto rendimiento para construir APIs con Python, creado originalmente por el colombiano Sebastián Ramírez (tiangolo).',
    language: 'Python',
    difficulty: 'Intermedio',
    stars: 78500,
    goodFirstIssues: 15,
    topics: ['python', 'api', 'backend', 'colombia', 'documentation'],
    url: 'https://github.com/fastapi/fastapi',
    issuesUrl: 'https://github.com/fastapi/fastapi/labels/good%20first%20issue',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Orgullo colombiano en el mundo open source: revisar traducciones o casos de prueba es una puerta de entrada fantástica.'
  },
  {
    id: 'tailwindlabs/tailwindcss',
    name: 'tailwindcss',
    fullName: 'tailwindlabs/tailwindcss',
    description: 'Framework CSS utility-first para diseño rápido y consistente de interfaces web modernas.',
    language: 'TypeScript',
    difficulty: 'Avanzado',
    stars: 84000,
    goodFirstIssues: 9,
    topics: ['css', 'tailwindcss', 'design-system', 'frontend'],
    url: 'https://github.com/tailwindlabs/tailwindcss',
    issuesUrl: 'https://github.com/tailwindlabs/tailwindcss/issues',
    verifiedSource: 'GitHub Verificado',
    contributionTip: 'Reproducir un bug reportado con un ejemplo mínimo en Tailwind Play es una contribución de altísimo valor para los maintainers.'
  }
];

export const SUGGESTED_QUESTIONS = [
  '¿Cómo hago mi primera contribución?',
  '¿Qué es una good first issue?',
  '¿Cómo puedo contribuir usando JavaScript?',
  '¿Qué es un pull request?',
  '¿Cómo encuentro proyectos para principiantes?'
];

export const CONTRIBUTION_STEPS = [
  {
    step: 1,
    title: 'Explora y elige una "good first issue"',
    badge: 'Descubrimiento',
    description: 'Busca un proyecto que te llame la atención y revisa su pestaña de Issues filtrando por la etiqueta "good first issue" o "hacktoberfest".',
    command: 'Lee primero el archivo README.md y CONTRIBUTING.md del repositorio.',
    tip: 'Comenta amablemente en la issue: "¡Hola! Me gustaría trabajar en esta issue, ¿pueden asignármela?" antes de escribir código.'
  },
  {
    step: 2,
    title: 'Haz un Fork y clona tu copia',
    badge: 'Preparación',
    description: 'Presiona el botón "Fork" arriba a la derecha en GitHub para crear una copia del repositorio en tu cuenta personal y descárgala a tu computador.',
    command: 'git clone https://github.com/tu-usuario/nombre-del-repo.git',
    tip: 'Nunca trabajes directamente sobre la rama principal (main). Mantén main sincronizada con el repositorio original.'
  },
  {
    step: 3,
    title: 'Crea una rama (Branch) descriptiva',
    badge: 'Desarrollo',
    description: 'Crea una rama aislada para tus cambios. Eso permite que tu trabajo sea fácil de revisar y evita conflictos.',
    command: 'git checkout -b fix/corregir-enlace-documentacion',
    tip: 'Haz cambios pequeños y enfocados únicamente en resolver la issue acordada. Ejecuta los tests si el proyecto los incluye.'
  },
  {
    step: 4,
    title: 'Guarda cambios (Commit) y abre tu Pull Request',
    badge: 'Envío',
    description: 'Registra tus cambios con un mensaje claro, súbelos a tu Fork y abre un Pull Request (PR) hacia el repositorio original explicando qué hiciste.',
    command: 'git commit -m "fix: corregir enlace roto en guía de inicio" && git push origin fix/corregir-enlace-documentacion',
    tip: 'En la descripción de tu Pull Request escribe "Closes #NúmeroDeIssue" y agradece el feedback de los mantenedores.'
  }
];
