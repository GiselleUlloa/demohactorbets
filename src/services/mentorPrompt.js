import { VERIFIED_PROJECTS } from '../data/verifiedProjects.js';

export const SYSTEM_PROMPT = `Eres "OpenSource AI Mentor", un asistente experto, amigable y didáctico impulsado por Gemma 4, creado para ayudar a desarrolladores principiantes (especialmente en eventos como Hacktoberfest en Barranquilla y toda Latinoamérica) a realizar su primera contribución a proyectos de código abierto.

REGLAS ESTRICTAS DE VERACIDAD Y TRANSPARENCIA:
1. Responde SIEMPRE en español claro, cercano, motivador y bien estructurado (usando listas o pasos numerados).
2. Distingue explícitamente entre:
   - [Datos verificados de GitHub]: Solo puedes citar como verificados los repositorios presentes en el catálogo verificado proporcionado en el contexto.
   - [Recomendación generada por IA]: Consejos pedagógicos, explicaciones de conceptos (issues, forks, branches, pull requests) y rutas de aprendizaje.
3. NUNCA inventes nombres de repositorios, números de issues reales ni enlaces URL que no estén en el catálogo verificado. Si el usuario pide un enlace o dato que no puedes verificar, indícalo con honestidad ("No puedo verificar en tiempo real ese repositorio/issue específico, pero te recomiendo buscarlo en GitHub con el filtro label:\\"good first issue\\"").
4. Cuando el usuario comparta sus conocimientos o lenguajes, recomiéndale tipos de contribuciones acordes a su nivel y menciona los proyectos verificados del catálogo que coincidan, terminando con una lista accionable de "Próximos pasos para tu primera contribución".

CATÁLOGO DE PROYECTOS VERIFICADOS DE GITHUB DISPONIBLES EN LA APP:
${VERIFIED_PROJECTS.map(p => `- ${p.fullName} (${p.language} | Nivel: ${p.difficulty}): ${p.description} URL: ${p.url}`).join('\n')}
`;

/**
 * Valida y sanea la entrada del usuario para el chat del mentor.
 */
export function validateMentorInput(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'El cuerpo de la solicitud no es válido.' };
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return { valid: false, error: 'Por favor escribe un mensaje o pregunta para el mentor.' };
  }

  if (message.length > 1500) {
    return { valid: false, error: 'El mensaje supera el límite máximo de 1500 caracteres.' };
  }

  const userProfile = body.userProfile && typeof body.userProfile === 'object'
    ? {
        level: String(body.userProfile.level || 'Principiante').slice(0, 40),
        languages: String(body.userProfile.languages || '').slice(0, 120),
        goal: String(body.userProfile.goal || '').slice(0, 120)
      }
    : null;

  return { valid: true, message, userProfile };
}

/**
 * Respuestas educativas estructuradas para el Modo Demostración (cuando Gemma 4 no está activo o se selecciona modo demo).
 * Nunca simula una conexión real; se identifica claramente como Modo Demo Educativo.
 */
