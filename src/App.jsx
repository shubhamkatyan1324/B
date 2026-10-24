import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingBalloons from './components/FloatingBalloons';
import Hero from './components/Hero';
import MemoryGallery from './components/MemoryGallery';
import InteractiveCake from './components/InteractiveCake';
import WhyYouAreSpecial from './components/WhyYouAreSpecial';
import VirtualGiftBox from './components/VirtualGiftBox';
import BirthdayLetterModal from './components/BirthdayLetterModal';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';
import { audioManager } from './utils/audio';

function App() {
  const [recipientName, setRecipientName] = useState(() => {
    const saved = localStorage.getItem('birthday_person_name');
    if (!saved || saved === 'My Favorite Person') {
      localStorage.setItem('birthday_person_name', 'Dipa');
      return 'Dipa';
    }
    return saved;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('birthday_theme') || 'dark';
  });

  const [isLetterOpen, setIsLetterOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('birthday_person_name', recipientName);
  }, [recipientName]);

  useEffect(() => {
    localStorage.setItem('birthday_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initial welcome burst of celebratory confetti
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3']
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCake = () => {
    const el = document.getElementById('cake');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative selection:bg-[#881337] selection:text-white overflow-x-hidden font-sans-modern ${
        theme === 'light'
          ? 'bg-[#f6f9f7] text-[#1a2920] light-theme'
          : 'bg-[#0b1319] text-[#e8f0ec] dark-theme'
      }`}
    >
      {/* Floating Animated Balloons in modern colors */}
      <FloatingBalloons />

      {/* Top Navbar */}
      <Navbar
        recipientName={recipientName}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenLetter={() => setIsLetterOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          recipientName={recipientName}
          onBlowCandlesClick={scrollToCake}
          onOpenLetter={() => setIsLetterOpen(true)}
        />

        {/* Memory Gallery with all 18 photos */}
        <MemoryGallery />

        {/* Interactive Candle & Cake Ritual */}
        <InteractiveCake recipientName={recipientName} />

        {/* Why You Are Special Cards */}
        <WhyYouAreSpecial recipientName={recipientName} />

        {/* Virtual Gift Box & Coupons */}
        <VirtualGiftBox recipientName={recipientName} />
      </main>

      {/* Footer */}
      <Footer recipientName={recipientName} />

      {/* Modals */}
      <BirthdayLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        recipientName={recipientName}
      />
    </div>
  );
}

export default App;
