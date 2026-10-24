# OpenSource Finder AI 🚀🇨🇴

**OpenSource Finder AI** es una aplicación web interactiva diseñada para ayudar a desarrolladores principiantes a encontrar proyectos reales de código abierto en GitHub y aprender cómo realizar su primera contribución paso a paso con la ayuda de **OpenSource AI Mentor**, impulsado por **Gemma 4**.

Construido especialmente como demostración para **Hacktoberfest en Barranquilla, Colombia**, con una estética moderna inspirada en la comunidad tecnológica latinoamericana.

---

## ✨ Funcionalidades Principales

1. **Explorador de Proyectos Verificados:**
   - Catálogo curado de repositorios reales de GitHub con etiquetas `good first issue`.
   - Búsqueda instantánea por nombre, tecnología, tópico o descripción.
   - Filtros combinables por **Lenguaje de programación** (`JavaScript`, `Python`, `TypeScript`, `Markdown`) y **Nivel de experiencia** (`Principiante`, `Intermedio`, `Avanzado`).
   - Sistema de **Favoritos** persistente en el navegador (`localStorage`).
   - Enlaces directos al repositorio oficial en GitHub y botón rápido *"¿Cómo contribuir aquí?"* conectado al mentor de IA.

2. **Asistente OpenSource AI Mentor (con Gemma 4):**
   - Perfil configurable del estudiante (nivel de experiencia y lenguajes conocidos).
   - Explica de forma didáctica en español qué son *issues*, *forks*, *branches* y *pull requests*.
   - Explica cómo abordar una issue paso a paso y cómo leer un archivo `CONTRIBUTING.md`.
   - Genera listas accionables de próximos pasos para lograr la primera contribución.
   - **Política estricta contra alucinaciones:** Distingue explícitamente entre recomendaciones pedagógicas generadas por IA y datos verificados de GitHub. No inventa repositorios ni enlaces.
   - **Modo Demostración transparente:** Si el servicio de IA no está configurado, ofrece una experiencia educativa completa e identifica con honestidad que está en Modo Demostración sin simular conexiones falsas.

3. **Sección Educativa "Tu primera contribución":**
   - Diccionario visual de los 4 pilares de GitHub (*Issue*, *Fork*, *Branch*, *Pull Request*).
   - Guía en 4 pasos con los comandos exactos de Git listos para copiar y usar.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 + Vite 5 + JavaScript (ES Modules)
- **Estilos:** Tailwind CSS 3 (paleta clara con detalles morados y verdes esmeralda, diseño 100% responsive)
- **Iconografía:** Lucide React
- **Inteligencia Artificial:** **Gemma 4** (soporte real para **Ollama local** con `gemma4:e4b` / `gemma4:12b` / `gemma4:31b` y **Google AI Studio / Gemini API** con `gemma-4-31b-it` / `gemma-4-26b-a4b-it` / `gemma-4-4b-it`)
- **Backend Seguro de Desarrollo:** Middleware Node en Vite (`server/gemmaApiPlugin.js`) que mantiene las credenciales en variables de entorno del servidor sin exponerlas jamás en el navegador.
- **Pruebas:** Vitest + React Testing Library (`jsdom`)

---

## 🤖 Verificación e Integración de Gemma 4

La familia **Gemma 4** de Google DeepMind cuenta con los siguientes identificadores oficiales verificados:

| Plataforma / Proveedor | Identificadores Oficiales de Gemma 4 | Método de Acceso en esta App |
| :--- | :--- | :--- |
| **Ollama (Local / Sin costo)** | `gemma4:e4b`, `gemma4:e2b`, `gemma4:12b`, `gemma4:26b-a4b`, `gemma4:31b` | Endpoint local `POST http://localhost:11434/api/chat` desde el backend Node |
| **Google AI Studio (Gemini API)** | `gemma-4-31b-it`, `gemma-4-26b-a4b-it`, `gemma-4-4b-it` | Endpoint `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent` con `GEMINI_API_KEY` en el servidor |
| **Hugging Face** | `google/gemma-4-31b-it`, `google/gemma-4-26b-a4b-it`, `google/gemma-4-12b-it`, `google/gemma-4-e4b-it` | Referencia open-weights oficial |

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/GiselleUlloa/demohactorbets.git
cd demohactorbets
npm install
```

### 2. Configurar las variables de entorno
Copia el archivo de ejemplo `.env.example` a `.env`:
```bash
cp .env.example .env
```

Puedes elegir cómo conectar **Gemma 4** en tu archivo `.env`:

- **Opción A — Ollama Local (Recomendado y sin API Keys):**
  Si tienes Ollama instalado con `gemma4:e4b` (`ollama pull gemma4:e4b`), el modo `GEMMA_PROVIDER=auto` lo detecta automáticamente en `http://localhost:11434`.
- **Opción B — Google AI Studio (En la nube):**
  Agrega tu clave en `GEMINI_API_KEY=tu_clave_aqui` y define `GEMINI_MODEL=gemma-4-31b-it`. La clave se lee únicamente en el backend de Node y nunca se envía al navegador.
- **Opción C — Modo Demostración (Sin IA configurada):**
  Si no tienes Ollama corriendo ni API Key configurada (o defines `GEMMA_PROVIDER=demo`), la aplicación funciona al 100% en Modo Demostración claramente identificado.

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre el enlace que aparece en tu terminal (por defecto `http://localhost:5173`).

### 4. Ejecutar las pruebas automatizadas y el build de producción
```bash
npm test
npm run build
```

---

## 🤝 Cómo Contribuir (Issues y Pull Requests)

¡Este repositorio está listo para recibir tus contribuciones en Hacktoberfest!  
- Lee nuestra guía detallada en [CONTRIBUTING.md](./CONTRIBUTING.md) para conocer cómo abrir **Issues** y enviar tu primer **Pull Request**.
- Consulta la [Documentación Técnica y Guía de Demo en `docs/DOCUMENTACION.md`](./docs/DOCUMENTACION.md) para conocer la arquitectura interna, los endpoints del backend de Gemma 4 y el guion de presentación de 2 minutos.

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más información.
