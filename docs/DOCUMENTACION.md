# Documentación Técnica y Guía de Demo — OpenSource Finder AI

**Repositorio Oficial:** [https://github.com/GiselleUlloa/demohactorbets](https://github.com/GiselleUlloa/demohactorbets)  
**Evento:** Hacktoberfest Barranquilla, Colombia 🇨🇴

---

## 1. Arquitectura de la Aplicación

La aplicación sigue una arquitectura modular limpia que separa la interfaz de usuario, el catálogo de datos verificados de GitHub y la capa segura de inferencia con **Gemma 4**:

```text
opensource-finder-ai/
├── index.html                        # Punto de entrada HTML5 con tipografía Inter
├── package.json                      # Scripts (dev, build, preview, test) y dependencias
├── vite.config.js                    # Configuración de Vite + Plugin Backend Gemma 4 + Vitest
├── tailwind.config.js                # Tema visual (Morado y Verde Esmeralda)
├── .env.example                      # Plantilla de variables de entorno sin secretos
├── README.md                         # Documentación general del proyecto
├── CONTRIBUTING.md                   # Guía paso a paso para colaboradores de Hacktoberfest
├── LICENSE                           # Licencia MIT Open Source
├── docs/
│   └── DOCUMENTACION.md              # Documentación técnica y guion de demo
├── server/
│   └── gemmaApiPlugin.js             # Backend seguro en Node para Gemma 4 (Ollama / Google AI Studio)
└── src/
    ├── App.jsx                       # Estado global, navegación y persistencia de favoritos
    ├── main.jsx                      # Montaje de React 18
    ├── index.css                     # Estilos base con Tailwind CSS
    ├── components/
    │   ├── Navbar.jsx                # Barra de navegación con estado en vivo de Gemma 4
    │   ├── ProjectExplorer.jsx       # Buscador, filtros y grilla de proyectos
    │   ├── ProjectCard.jsx           # Tarjeta individual con insignias verificadas y acciones
    │   ├── AIMentor.jsx              # Chat interactivo de OpenSource AI Mentor
    │   └── FirstContributionGuide.jsx# Sección educativa "Tu primera contribución"
    ├── data/
    │   └── verifiedProjects.js       # Catálogo verificado de GitHub y preguntas sugeridas
    ├── services/
    │   ├── aiClient.js               # Cliente HTTP del frontend hacia /api/ai/*
    │   └── mentorPrompt.js           # System Prompt, validadores y Modo Demostración
    ├── utils/
    │   └── projectFilters.js         # Lógica pura de filtrado por texto, lenguaje y nivel
    └── test/
        ├── setup.js                  # Configuración de @testing-library/jest-dom
        └── App.test.jsx              # Pruebas automatizadas de unidad e integración
```

---

## 2. Endpoints del Backend Interno (`server/gemmaApiPlugin.js`)

Para proteger las credenciales y evitar exponer API keys en el navegador, el servidor incluye tres rutas internas:

### `GET /api/ai/status`
Verifica en tiempo real qué proveedor de **Gemma 4** está activo:
- Si **Ollama** está ejecutándose en `OLLAMA_BASE_URL` (`http://localhost:11434`) con un modelo Gemma 4 (`gemma4:e4b`, `gemma4:12b`, `gemma4:31b`), devuelve `live: true, provider: "ollama"`.
- Si existe `GEMINI_API_KEY` configurada en `.env`, devuelve `live: true, provider: "google"` con el modelo oficial `gemma-4-31b-it` (o `gemma-4-26b-a4b-it` / `gemma-4-4b-it`).
- Si ninguno está disponible, devuelve `live: false, provider: "demo"`, activando el **Modo Demostración Educativo** sin simular una conexión falsa.

### `POST /api/ai/chat`
Recibe el mensaje y el perfil del usuario:
```json
{
  "message": "¿Cómo hago mi primera contribución?",
  "userProfile": {
    "level": "Principiante",
    "languages": "JavaScript, React",
    "goal": "Hacer mi primer Pull Request en Hacktoberfest"
  }
}
```
- **Validaciones:** Rechaza mensajes vacíos o mayores a 1500 caracteres (`400 Bad Request`).
- **Prevención de alucinaciones:** Inyecta el catálogo de repositorios verificados de GitHub en el `SYSTEM_PROMPT` y exige distinguir entre `[Recomendación generada por IA]` y `[Datos verificados de GitHub]`.

### `GET /api/github/verify?repo=owner/name`
Permite consultar en vivo la API pública de GitHub para verificar estrellas e issues abiertas de un repositorio usando opcionalmente `GITHUB_TOKEN` desde el backend.

---

## 3. Guion para la Demo de 2 Minutos (Hacktoberfest Barranquilla)

1. **Apertura y Explorador (0:00 - 0:40):**
   - Muestra el encabezado con el indicador verde **`Gemma 4 Activo (gemma4:e4b)`**.
   - Filtra los proyectos por **Principiante** o escribe `React` / `Python` en el buscador.
   - Guarda un proyecto en **Favoritos** y muestra cómo el contador se actualiza al instante.
2. **OpenSource AI Mentor con Gemma 4 (0:40 - 1:30):**
   - Pulsa el botón **"¿Cómo contribuir aquí?"** en una tarjeta o navega a **OpenSource AI Mentor**.
   - Ajusta el perfil del desarrollador (*Principiante · JavaScript, React*) y haz clic en una pregunta sugerida (*"¿Cómo hago mi primera contribución?"* o *"¿Qué es una good first issue?"*).
   - Muestra la respuesta en español generada por **Gemma 4**, resaltando que incluye próximos pasos accionables y solo enlaza a repositorios verificados.
3. **Sección Educativa "Tu primera contribución" (1:30 - 2:00):**
   - Abre la pestaña **"Tu primera contribución"** y repasa los 4 conceptos clave (*Issue, Fork, Branch, Pull Request*) junto con los comandos de Git listos para copiar.
   - Invita al público a escanear o abrir `https://github.com/GiselleUlloa/demohactorbets` y enviar su primer Pull Request siguiendo `CONTRIBUTING.md`.
