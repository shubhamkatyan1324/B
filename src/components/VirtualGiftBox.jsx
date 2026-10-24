import React, { useState } from 'react';
import { Gift, Sparkles, Heart, RotateCcw, Maximize2, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function VirtualGiftBox({ recipientName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleOpenGift = () => {
    audioManager.playPopSound();
    setTimeout(() => {
      audioManager.playChime(true);
    }, 200);

    setIsOpen(true);
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3', '#F59E0B']
    });
  };

  const handleRewrap = (e) => {
    e.stopPropagation();
    audioManager.playChime(false);
    setIsOpen(false);
  };

  const handleCheerSurprise = (e) => {
    e.stopPropagation();
    audioManager.playChime(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.6
      },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3']
    });
  };

  return (
    <section id="gifts" className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-gradient-to-tr from-[#722035]/25 via-[#2563eb]/20 to-[#476251]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>Birthday Surprise Unboxing</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white mb-3 leading-tight">
          A Box Full of Surprises 🎁
        </h2>
        <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed px-2">
          {isOpen
            ? "Your special surprise has been unlocked! A precious memory held closest to the heart."
            : "There is one very special surprise kept locked inside just for you. Tap the gift box below to unwrap it!"}
        </p>
      </div>

      {!isOpen ? (
        /* The Unwrapped Gift Box view */
        <div className="flex flex-col items-center justify-center py-6 sm:py-10">
          <div
            onClick={handleOpenGift}
            className="group relative cursor-pointer flex flex-col items-center transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {/* Pulsing glow under gift */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-[#722035] via-[#2563eb] to-[#7d9d8b] rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity animate-pulse-glow" />

            {/* Gift Box Container */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-[#881337] via-[#722035] to-[#420d1c] shadow-2xl border border-white/20 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
              {/* Vertical Gold Ribbon */}
              <div className="absolute inset-y-0 w-6 sm:w-8 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-md flex items-center justify-center" />
              {/* Horizontal Gold Ribbon */}
              <div className="absolute inset-x-0 h-6 sm:h-8 bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-500 shadow-md" />

              {/* Bow on Top */}
              <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-amber-300 bg-amber-400 shadow-lg transform -rotate-12" />
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-amber-300 bg-amber-400 shadow-lg transform rotate-12 -ml-3 sm:-ml-4" />
                <div className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-100 border-2 border-amber-500 shadow-md" />
              </div>

              {/* Gift Label */}
              <div className="relative z-10 bg-black/65 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-white/20 mt-12 sm:mt-16 shadow-lg max-w-[90%]">
                <span className="text-xs sm:text-sm font-handwriting text-pink-200 block truncate">
                  To: {recipientName}
                </span>
                <span className="block text-[10px] sm:text-[11px] font-semibold text-white tracking-wider uppercase mt-0.5">
                  Click To Unwrap ✨
                </span>
              </div>
            </div>

            <span className="mt-5 text-xs sm:text-sm text-zinc-300 font-medium group-hover:text-amber-300 transition-colors flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Tap the gift box to open!</span>
            </span>
          </div>
        </div>
      ) : (
        /* The Revealed Special Surprise: X.jpg */
        <div className="relative z-10 animate-fade-in flex flex-col items-center">
          {/* Top celebratory banner */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#722035]/60 via-[#2563eb]/60 to-[#476251]/60 border border-white/20 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>Special Surprise Unlocked • X.jpg</span>
            </span>
          </div>

          {/* Surprise Image Showcase Card */}
          <div className="relative max-w-md w-full bg-gradient-to-b from-[#182330] via-[#121c27] to-[#0c131b] rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl overflow-hidden group">
            {/* Glowing border accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Polaroid style container for X.jpg */}
            <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
              <img
                src="/pics/X.jpg"
                alt="Special Birthday Surprise Memory"
                className="w-full h-auto max-h-[65vh] object-cover sm:object-contain rounded-xl transition-transform duration-500 group-hover:scale-102"
              />

              {/* Quick actions overlay buttons on photo */}
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition-all shadow-md"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative badge */}
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1.5 text-white">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span className="text-[11px] font-medium tracking-wide">The Loveliest Moment</span>
              </div>
            </div>

            {/* Caption & Sentiment */}
            <div className="mt-5 text-center px-2">
              <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white mb-1.5">
                The Best Gift is You ✨
              </h3>
              <p className="font-handwriting text-xl sm:text-2xl text-pink-200 mb-4 leading-snug">
                "Dressed in festive smiles, making every heartbeat count."
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                No wrapped present in the world compares to the laughter, trust, and unforgettable moments we share together. Here is to countless more selfies, celebrations, and dreams coming true!
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleCheerSurprise}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#722035] via-[#881337] to-[#2563eb] hover:from-[#9e2a47] hover:to-[#3b82f6] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Shower With Love & Confetti ❤️</span>
                </button>

                <button
                  onClick={handleRewrap}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium border border-white/15 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Rewrap Gift Box</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN POPUP MODAL FOR X.jpg */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src="/pics/X.jpg"
              alt="Special Memory Fullscreen"
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl border border-white/20 object-contain"
            />
            <div className="mt-4 text-center">
              <span className="font-handwriting text-2xl sm:text-3xl text-pink-200">
                Happy Birthday, {recipientName}! Forever Cherished ❤️
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
