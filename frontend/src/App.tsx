import './index.css';
import Header from './components/ui/Header';
import Hero from './components/ui/Hero';
import About from './components/ui/About';
import Skills from './components/ui/Skills';
import Projects from './components/ui/Projects';
import Education from './components/ui/Education';
import Contact from './components/ui/Contact';
import Footer from './components/ui/Footer';
import Chatbot from './components/ui/Chatbot';
import { useScrollProgress, useActiveSection } from './hooks/useScroll';
import { useTheme } from './hooks/useTheme';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];

function App() {
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />

      <Header activeSection={activeSection} theme={theme} onThemeChange={setTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
