import React, { useState } from 'react';
import { Sparkles, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function InteractiveCake({ recipientName }) {
  const [candles, setCandles] = useState([true, true, true]); // 3 candles
  const [isWishGranted, setIsWishGranted] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const [hasEnteredWish, setHasEnteredWish] = useState(false);

  const allCandlesOut = candles.every((c) => !c);

  const blowOutAllCandles = () => {
    audioManager.playBlowSound();
    setCandles([false, false, false]);
    setIsWishGranted(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3', '#F59E0B']
    });
  };

  const blowIndividualCandle = (index) => {
    audioManager.playBlowSound();
    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    if (updated.every((c) => !c)) {
      setIsWishGranted(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3', '#F59E0B']
      });
    }
  };

  const relightCandles = () => {
    audioManager.playChime(false);
    setCandles([true, true, true]);
    setIsWishGranted(false);
  };

  const handleSaveWish = (e) => {
    e.preventDefault();
    if (wishInput.trim()) {
      setHasEnteredWish(true);
      audioManager.playChime(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <section id="cake" className="relative py-16 sm:py-24 px-3 sm:px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[34rem] h-72 sm:h-[34rem] bg-gradient-to-tr from-[#722035]/20 via-[#476251]/20 to-[#2563eb]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-white/15 shadow-2xl text-center">
        {/* Section title */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Birthday Ritual</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-white mb-2 sm:mb-3">
          Make a Secret Wish! 🎂
        </h2>
        <p className="text-xs sm:text-base text-zinc-300 max-w-xl mx-auto mb-8 sm:mb-10 px-2 font-light">
          Close your eyes, think of the one dream that would make your year unforgettable, and blow out the candles below.
        </p>

        {/* 3D-styled Birthday Cake Container (Mobile-first responsive scaling) */}
        <div className="relative w-full max-w-[270px] xs:max-w-[320px] sm:max-w-sm mx-auto h-56 sm:h-72 flex flex-col items-center justify-end mb-6 sm:mb-8 select-none">
          {/* Candles Stand */}
          <div className="flex justify-center space-x-6 sm:space-x-12 mb-[-6px] sm:mb-[-8px] z-20">
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => isLit && blowIndividualCandle(idx)}
                className={`relative flex flex-col items-center cursor-pointer group transition-transform ${
                  isLit ? 'hover:scale-110 active:scale-95' : ''
                }`}
                title={isLit ? 'Click to blow candle' : 'Candle blown out'}
              >
                {/* Flame or Smoke */}
                {isLit ? (
                  <div className="relative mb-1">
                    {/* Glowing outer halo */}
                    <div className="absolute -top-3 -left-3 w-8 h-10 bg-amber-400/40 rounded-full blur-md animate-pulse" />
                    {/* Flame shape */}
                    <div className="w-3 sm:w-3.5 h-6 sm:h-7 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-flicker shadow-[0_0_15px_#f59e0b]" />
                  </div>
                ) : (
                  <div className="h-6 sm:h-7 flex flex-col items-center justify-end mb-1">
                    {/* Smoke wisps */}
                    <span className="w-1.5 h-3 bg-zinc-400/40 rounded-full blur-[1px] animate-pulse" />
                    <span className="w-1 h-2 bg-zinc-500/30 rounded-full blur-[1px]" />
                  </div>
                )}

                {/* Candle Wick */}
                <div className="w-0.5 h-1.5 sm:h-2 bg-zinc-800" />

                {/* Candle Stick with modern palette stripes */}
                <div
                  className={`w-3 sm:w-4 h-12 sm:h-16 rounded-t-sm shadow-md border border-white/20 ${
                    idx === 0
                      ? 'bg-gradient-to-b from-[#7d9d8b] to-[#476251]'
                      : idx === 1
                      ? 'bg-gradient-to-b from-[#60a5fa] to-[#1e40af]'
                      : 'bg-gradient-to-b from-[#f472b6] to-[#722035]'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-40 xs:w-48 sm:w-56 h-14 sm:h-20 bg-gradient-to-r from-[#fce7f3] via-[#ffffff] to-[#fce7f3] rounded-t-2xl sm:rounded-t-3xl relative shadow-lg border-t-4 border-pink-200 z-10 flex items-center justify-center">
            {/* Cream swirls / Drips */}
            <div className="absolute -bottom-2 w-full flex justify-around px-2">
              <span className="w-4 sm:w-5 h-3 sm:h-4 bg-pink-100 rounded-full shadow-xs" />
              <span className="w-5 sm:w-6 h-4 sm:h-5 bg-pink-200 rounded-full shadow-xs" />
              <span className="w-4 sm:w-5 h-3 sm:h-4 bg-pink-100 rounded-full shadow-xs" />
              <span className="w-5 sm:w-6 h-4 sm:h-5 bg-pink-200 rounded-full shadow-xs" />
            </div>
            {/* Sprinkles on top tier */}
            <div className="flex space-x-2 text-xs">
              <span className="w-2 h-1 bg-emerald-400 rounded-full rotate-45 inline-block" />
              <span className="w-2 h-1 bg-blue-500 rounded-full -rotate-12 inline-block" />
              <span className="w-2 h-1 bg-rose-500 rounded-full rotate-30 inline-block" />
              <span className="w-2 h-1 bg-amber-400 rounded-full -rotate-45 inline-block" />
            </div>
          </div>

          {/* Cake Bottom Tier */}
          <div className="w-56 xs:w-64 sm:w-76 h-16 sm:h-24 bg-gradient-to-r from-[#881337] via-[#9e2a47] to-[#722035] rounded-t-2xl sm:rounded-t-3xl relative shadow-2xl border-t-4 border-rose-400 flex flex-col items-center justify-center overflow-hidden">
            <div className="text-white/95 font-handwriting text-base sm:text-xl tracking-wider drop-shadow-sm truncate max-w-[90%] px-2">
              Happy Birthday {recipientName}
            </div>
            {/* Decorative ribbon line */}
            <div className="w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-300 mt-1 opacity-80" />
            {/* Frosting rosettes */}
            <div className="flex space-x-3 sm:space-x-4 mt-1.5 sm:mt-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-200/80 shadow-xs" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-200/80 shadow-xs" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-pink-200/80 shadow-xs" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-200/80 shadow-xs" />
            </div>
          </div>

          {/* Cake Stand / Base */}
          <div className="w-60 xs:w-72 sm:w-84 h-3.5 sm:h-4 bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-400 rounded-full shadow-2xl border border-white/50" />
          <div className="w-20 sm:w-32 h-2.5 sm:h-3 bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 rounded-b-md shadow-md" />
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
          {!allCandlesOut ? (
            <button
              onClick={blowOutAllCandles}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#722035] via-[#881337] to-[#2563eb] hover:from-[#9e2a47] hover:to-[#3b82f6] text-white font-medium text-sm sm:text-base shadow-xl shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Wind className="w-4 h-4 text-pink-200" />
              <span>Blow Out All Candles & Make a Wish</span>
            </button>
          ) : (
            <button
              onClick={relightCandles}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium border border-white/20 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 text-emerald-300" />
              <span>Relight Candles</span>
            </button>
          )}
        </div>

        {/* Revealed Wish Granted Card */}
        {isWishGranted && (
          <div className="mt-6 sm:mt-8 max-w-lg mx-auto bg-gradient-to-br from-[#1b2a22]/80 via-[#18233c]/80 to-[#2c121e]/80 border border-emerald-400/40 rounded-2xl p-5 sm:p-6 shadow-2xl animate-fade-in backdrop-blur-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <h3 className="text-lg sm:text-2xl font-serif-display font-semibold text-emerald-200 mb-2">
              ✨ Your Wish Has Been Whispered to the Universe!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 font-light">
              May every single candle you blew bring you thirty-fold in peace, abundance, health, and pure unadulterated joy.
            </p>

            {/* Optional Wish Lock Box */}
            {!hasEnteredWish ? (
              <form onSubmit={handleSaveWish} className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  placeholder="Lock in a secret wish (optional)..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors whitespace-nowrap shadow-md"
                >
                  Seal Wish 🔒
                </button>
              </form>
            ) : (
              <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-400/30 text-emerald-300 text-xs font-medium flex items-center justify-center space-x-2">
                <span>🔒 Sealed into the birthday time-capsule: "{wishInput}"</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
