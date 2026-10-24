import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { ProjectExplorer } from './components/ProjectExplorer.jsx';
import { AIMentor } from './components/AIMentor.jsx';
import { FirstContributionGuide } from './components/FirstContributionGuide.jsx';
import { VERIFIED_PROJECTS } from './data/verifiedProjects.js';
import { fetchAiStatus } from './services/aiClient.js';
import { Heart, Github, Sparkles } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'opensource_finder_favorites_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState('explorer');
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['firstcontributions/first-contributions'];
    } catch {
      return ['firstcontributions/first-contributions'];
    }
  });

  const [aiStatus, setAiStatus] = useState({
    live: false,
    provider: 'checking',
    modelId: 'gemma4',
    label: 'Verificando disponibilidad de Gemma 4...'
  });

  const [mentorInitialQuestion, setMentorInitialQuestion] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignorar si localStorage está restringido
    }
  }, [favorites]);

  useEffect(() => {
    let mounted = true;
    fetchAiStatus().then(status => {
      if (mounted && status) {
        setAiStatus(status);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleFavorite = projectId => {
    setFavorites(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleAskMentorAboutProject = project => {
    setMentorInitialQuestion(
      `Quiero contribuir al proyecto verificado ${project.fullName} (${project.language}, nivel ${project.difficulty}). ¿Me explicas cómo abordar una good first issue allí y cuáles son mis próximos pasos?`
    );
    setActiveSection('mentor');
  };

  const handleGoToMentorWithQuestion = questionText => {
    setMentorInitialQuestion(questionText);
    setActiveSection('mentor');
  };

  return (
    <div className=" flex min-h-screen flex-col bg-[#FAFAFC] text-slate-900">
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        favoritesCount={favorites.length}
        aiStatus={aiStatus}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {activeSection === 'explorer' && (
          <ProjectExplorer
            projects={VERIFIED_PROJECTS}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAskMentorAboutProject={handleAskMentorAboutProject}
            onGoToMentor={() => setActiveSection('mentor')}
          />
        )}

        {activeSection === 'mentor' && (
          <AIMentor
            aiStatus={aiStatus}
            initialQuestion={mentorInitialQuestion}
            onClearInitialQuestion={() => setMentorInitialQuestion('')}
          />
        )}

        {activeSection === 'guide' && (
          <FirstContributionGuide
            onGoToMentorWithQuestion={handleGoToMentorWithQuestion}
          />
        )}
      </main>

      <footer className="mt-12 border-t border-purple-100 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-700" />
            <span className="font-semibold text-slate-800">OpenSource Finder AI</span>
            <span>· Construido para Hacktoberfest en Barranquilla, Colombia</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Hecho con <Heart className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" /> para la comunidad Open Source LATAM
            </span>
            <a
              href="https://github.com/topics/hacktoberfest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-purple-700 hover:underline"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Explorar #hacktoberfest en GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
