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
          Here's To You, {recipientName} 🥂
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light mb-5 sm:mb-6 px-4">
          May your year ahead be as radiant, kind, and beautiful as the memories we share together.
        </p>

        {/* Modern Color Palette Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:space-x-2 mb-6 sm:mb-8 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 text-[11px] sm:text-xs text-zinc-400">
          <span>Palette:</span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#7d9d8b]" title="Sage Green" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#2563eb]" title="Azul" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#722035]" title="Wine Red" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#fce7f3]" title="Light Pink" />
          </span>
          <span className="text-zinc-500">• Tailored with Love</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl pt-4 sm:pt-6 border-t border-white/5 text-xs text-zinc-500 gap-3">
          <span>Created with endless love & warm wishes ✨</span>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
