import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/sections/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Technology from './components/sections/Technology';
import Projects from './components/sections/Projects';
import Engineering from './components/sections/Engineering';
import Experience from './components/sections/Experience';
import { Resume } from './components/sections/Resume';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F9F9F7] text-[#111111] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />

          <About />

          <Technology />

          <Projects />

          <Engineering />

          <Experience />

          <Resume />

          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;