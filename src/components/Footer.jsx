import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function Footer({ recipientName }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeartClick = () => {
    audioManager.playChime(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3']
    });
  };

  return (
    <footer className="relative pt-12 sm:pt-16 pb-20 lg:pb-12 px-4 border-t border-white/10 bg-[#090e13]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Little celebratory badge */}
        <div
          onClick={handleHeartClick}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#722035] via-[#2563eb] to-[#7d9d8b] p-[2px] shadow-lg mb-3 sm:mb-4 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          title="Click to celebrate"
        >
          <div className="w-full h-full bg-[#0b1319] rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 fill-rose-400 animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl sm:text-3xl font-serif-display font-bold text-white mb-2">
          Here's to you, Babe 🥂
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light mb-6 px-4">
          May your year ahead be as radiant, kind, and beautiful as the memories we share together.
        </p>

        <div className="flex items-center justify-center w-full max-w-4xl pt-4 sm:pt-6 border-t border-white/5 text-xs text-zinc-500">
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors py-1.5 px-4 rounded-full hover:bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
