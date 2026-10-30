import './index.css';
import Header from './components/ui/Header';
import Hero from './components/ui/Hero';
import About from './components/ui/About';
import Projects from './components/ui/Projects';
import Education from './components/ui/Education';
import Contact from './components/ui/Contact';
import Footer from './components/ui/Footer';
import Chatbot from './components/ui/Chatbot';
import { useScrollProgress, useActiveSection } from './hooks/useTypingEffect';
import { useTheme } from './hooks/useTheme';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];

function App() {
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Background decorations */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />

      {/* Fixed header */}
      <Header activeSection={activeSection} theme={theme} onThemeChange={setTheme} />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* AI Chatbot */}
      <Chatbot />
    </>
  );
}

export default App;
