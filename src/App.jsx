import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingBalloons from './components/FloatingBalloons';
import Hero from './components/Hero';
import MemoryGallery from './components/MemoryGallery';
import InteractiveCake from './components/InteractiveCake';
import WhyYouAreSpecial from './components/WhyYouAreSpecial';
import VirtualGiftBox from './components/VirtualGiftBox';
import BirthdayLetterModal from './components/BirthdayLetterModal';
import EditNameModal from './components/EditNameModal';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';
import { audioManager } from './utils/audio';

function App() {
  const [recipientName, setRecipientName] = useState(() => {
    return localStorage.getItem('birthday_person_name') || 'My Favorite Person';
  });

  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('birthday_person_name', recipientName);
  }, [recipientName]);

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
    <div className="min-h-screen bg-[#0b1319] text-[#e8f0ec] relative selection:bg-[#881337] selection:text-white overflow-x-hidden font-sans-modern">
      {/* Floating Animated Balloons in modern colors */}
      <FloatingBalloons />

      {/* Top Navbar */}
      <Navbar
        recipientName={recipientName}
        onEditName={() => setIsEditNameOpen(true)}
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

      <EditNameModal
        isOpen={isEditNameOpen}
        onClose={() => setIsEditNameOpen(false)}
        currentName={recipientName}
        onSaveName={(name) => setRecipientName(name)}
      />
    </div>
  );
}

export default App;
