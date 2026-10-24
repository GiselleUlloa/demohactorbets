import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App.jsx';
import { filterProjects } from '../utils/projectFilters.js';
import { VERIFIED_PROJECTS } from '../data/verifiedProjects.js';
import { validateMentorInput, generateStructuredMentorFallback } from '../services/mentorPrompt.js';

describe('OpenSource Finder AI - Pruebas de Unidad e Integración', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('filtra proyectos correctamente por nombre, lenguaje, dificultad y favoritos', () => {
    const byLanguage = filterProjects(VERIFIED_PROJECTS, { language: 'Python' });
    expect(byLanguage.length).toBeGreaterThan(0);
    expect(byLanguage.every(p => p.language === 'Python')).toBe(true);

    const byDifficulty = filterProjects(VERIFIED_PROJECTS, { difficulty: 'Principiante' });
    expect(byDifficulty.every(p => p.difficulty === 'Principiante')).toBe(true);

    const bySearch = filterProjects(VERIFIED_PROJECTS, { search: 'fastapi' });
    expect(bySearch).toHaveLength(1);
    expect(bySearch[0].fullName).toBe('fastapi/fastapi');

    const byFavorites = filterProjects(VERIFIED_PROJECTS, {
      onlyFavorites: true,
      favorites: ['es-reactjs/es.react.dev']
    });
    expect(byFavorites).toHaveLength(1);
    expect(byFavorites[0].id).toBe('es-reactjs/es.react.dev');
  });

  it('valida las entradas del usuario para OpenSource AI Mentor', () => {
    expect(validateMentorInput({}).valid).toBe(false);
    expect(validateMentorInput({ message: '   ' }).valid).toBe(false);
    expect(validateMentorInput({ message: 'a'.repeat(1600) }).valid).toBe(false);

    const validResult = validateMentorInput({
      message: '¿Qué es un pull request?',
      userProfile: { level: 'Principiante', languages: 'JavaScript' }
    });
    expect(validResult.valid).toBe(true);
    expect(validResult.message).toBe('¿Qué es un pull request?');
  });

  it('genera respuestas educativas verificadas en español sin inventar enlaces', () => {
    const response = generateStructuredMentorFallback('¿Qué es una good first issue?', {
      level: 'Principiante',
      languages: 'JavaScript'
    });
    expect(response).toContain('good first issue');
    expect(response).toContain('Datos verificados de GitHub');
    expect(response).toContain('https://github.com/');
  });

  it('renderiza el Explorador, permite guardar favoritos y navegar a OpenSource AI Mentor y Tu primera contribución', async () => {
    render(<App />);

    // Verifica que carga el título principal
    expect(
      screen.getByRole('heading', { name: /Encuentra tu primer proyecto Open Source/i })
    ).toBeInTheDocument();

    // Verifica que se muestran proyectos verificados
    expect(screen.getByText('freeCodeCamp')).toBeInTheDocument();

    // Navegar a la sección educativa "Tu primera contribución"
    const guideNavBtn = screen.getByRole('button', { name: /Tu primera contribución/i });
    fireEvent.click(guideNavBtn);
    expect(
      screen.getByRole('heading', { name: /Tu primera contribución/i })
    ).toBeInTheDocument();

    // Navegar al asistente "OpenSource AI Mentor"
    const mentorNavBtn = screen.getByRole('button', { name: /OpenSource AI Mentor/i });
    fireEvent.click(mentorNavBtn);
    expect(
      screen.getByRole('heading', { name: /OpenSource AI Mentor/i })
    ).toBeInTheDocument();

    // Verifica que están las preguntas sugeridas requeridas
    const suggestedBtn = screen.getByRole('button', { name: '¿Qué es un pull request?' });
    expect(suggestedBtn).toBeInTheDocument();

    // Enviar pregunta sugerida y verificar respuesta
    fireEvent.click(suggestedBtn);
    await waitFor(() => {
      expect(screen.getByText(/Glosario esencial de Open Source/i)).toBeInTheDocument();
    });
  });
});
