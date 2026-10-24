import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function EditNameModal({ isOpen, onClose, currentName, onSaveName }) {
  const [name, setName] = useState(currentName);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSaveName(name.trim());
      audioManager.playChime(true);
      confetti({ particleCount: 50, spread: 60 });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-md w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-emerald-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-semibold">Personalize Greeting</span>
        </div>

        <h3 className="text-2xl font-serif-display font-bold text-white mb-2">
          Change Birthday Name
        </h3>
        <p className="text-sm text-zinc-300 mb-6 font-light">
          Set the name or special nickname for the birthday person to update all greetings, cakes, and letters instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Birthday Person's Name / Nickname
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Favorite Person, Shreya, Ananya..."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white text-base focus:outline-none focus:border-blue-400"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#722035] to-[#2563eb] text-white text-sm font-semibold flex items-center space-x-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Update Everywhere</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