export function generateStructuredMentorFallback(message, userProfile) {
  const q = message.toLowerCase();
  const profileContext = userProfile?.languages
    ? `Noté que te interesa **${userProfile.languages}** (Nivel: **${userProfile.level || 'Principiante'}**). `
    : '';

  if (q.includes('primera contribuci') || q.includes('empezar') || q.includes('comenzar')) {
    return `${profileContext}¡Qué alegría que quieras hacer tu primera contribución en este Hacktoberfest! Aquí tienes la ruta segura paso a paso:

### 🧭 Explicación y guía (Recomendación generada por IA)
1. **Elige un proyecto acogedor:** No intentes cambiar el núcleo de un sistema enorme el primer día. Empieza con documentación, traducciones o pequeños fixes.
2. **Lee las reglas del juego:** Revisa siempre los archivos \`README.md\` y \`CONTRIBUTING.md\` para saber cómo ejecutar el proyecto.
3. **Pide la issue:** Comenta en la issue elegida pidiendo que te la asignen para no duplicar esfuerzos con otra persona.
4. **Flujo Git clásico:** Haz **Fork** del repo, clónalo en tu equipo, crea una **Branch** (\`git checkout -b mi-mejora\`), haz tu cambio, sube el commit y abre tu **Pull Request**.

### ✅ Proyectos Verificados de GitHub que te recomiendo hoy
- **firstcontributions/first-contributions** (Markdown · Principiante): Práctica guiada en 5 minutos. Enlace verificado: https://github.com/firstcontributions/first-contributions
- **freeCodeCamp/freeCodeCamp** (JavaScript · Principiante): Comunidad enorme con guías claras para nuevos colaboradores. Enlace verificado: https://github.com/freeCodeCamp/freeCodeCamp

### 🚀 Próximos pasos para tu primera contribución
- [ ] Entra a \`firstcontributions/first-contributions\` en el Explorador de arriba y haz tu primer Pull Request de prueba.
- [ ] Filtra el explorador en nivel **Principiante** y guarda 2 proyectos en tus Favoritos.
- [ ] Revisa una issue abierta y lee su archivo \`CONTRIBUTING.md\`.`;
  }

  if (q.includes('good first issue')) {
    return `### 🏷️ ¿Qué es una "good first issue"? (Recomendación generada por IA)
En GitHub, los mantenedores de proyectos open source usan etiquetas (*labels*) para clasificar las tareas pendientes. La etiqueta **\`good first issue\`** (buena primera tarea) señala problemas diseñados específicamente para personas que nunca antes han contribuido a ese repositorio.

**Características habituales:**
- **Alcance acotado:** Suele requerir cambiar pocos archivos (por ejemplo, arreglar un estilo CSS, mejorar un mensaje de error o traducir una sección).
- **Contexto claro:** A menudo los mantenedores explican en qué carpeta o archivo está el código involucrado.
- **Mentoría:** Quienes revisan estas issues suelen tener más paciencia y disposición para guiarte en tu primer Pull Request.

### ✅ Dónde ver "good first issues" reales (Datos verificados de GitHub)
- **EddieHubCommunity/BioDrop:** https://github.com/EddieHubCommunity/BioDrop/labels/good%20first%20issue
- **withastro/astro:** https://github.com/withastro/astro/labels/good%20first%20issue

> **Nota de verificación:** No invento números de issues específicas porque cambian cada minuto en GitHub; usa los enlaces verificados de arriba para ver las que están abiertas hoy.`;
  }

  if (q.includes('pull request') || q.includes('fork') || q.includes('branch') || q.includes('issue')) {
    return `### 📚 Glosario esencial de Open Source (Recomendación generada por IA)

Imagina que un proyecto en GitHub es un libro de recetas comunitario:

1. **Issue (Incidencia o Tarea):** Es una nota adhesiva donde alguien reporta un error (*bug*), sugiere una mejora o pide una traducción. Antes de programar, siempre se conversa en la Issue.
2. **Fork (Bifurcación):** Como no tienes permiso para editar directamente el repositorio oficial de otro proyecto, haces un **Fork**: una copia exacta del repositorio dentro de tu propia cuenta de GitHub.
3. **Branch (Rama):** Es tu mesa de trabajo separada dentro de tu copia (\`git checkout -b fix-boton\`). Te permite hacer experimentos sin dañar la rama principal (\`main\`).
4. **Pull Request (PR - Solicitud de fusión):** Cuando terminas tu cambio y lo subes a tu Fork, abres un **Pull Request** para decirle a los creadores originales: *"¡Hola! Hice esta mejora en mi rama, ¿la revisan y la integran al proyecto oficial?"*.

### 🚀 Próximos pasos sugeridos
1. Practica estos 4 conceptos sin miedo en **firstcontributions/first-contributions** (https://github.com/firstcontributions/first-contributions).
2. Cuando abras tu primer PR, menciona qué issue resuelve escribiendo \`Closes #numero\` en la descripción.`;
  }

  if (q.includes('javascript') || q.includes('react') || q.includes('python') || q.includes('typescript')) {
    return `${profileContext}¡Excelente elección tecnológica! Contribuir en lenguajes que ya estás practicando acelera muchísimo tu aprendizaje.

### 💡 Cómo contribuir según tu stack (Recomendación generada por IA)
- **Si estás empezando (Principiante):** Busca tareas de mejora en documentación interactiva, traducción técnica (como la documentación oficial de React al español) o corrección de pequeños estilos y pruebas unitarias.
- **Si ya tienes bases (Intermedio):** Busca issues de componentes UI, validaciones de formularios o agregar pruebas automatizadas (*unit tests*).

### ✅ Proyectos Verificados de GitHub en nuestro catálogo
- **JavaScript / React (Principiante):** \`es-reactjs/es.react.dev\` — Traducción oficial de React al español (https://github.com/es-reactjs/es.react.dev) y \`freeCodeCamp/freeCodeCamp\` (https://github.com/freeCodeCamp/freeCodeCamp).
- **JavaScript / Next.js (Intermedio):** \`EddieHubCommunity/BioDrop\` (https://github.com/EddieHubCommunity/BioDrop).
- **Python (Intermedio):** \`fastapi/fastapi\` (creado por el colombiano Sebastián Ramírez: https://github.com/fastapi/fastapi) y \`TheAlgorithms/Python\` (https://github.com/TheAlgorithms/Python).
- **TypeScript (Intermedio/Avanzado):** \`withastro/astro\` (https://github.com/withastro/astro) y \`calcom/cal.com\` (https://github.com/calcom/cal.com).

### 🚀 Próximos pasos para tu primera contribución
1. Usa el filtro de lenguaje en el **Explorador de Proyectos** de esta aplicación.
2. Abre el archivo \`CONTRIBUTING.md\` del repositorio elegido y verifica que puedas correr \`npm install\` o \`pytest\` en tu máquina local.
3. Elige una sola issue marcada como \`good first issue\` y pregunta si puedes trabajar en ella.`;
  }

  return `${profileContext}¡Hola! Soy **OpenSource AI Mentor**. Estoy aquí para ayudarte a dar tus primeros pasos en el código abierto de forma clara y segura.

### 🧭 Cómo abordar tu consulta y encontrar proyectos (Recomendación generada por IA)
1. **Define tu punto de partida:** No necesitas ser experto. Puedes aportar en código (JavaScript, Python, TypeScript), diseño, pruebas o documentación en español.
2. **Cómo abordar una issue paso a paso:**
   - **Paso 1:** Lee la descripción completa de la issue y los comentarios previos para entender qué se pide.
   - **Paso 2:** Revisa el archivo \`CONTRIBUTING.md\` del proyecto para levantar el proyecto en tu computador y reproducir el escenario.
   - **Paso 3:** Pide que te asignen la tarea, crea una rama nueva (\`git checkout -b fix/nombre-corto\`), aplica la solución mínima necesaria y ejecuta las pruebas.
   - **Paso 4:** Abre tu Pull Request explicando qué cambiaste y cómo lo probaste.

### ✅ Proyectos Verificados de GitHub para explorar ahora mismo
- **Para tu primer PR en 5 minutos:** \`firstcontributions/first-contributions\` (https://github.com/firstcontributions/first-contributions)
- **Para comunidad en español y React:** \`es-reactjs/es.react.dev\` (https://github.com/es-reactjs/es.react.dev)
- **Para aprender Python moderno:** \`fastapi/fastapi\` (https://github.com/fastapi/fastapi)

> *Transparencia:* Los repositorios anteriores son datos verificados de GitHub incluidos en nuestro catálogo; no invento enlaces ni issues externas no verificadas.`;
}

/**
 * Construye el prompt enriquecido con el perfil del usuario y su pregunta.
 */
export function buildUserPrompt(message, userProfile) {
  const parts = [];
  if (userProfile && (userProfile.languages || userProfile.level || userProfile.goal)) {
    parts.push(
      `Contexto del estudiante: Nivel=${userProfile.level || 'Principiante'}, Lenguajes/Intereses=${userProfile.languages || 'No especificado'}, Objetivo=${userProfile.goal || 'Hacer mi primera contribución en Hacktoberfest'}.`
    );
  }
  parts.push(`Pregunta o solicitud del usuario: ${message}`);
  parts.push(
    `Recuerda responder en español de forma amigable, distinguir entre [Recomendación generada por IA] y [Datos verificados de GitHub] usando solo los repositorios reales del catálogo sin inventar enlaces ni issues, e incluir una lista breve de próximos pasos.`
  );
  return parts.join('\n\n');
}
