import React from 'react';
import { loveReasons } from '../data/memories';
import { Heart, Sparkles, Smile, Crown, Compass, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

const iconMap = {
  Heart: Heart,
  Sparkles: Sparkles,
  Smile: Smile,
  Crown: Crown,
  Compass: Compass,
  Shield: Shield
};

export default function WhyYouAreSpecial({ recipientName }) {
  const handleCardClick = (e, index) => {
    audioManager.playPopSound();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: {
        x: e.clientX ? e.clientX / window.innerWidth : 0.5,
        y: e.clientY ? e.clientY / window.innerHeight : 0.5
      },
      colors: ['#7D9D8B', '#2563EB', '#881337', '#FCE7F3']
    });
  };

  return (
    <section id="reasons" className="relative py-16 sm:py-24 px-3 sm:px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-[#476251]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-[#722035]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>A Gentle Reminder</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white mb-3 sm:mb-4">
          Why You Are Incomparable ✨
        </h2>
        <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed">
          There are a million reasons why today is celebrated with so much adoration. Here are six of the countless reasons why having you in this world is such a blessing.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {loveReasons.map((reason, idx) => {
          const IconComponent = iconMap[reason.icon] || Sparkles;

          const cardClass =
            reason.color === 'sage'
              ? 'glass-panel-sage hover:border-emerald-400/50'
              : reason.color === 'azul'
              ? 'glass-panel-azul hover:border-blue-400/50'
              : reason.color === 'pink'
              ? 'glass-panel hover:border-pink-400/50'
              : 'glass-panel-wine hover:border-rose-400/50';

          const iconColor =
            reason.color === 'sage'
              ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
              : reason.color === 'azul'
              ? 'text-blue-300 bg-blue-500/20 border-blue-500/30'
              : reason.color === 'pink'
              ? 'text-pink-300 bg-pink-500/20 border-pink-500/30'
              : 'text-rose-300 bg-rose-500/20 border-rose-500/30';

          return (
            <div
              key={reason.id}
              onClick={(e) => handleCardClick(e, idx)}
              className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${cardClass} flex flex-col justify-between group`}
            >
              <div>
                {/* Header Icon + Number */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-serif-display font-bold text-white/20 group-hover:text-white/40 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  {reason.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white mb-2 sm:mb-3 group-hover:text-amber-200 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-handwriting text-base text-pink-300">Always & forever</span>
                <span className="text-xs text-emerald-400">
                  Tap to cheer ❤️
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
