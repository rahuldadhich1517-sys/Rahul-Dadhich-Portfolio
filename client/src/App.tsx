import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { FloatingChatButton } from './components/ui/FloatingChatButton';
import { injectFontPreloads } from './utils/imageOptimization';
import Hero from './components/sections/Hero';
import About from './components/sections/About';

// Lazy load sections with heavy 3D components
const Technology = lazy(() => import('./components/sections/Technology'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Engineering = lazy(() => import('./components/sections/Engineering'));
const Experience = lazy(() => 
  import('./components/sections/Experience').then(module => ({ default: module.Experience }))
);
const AILab = lazy(() => 
  import('./components/sections/AILab').then(module => ({ default: module.AILab }))
);
const OpenSource = lazy(() => 
  import('./components/sections/OpenSource').then(module => ({ default: module.OpenSource }))
);
const NowBuilding = lazy(() => 
  import('./components/sections/NowBuilding').then(module => ({ default: module.NowBuilding }))
);
const Resume = lazy(() => 
  import('./components/sections/Resume').then(module => ({ default: module.Resume }))
);
const Contact = lazy(() => 
  import('./components/sections/Contact').then(module => ({ default: module.Contact }))
);
const Footer = lazy(() => 
  import('./components/sections/Footer').then(module => ({ default: module.Footer }))
);
const ProjectCaseStudy = lazy(() => import('./components/pages/ProjectCaseStudy'));

// Loading placeholder for lazy sections
const SectionLoadingFallback = () => (
  <div className="h-screen bg-gradient-to-b from-gray-900 to-black animate-pulse" />
);

function App() {
  // Preload fonts on mount
  React.useEffect(() => {
    injectFontPreloads();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
        <Navbar />
        <FloatingChatButton />
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <main className="flex-1">
                  {/* Hero Section - Eagerly loaded (above fold) */}
                  <Hero />

                  {/* About Section - Eagerly loaded (above fold) */}
                  <About />

                  {/* Lazy-loaded sections with Suspense boundaries */}
                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Technology />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Projects />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Engineering />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Experience />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <AILab />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <OpenSource />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <NowBuilding />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Resume />
                  </Suspense>

                  <Suspense fallback={<SectionLoadingFallback />}>
                    <Contact />
                  </Suspense>
                </main>
                <Suspense fallback={<div className="bg-black" />}>
                  <Footer />
                </Suspense>
              </>
            }
          />

          {/* Project Case Study page - Route-level code splitting */}
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={<SectionLoadingFallback />}>
                <ProjectCaseStudy />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;