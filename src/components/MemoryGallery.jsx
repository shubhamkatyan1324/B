import React, { useState } from 'react';
import { photoMemories } from '../data/memories';
import { Heart, Sparkles, Eye, X, ChevronLeft, ChevronRight, Grid, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export default function MemoryGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'slideshow'
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const categories = ['All', 'Nights & Magic', 'Sweet Smiles', 'Special Moments', 'Adventures'];

  const filteredMemories = activeCategory === 'All'
    ? photoMemories
    : photoMemories.filter((m) => m.category === activeCategory);

  const handleLike = (e, id) => {
    e.stopPropagation();
    audioManager.playPopSound();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));

    if (!likedPhotos[id]) {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: {
          x: e.clientX ? e.clientX / window.innerWidth : 0.5,
          y: e.clientY ? e.clientY / window.innerHeight : 0.5
        },
        colors: ['#fda4af', '#881337', '#7D9D8B']
      });
    }
  };

  const openLightbox = (photo) => {
    audioManager.playChime(false);
    setSelectedPhoto(photo);
  };

  const navigateLightbox = (direction) => {
    if (!selectedPhoto) return;
    const currentIndex = photoMemories.findIndex((p) => p.id === selectedPhoto.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = photoMemories.length - 1;
    if (nextIndex >= photoMemories.length) nextIndex = 0;
    setSelectedPhoto(photoMemories[nextIndex]);
  };

  // Slideshow timer
  React.useEffect(() => {
    let timer;
    if (viewMode === 'slideshow' && isAutoPlaying) {
      timer = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % filteredMemories.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [viewMode, isAutoPlaying, filteredMemories.length]);

  // Escape key listener to close lightbox
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="memories" className="relative py-16 sm:py-24 px-3 sm:px-4 max-w-7xl mx-auto overflow-hidden">

      {/* Decorative background glows */}
      <div className="absolute top-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#2563eb]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#722035]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Treasured Moments Collection</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-display font-bold text-white mb-3 sm:mb-4">
          Moments We'll Never Forget 📸
        </h2>
        <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed">
          Every photo is a timeless chapter of warmth, laughter, festivals under illuminated skies, and effortless joy. Explore all 18 captured memories below!
        </p>
      </div>

      {/* Rolling Marquee Filmstrip Ticker (Mobile-friendly overflow hidden) */}
      <div className="relative w-full overflow-hidden mb-8 sm:mb-12 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="animate-marquee flex space-x-3 sm:space-x-4 items-center">
          {[...photoMemories, ...photoMemories].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => openLightbox(item)}
              className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden border border-white/20 shadow-md cursor-pointer hover:scale-105 transition-transform relative group"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:brightness-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Controls: Filter Pills & View Mode (Mobile-scrollable pills) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 pb-4 border-b border-white/10">
        {/* Category Pills (Touch friendly horizontal swipe on mobile) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSlideshowIndex(0);
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#7d9d8b] via-[#2563eb] to-[#722035] text-white shadow-lg shadow-blue-900/30 font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat === 'All' ? `All (${photoMemories.length})` : cat}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center justify-center space-x-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs self-center sm:self-auto flex-shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-white/20 text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Polaroid Wall</span>
          </button>
          <button
            onClick={() => setViewMode('slideshow')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'slideshow' ? 'bg-white/20 text-white font-medium' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Cinema</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Polaroid Pinboard Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredMemories.map((photo) => {
            const isLiked = likedPhotos[photo.id];
            const washiColor =
              photo.color === 'sage'
                ? 'bg-[#7d9d8b]/80'
                : photo.color === 'azul'
                ? 'bg-[#2563eb]/80'
                : photo.color === 'pink'
                ? 'bg-[#f472b6]/80'
                : 'bg-[#722035]/80';

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(photo)}
                className={`relative group bg-[#f7f9f7] text-zinc-800 p-3.5 sm:p-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform sm:${photo.rotation} hover:rotate-0 hover:scale-103 sm:hover:scale-105 hover:z-20 cursor-pointer flex flex-col`}
              >
                {/* Washi Tape Header */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 ${washiColor} backdrop-blur-xs shadow-sm transform -rotate-1 rounded-xs opacity-90`}
                />

                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-zinc-200">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 sm:p-2.5 rounded-full bg-white/90 text-zinc-800 shadow-md">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800" />
                    </span>
                  </div>

                  {/* Category tag badge */}
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/65 backdrop-blur-xs text-white px-2 py-0.5 rounded-full">
                    {photo.tag}
                  </span>
                </div>

                {/* Polaroid Bottom Caption area */}
                <div className="pt-2.5 sm:pt-3 pb-1 flex flex-col justify-between flex-grow">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif-display font-bold text-base sm:text-lg text-zinc-900 group-hover:text-blue-900 transition-colors">
                      {photo.title}
                    </h3>
                    <button
                      onClick={(e) => handleLike(e, photo.id)}
                      className="p-1 rounded-full hover:bg-rose-100 transition-colors flex-shrink-0"
                      title="Favorite this moment"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isLiked
                            ? 'text-rose-600 fill-rose-600'
                            : 'text-zinc-400 hover:text-rose-500'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="font-handwriting text-base sm:text-lg text-zinc-700 leading-snug mt-1">
                    "{photo.caption}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW 2: Cinema Slideshow */
        <div className="relative max-w-4xl mx-auto glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/15 shadow-2xl">
          {filteredMemories.length > 0 && (
            <div>
              {/* Main Slideshow Image */}
              <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black">
                <img
                  src={filteredMemories[slideshowIndex].url}
                  alt={filteredMemories[slideshowIndex].title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-8">
                  <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
                    {filteredMemories[slideshowIndex].tag}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-serif-display font-bold text-white mb-1">
                    {filteredMemories[slideshowIndex].title}
                  </h3>
                  <p className="font-handwriting text-lg sm:text-2xl text-pink-200">
                    "{filteredMemories[slideshowIndex].caption}"
                  </p>
                </div>

                {/* Left/Right overlay arrows */}
                <button
                  onClick={() =>
                    setSlideshowIndex(
                      (prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length
                    )
                  }
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSlideshowIndex((prev) => (prev + 1) % filteredMemories.length)
                  }
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slideshow Controls Bar */}
              <div className="flex items-center justify-between mt-4 sm:mt-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white"
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isAutoPlaying ? 'Pause' : 'Auto Play'}</span>
                  </button>
                  <span className="text-xs text-zinc-400">
                    {slideshowIndex + 1} of {filteredMemories.length}
                  </span>
                </div>

                {/* Thumbnail dots */}
                <div className="flex space-x-1.5 overflow-x-auto max-w-[50%] py-1">
                  {filteredMemories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideshowIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        slideshowIndex === i ? 'w-5 sm:w-6 bg-blue-400' : 'w-1.5 sm:w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL (Mobile-Optimized with clear Close buttons & backdrop close) */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
        >
          {/* Top-Right Screen Floating Close Pill (Always visible, cannot be obscured) */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="fixed top-3 right-3 sm:top-5 sm:right-6 flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm backdrop-blur-lg border border-white/30 shadow-2xl transition-all hover:scale-105 active:scale-95 z-[110]"
            title="Close Lightbox (Press Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>Close (Esc)</span>
          </button>

          {/* Desktop Left/Right navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all z-[105] hidden md:block hover:scale-110 active:scale-95"
            title="Previous Memory"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 transition-all z-[105] hidden md:block hover:scale-110 active:scale-95"
            title="Next Memory"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Lightbox Content Card (Clicking card does not close) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#111923] border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col md:flex-row z-[105]"
          >
            {/* Direct Close Cross on Top-Right of Card */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/75 hover:bg-rose-600 text-white border border-white/20 backdrop-blur-md transition-all shadow-lg z-30"
              title="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Image side */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[35vh] max-h-[50vh] md:max-h-[75vh]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[50vh] md:max-h-[75vh] w-full object-contain"
              />
            </div>

            {/* Info Side */}
            <div className="md:w-2/5 p-5 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#16212e] to-[#0f1720]">
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4 pr-10">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {selectedPhoto.tag}
                  </span>
                  <button
                    onClick={(e) => handleLike(e, selectedPhoto.id)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        likedPhotos[selectedPhoto.id]
                          ? 'text-rose-500 fill-rose-500'
                          : 'text-zinc-400'
                      }`}
                    />
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="font-handwriting text-xl sm:text-2xl text-pink-200 mb-4 sm:mb-6 leading-relaxed">
                  "{selectedPhoto.caption}"
                </p>
                <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 leading-relaxed mb-4">
                  <span className="font-semibold text-emerald-300 block mb-1">Memory Note:</span>
                  One of the most cherished highlights in our journey. Every time you smile like this, the world turns into a friendlier, brighter, and happier place.
                </div>
              </div>

              {/* Lightbox Footer Actions + Mobile Navigation buttons + Back button */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                {/* Mobile Prev/Next quick buttons */}
                <div className="flex items-center space-x-1 md:hidden">
                  <button
                    onClick={() => navigateLightbox(-1)}
                    className="p-1.5 rounded-lg bg-white/10 text-white text-xs"
                    title="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-zinc-400 px-1">
                    {selectedPhoto.id}/{photoMemories.length}
                  </span>
                  <button
                    onClick={() => navigateLightbox(1)}
                    className="p-1.5 rounded-lg bg-white/10 text-white text-xs"
                    title="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-zinc-400 hidden md:inline">
                  {selectedPhoto.id} of {photoMemories.length} Memories
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white text-xs font-medium border border-white/20 transition-colors flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={() => {
                      audioManager.playChime(true);
                      confetti({ particleCount: 50, spread: 60 });
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#722035] to-[#2563eb] text-white text-xs font-semibold hover:scale-105 active:scale-95 transition-transform"
                  >
                    Cheer 🎉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

