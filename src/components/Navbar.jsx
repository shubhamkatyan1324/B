import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Music, Cake, Gift, Image, BookOpen, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function Navbar({ recipientName, theme = 'dark', onToggleTheme, onOpenLetter }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    setIsPlayingMusic(audioManager.isPlaying);
    return unsubscribe;
  }, []);

  const triggerConfettiExplosion = () => {
    audioManager.playChime(true);
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3', '#F59E0B']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      audioManager.stopSong();
    } else {
      audioManager.playSong(undefined, 44);
    }
  };

  const handleToggleMute = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
    if (muted) setIsPlayingMusic(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0d161d]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-[#0b1319]/80 to-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Name badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#722035] via-[#2563eb] to-[#7d9d8b] p-[2px] shadow-md flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#0d161d] rounded-full flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300 fill-pink-400/50 animate-pulse" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-handwriting text-lg sm:text-2xl text-pink-200 hidden xs:inline whitespace-nowrap">
                  Happy Birthday,
                </span>
                <span className="font-serif-display font-semibold text-sm sm:text-lg text-white truncate">
                  {recipientName}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Center Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 text-sm">
            <a
              href="#memories"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Image className="w-3.5 h-3.5 text-blue-400" />
              <span>Memories</span>
            </a>
            <a
              href="#cake"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Cake className="w-3.5 h-3.5 text-pink-400" />
              <span>Birthday Cake</span>
            </a>
            <a
              href="#reasons"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Why You're Special</span>
            </a>
            <a
              href="#gifts"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Surprise Box</span>
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 flex-shrink-0">
            {/* Birthday Song Toggle */}
            <button
              onClick={handleToggleMusic}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                isPlayingMusic
                  ? 'bg-blue-600/30 border-blue-400 text-blue-200 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 border-white/15 text-zinc-300 hover:bg-white/10'
              }`}
              title={isPlayingMusic ? 'Pause: Jab Koi Baat Bigad Jaaye' : 'Play: Jab Koi Baat Bigad Jaaye'}
            >
              <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-bounce text-blue-300' : ''}`} />
              <span className="hidden sm:inline">
                {isPlayingMusic ? 'Jab Koi Baat...' : 'Play Song'}
              </span>
              {isPlayingMusic && (
                <span className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 h-full bg-blue-400 animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-blue-300 animate-pulse delay-75" />
                  <span className="w-0.5 h-4/5 bg-blue-200 animate-pulse delay-150" />
                </span>
              )}
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={() => {
                audioManager.playPopSound();
                if (onToggleTheme) onToggleTheme();
              }}
              className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 fill-blue-500/20" />
              ) : (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300/20" />
              )}
            </button>

            {/* Mute toggle */}
            <button
              onClick={handleToggleMute}
              className="p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
            </button>

            {/* Celebrate with Confetti */}
            <button
              onClick={triggerConfettiExplosion}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#722035] via-[#881337] to-[#2563eb] hover:from-[#8b2742] hover:to-[#3b82f6] text-white text-xs font-semibold shadow-lg shadow-wine-900/40 hover:scale-105 active:scale-95 transition-transform"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 fill-yellow-300" />
              <span className="hidden xs:inline">Celebrate!</span>
            </button>

            {/* Open letter quick trigger */}
            <button
              onClick={onOpenLetter}
              className="p-1.5 sm:p-2 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-800/50 hover:text-white transition-colors"
              title="Read Birthday Letter"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Quick Dock for convenient thumb navigation */}
      <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-[#0e1720]/90 backdrop-blur-lg border border-white/15 px-3 py-1.5 rounded-full shadow-2xl flex items-center space-x-1 max-w-[94vw]">
        <a
          href="#memories"
          className="flex flex-col items-center px-2 py-1 text-[10px] text-zinc-300 hover:text-white rounded-lg active:scale-90"
        >
          <Image className="w-4 h-4 text-blue-400 mb-0.5" />
          <span>Photos</span>
        </a>
        <a
          href="#cake"
          className="flex flex-col items-center px-2 py-1 text-[10px] text-zinc-300 hover:text-white rounded-lg active:scale-90"
        >
          <Cake className="w-4 h-4 text-pink-400 mb-0.5" />
          <span>Cake</span>
        </a>
        <a
          href="#reasons"
          className="flex flex-col items-center px-2 py-1 text-[10px] text-zinc-300 hover:text-white rounded-lg active:scale-90"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>Special</span>
        </a>
        <a
          href="#gifts"
          className="flex flex-col items-center px-2 py-1 text-[10px] text-amber-300 hover:text-white rounded-lg active:scale-90 font-medium"
        >
          <Gift className="w-4 h-4 text-amber-400 mb-0.5" />
          <span>Surprise</span>
        </a>
      </div>
    </>
  );
}
