import React from 'react';
import { Sparkles, Heart, Cake, ArrowDown, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function Hero({ recipientName, onBlowCandlesClick, onOpenLetter }) {
  const handleQuickCheer = () => {
    audioManager.playChime(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3']
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-4 overflow-hidden">
      {/* Dynamic Modern Color Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#476251]/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-0 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-[#2563eb]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-[#722035]/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-60 sm:w-72 h-60 sm:h-72 bg-[#f472b6]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center w-full">
        {/* Big Celebratory Typography */}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-serif-display font-bold tracking-tight text-white mb-3 sm:mb-4 leading-tight px-2">
          Happy Birthday,{' '}
          <span className="block mt-1 sm:mt-2 font-handwriting text-5xl xs:text-6xl sm:text-8xl md:text-9xl font-normal bg-gradient-to-r from-pink-300 via-[#8da394] via-[#60a5fa] to-[#fda4af] bg-clip-text text-transparent drop-shadow-md">
            {recipientName}!
          </span>
        </h1>

        {/* Heartfelt Subtitle */}
        <p className="max-w-3xl text-sm sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-6 sm:mb-8 px-4">
          I hope this year brings you happiness, new adventures, and beautiful memories, along with exciting opportunities to grow and succeed in your nursing career. May your hard work pay off, your dreams take shape, and your kindness touch countless lives. Here’s to new beginnings, little victories, endless laughter, and all the wonderful moments still waiting for us.
        </p>

        {/* Dynamic Photo Showcase Preview (Trio of featured photos, perfectly responsive) */}
        <div className="relative w-full max-w-full sm:max-w-3xl my-4 sm:my-8 flex items-center justify-center -space-x-3 xs:-space-x-5 sm:-space-x-10 px-2">
          {/* Left Photo */}
          <div className="relative w-28 xs:w-36 sm:w-56 md:w-64 transform -rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer shadow-xl rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 flex-shrink-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900">
              <img
                src="/pics/attachments/1000296760.jpg"
                alt="Sweet smile memory"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                <span className="text-[10px] sm:text-xs text-white font-medium">Radiant Smiles</span>
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2 text-center">
              <span className="text-[10px] sm:text-[11px] font-handwriting text-pink-200">The sweetest glance</span>
            </div>
          </div>

          {/* Centerpiece Hero Photo (Under Canopy of Stars) */}
          <div className="relative w-36 xs:w-44 sm:w-64 md:w-72 z-20 transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-xl sm:rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-md border border-white/30 flex-shrink-0">
            {/* Cute celebratory badge on photo */}
            <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#722035] to-[#2563eb] text-white px-2 sm:px-3 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold tracking-wide uppercase shadow-lg flex items-center space-x-1 border border-white/30 whitespace-nowrap">
              <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-300 fill-pink-300" />
              <span>Favorite Moment</span>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900">
              <img
                src="/pics/attachments/1000296814.jpg"
                alt="Under canopy of fairy lights"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2 sm:p-3">
                <span className="text-[10px] sm:text-sm text-white font-serif-display font-medium">Under A Million Stars</span>
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2 text-center flex items-center justify-center space-x-1">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 fill-amber-300" />
              <span className="text-[10px] sm:text-xs font-handwriting text-amber-200">Pure fairy-tale magic</span>
            </div>
          </div>

          {/* Right Photo */}
          <div className="relative w-28 xs:w-36 sm:w-56 md:w-64 transform rotate-6 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer shadow-xl rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 bg-white/10 backdrop-blur-md border border-white/20 flex-shrink-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900">
              <img
                src="/pics/attachments/1000296771.jpg"
                alt="Night walk memory"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                <span className="text-[10px] sm:text-xs text-white font-medium">Palm Grove Lights</span>
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2 text-center">
              <span className="text-[10px] sm:text-[11px] font-handwriting text-emerald-200">Unforgettable night</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Mobile-first full touch targets) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto px-4 max-w-md sm:max-w-none">
          <button
            onClick={onBlowCandlesClick}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#722035] via-[#881337] to-[#2563eb] text-white font-medium text-sm sm:text-base shadow-xl shadow-rose-950/50 hover:shadow-blue-900/50 hover:scale-105 active:scale-95 transition-all"
          >
            <Cake className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
            <span>Blow The Candles</span>
          </button>

          <a
            href="#memories"
            className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm sm:text-base border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>See All 18 Memories</span>
            <ArrowDown className="w-4 h-4 text-emerald-300 animate-bounce" />
          </a>

          <button
            onClick={onOpenLetter}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-200 font-medium text-sm sm:text-base border border-emerald-500/30 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 text-emerald-300 fill-emerald-300" />
            <span>Birthday Note</span>
          </button>
        </div>
      </div>
    </section>
  );
}
