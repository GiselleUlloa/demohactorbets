# Guía de Contribución (CONTRIBUTING.md)

¡Gracias por tu interés en contribuir a **OpenSource Finder AI**! 🇨🇴✨  
Este proyecto nació como una demostración abierta para la comunidad de **Hacktoberfest en Barranquilla, Colombia**, con el propósito de ayudar a principiantes de toda Latinoamérica a realizar su primera contribución en código abierto.

---

## 1. Código de Conducta y Filosofía

- **Sé amable, paciente y didáctico:** Muchas personas que abren issues o pull requests aquí están haciendo su **primera contribución**.
- **Veracidad ante todo:** Todos los repositorios agregados al catálogo deben existir realmente en GitHub. Nunca agregues enlaces ficticios ni expongas claves de API (`GEMINI_API_KEY`, `GITHUB_TOKEN`) en el código.

---

## 2. ¿Cómo puedo contribuir?

Puedes aportar de varias maneras según tu experiencia:

1. **Agregar nuevos proyectos verificados al catálogo (`src/data/verifiedProjects.js`):**
   - Proyectos amigables para principiantes, especialmente creados en Colombia o Latinoamérica, que tengan issues con la etiqueta `good first issue`.
2. **Mejorar las guías educativas (`src/components/FirstContributionGuide.jsx`):**
   - Añadir consejos prácticos sobre Git, resolución de conflictos o buenas prácticas.
3. **Mejorar la accesibilidad y el diseño responsive (Tailwind CSS).**
4. **Ampliar las pruebas automatizadas (`src/test/App.test.jsx`).**

---

## 3. Cómo abrir una Issue

Antes de trabajar en un cambio grande, abre una **Issue** en GitHub indicando:

- **Título descriptivo:** Ej. `feat: agregar repositorio open source de comunidad Python Colombia` o `fix: mejorar contraste en botones de filtro`.
- **Descripción clara:** Qué problema observaste o qué mejora propones.
- **Pasos para reproducir (si es un bug):** En qué navegador o resolución ocurrió.
- Si eres principiante, comenta en cualquier issue con la etiqueta `good first issue`:  
  > *"¡Hola! Me gustaría trabajar en esta issue para Hacktoberfest, ¿me la pueden asignar?"*

---

## 4. Flujo paso a paso para enviar tu Pull Request (PR)

### Paso 1: Haz un Fork y clona el repositorio
Haz clic en el botón **Fork** arriba a la derecha en GitHub y luego clona tu copia:

```bash
git clone https://github.com/GiselleUlloa/demohactorbets.git
cd demohactorbets
```

### Paso 2: Instala las dependencias y configura el entorno
```bash
npm install
cp .env.example .env
```

### Paso 3: Crea una rama (Branch) para tu cambio
Usa un prefijo descriptivo como `feat/`, `fix/` o `docs/`:
```bash
git checkout -b feat/agregar-proyecto-latam
```

### Paso 4: Verifica que las pruebas y el build pasen
Antes de hacer commit, asegúrate de que todo funcione sin errores:
```bash
npm test
npm run build
```

### Paso 5: Haz Commit y Push a tu Fork
```bash
git add .
git commit -m "feat: agregar proyecto verificado al explorador"
git push origin feat/agregar-proyecto-latam
```

### Paso 6: Abre el Pull Request en GitHub
1. Ve a tu repositorio en GitHub y presiona **"Compare & pull request"**.
2. Explica brevemente qué hiciste y enlaza la issue correspondiente escribiendo `Closes #NUMERO_DE_ISSUE`.
3. ¡Listo! Un mantenedor revisará tu PR y te dará retroalimentación constructiva.
