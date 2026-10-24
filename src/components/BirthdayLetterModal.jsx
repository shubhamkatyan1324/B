import React, { useState } from 'react';
import { X, Heart, Sparkles, Edit3, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function BirthdayLetterModal({ isOpen, onClose, recipientName }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterBody, setLetterBody] = useState(
    `From quiet strolls beneath arches of fairy lights to goofy selfies and laughter that catches us off guard—every single memory we create together is a treasure I hold close to my heart.\n\nOn your birthday, I want to remind you of how extraordinary you truly are. You bring a rare grace, contagious warmth, and vibrant beauty into every room you enter. Thank you for being my constant, my favorite adventure companion, and the brightest spark in my world.\n\nMay this year unfold with boundless joy, fulfilled wishes, good health, and a million new memories waiting just around the corner.`
  );

  if (!isOpen) return null;

  const handleBreakSeal = () => {
    audioManager.playPopSound();
    setTimeout(() => {
      audioManager.playChime(true);
    }, 150);
    setIsOpened(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#722035', '#2563EB', '#7D9D8B', '#FCE7F3']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {!isOpened ? (
        /* Envelope With Wax Seal */
        <div
          onClick={handleBreakSeal}
          className="relative max-w-md w-full bg-gradient-to-br from-[#1e2a33] to-[#121c23] border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl text-center cursor-pointer hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-[#722035] border-2 border-amber-300 shadow-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-amber-200 fill-amber-200" />
          </div>

          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1 sm:mb-2">
            Private & Confidential
          </span>
          <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white mb-2">
            A Birthday Letter For {recipientName}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 mb-6 font-light">
            Sealed with golden memories and unending affection. Tap the wax seal to break the envelope.
          </p>

          <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#722035] to-[#2563eb] text-white text-xs font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Break Seal & Open 💌</span>
          </span>
        </div>
      ) : (
        /* Unfolded Letter */
        <div className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-[#faf8f5] text-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl border-4 border-[#e2d9cc]">
          {/* Letterhead */}
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3 sm:pb-4 mb-4 sm:mb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-emerald-800 block">
                Birthday Note • Special Edition
              </span>
              <h2 className="text-2xl sm:text-4xl font-handwriting text-rose-900 mt-1">
                Dearest {recipientName},
              </h2>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 sm:p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-medium flex items-center space-x-1 transition-colors"
              title={isEditing ? 'Save edits' : 'Edit note'}
            >
              {isEditing ? <Check className="w-4 h-4 text-emerald-600" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {/* Letter Body */}
          {isEditing ? (
            <textarea
              value={letterBody}
              onChange={(e) => setLetterBody(e.target.value)}
              rows={8}
              className="w-full p-3 sm:p-4 rounded-xl border border-zinc-300 bg-white font-serif-display text-zinc-800 text-sm sm:text-base leading-relaxed focus:outline-none focus:border-rose-700"
            />
          ) : (
            <div className="font-serif-display text-zinc-700 text-sm sm:text-lg leading-relaxed whitespace-pre-line mb-6 sm:mb-8 font-light">
              {letterBody}
            </div>
          )}

          {/* Signature */}
          <div className="border-t border-zinc-200 pt-4 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider block">With all my heart,</span>
              <span className="font-handwriting text-2xl sm:text-3xl text-rose-800 font-bold">Forever Yours ❤️</span>
            </div>

            <button
              onClick={() => {
                audioManager.playChime(true);
                confetti({ particleCount: 60, spread: 70 });
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#722035] hover:bg-[#881337] text-white text-xs font-semibold shadow-md transition-colors text-center"
            >
              Send Hugs 🤗
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
