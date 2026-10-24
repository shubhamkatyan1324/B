// Audio Manager for "Jab Koi Baat Bigad Jaaye" & Interactive Sound Effects
class AudioManager {
  constructor() {
    this.ctx = null;
    this.audioElement = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.listeners = [];
    this.hasSeekedInitial = false;
    this.songTitle = "Jab Koi Baat Bigad Jaye";
    this.musicSrc = '/music/' + encodeURIComponent('Jab Koi Baat Bigad Jaye_320(KoshalWorld.Com).mp3');
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  notify(isPlaying) {
    this.isPlaying = isPlaying;
    this.listeners.forEach((cb) => {
      try {
        cb(isPlaying);
      } catch {}
    });
  }

  initAudio() {
    if (!this.audioElement && typeof window !== 'undefined') {
      this.audioElement = new Audio(this.musicSrc);
      this.audioElement.loop = true;
      this.audioElement.volume = 0.85;
      this.audioElement.muted = this.isMuted;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.notify(true);
      });

      this.audioElement.addEventListener('pause', () => {
        this.notify(false);
      });

      this.audioElement.addEventListener('ended', () => {
        this.notify(false);
      });
    }
  }

  seekTo(seconds) {
    this.initAudio();
    if (!this.audioElement) return;

    if (this.audioElement.readyState >= 1) {
      try {
        this.audioElement.currentTime = seconds;
      } catch {}
    } else {
      const handleMetadata = () => {
        try {
          this.audioElement.currentTime = seconds;
        } catch {}
      };
      this.audioElement.addEventListener('loadedmetadata', handleMetadata, { once: true });
    }
  }

  initSynthContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play "Jab Koi Baat Bigad Jaaye", starting from 44s if starting fresh
  playSong(onEnd, targetTime = 44) {
    this.initAudio();
    if (!this.audioElement) return Promise.reject(new Error('Audio not supported'));

    if (!this.hasSeekedInitial && targetTime !== null) {
      this.seekTo(targetTime);
      this.hasSeekedInitial = true;
    } else if (this.audioElement.currentTime < 1 && targetTime !== null) {
      this.seekTo(targetTime);
    }

    this.audioElement.muted = this.isMuted;
    const playPromise = this.audioElement.play();

    if (onEnd) {
      this.audioElement.onended = () => {
        this.notify(false);
        onEnd();
      };
    }

    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.notify(true);
          return true;
        })
        .catch((err) => {
          this.notify(false);
          // If browser policy blocked playback, return rejected promise so caller knows
          return Promise.reject(err);
        });
    }

    this.notify(true);
    return Promise.resolve(true);
  }

  stopSong() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify(false);
    if (this.currentTimeoutIds) {
      this.currentTimeoutIds.forEach((id) => clearTimeout(id));
      this.currentTimeoutIds = [];
    }
  }

  toggleSong(onEnd) {
    if (this.isPlaying) {
      this.stopSong();
      return false;
    } else {
      this.playSong(onEnd, 44);
      return true;
    }
  }

  // Automatic playback beginning at 44s, with robust interaction fallback for browser autoplay policies
  autoPlay(startTime = 44) {
    this.seekTo(startTime);

    const tryPlay = () => {
      this.playSong(undefined, startTime).catch(() => {
        // Autoplay blocked: wait for very first user click, touch, or keypress anywhere on screen
        const startOnGesture = () => {
          this.playSong(undefined, startTime).catch(() => {});
          ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach((evt) => {
            window.removeEventListener(evt, startOnGesture, true);
          });
        };

        ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'].forEach((evt) => {
          window.addEventListener(evt, startOnGesture, { once: true, capture: true });
        });
      });
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        tryPlay();
      } else {
        window.addEventListener('load', tryPlay, { once: true });
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    return this.isMuted;
  }

  // Interactive Sound Effects (Web Audio API)
  playNote(frequency, startTime, duration, type = 'sine', volume = 0.2) {
    this.initSynthContext();
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio fallback handling
    }
  }

  playChime(highPitch = false) {
    this.initSynthContext();
    if (!this.ctx || this.isMuted) return;

    const baseNotes = highPitch ? [523.25, 659.25, 783.99, 1046.50] : [261.63, 329.63, 392.00, 523.25];
    const now = this.ctx.currentTime;
    baseNotes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.08, 0.8, 'triangle', 0.15);
    });
  }

  playBlowSound() {
    this.initSynthContext();
    if (!this.ctx || this.isMuted) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();

      setTimeout(() => {
        this.playChime(true);
      }, 350);
    } catch {
      // Audio fallback
    }
  }

  playPopSound() {
    this.initSynthContext();
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // fallback
    }
  }

  // Synthesized fallback for Jab Koi Baat Bigad Jaaye
  playSynthesizedJabKoiBaat(onEnd) {
    this.initSynthContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentTimeoutIds = [];

    // Frequencies: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const notes = [
      // Jab koi baat bigad jaaye
      { f: 261.63, d: 0.35, gap: 0.4 },
      { f: 293.66, d: 0.35, gap: 0.4 },
      { f: 329.63, d: 0.4, gap: 0.45 },
      { f: 329.63, d: 0.4, gap: 0.45 },
      { f: 329.63, d: 0.4, gap: 0.45 },
      { f: 293.66, d: 0.35, gap: 0.4 },
      { f: 261.63, d: 0.35, gap: 0.4 },
      { f: 293.66, d: 0.8, gap: 0.9 },

      // Jab koi mushkil pad jaaye
      { f: 293.66, d: 0.35, gap: 0.4 },
      { f: 329.63, d: 0.35, gap: 0.4 },
      { f: 349.23, d: 0.4, gap: 0.45 },
      { f: 349.23, d: 0.4, gap: 0.45 },
      { f: 349.23, d: 0.4, gap: 0.45 },
      { f: 329.63, d: 0.35, gap: 0.4 },
      { f: 293.66, d: 0.35, gap: 0.4 },
      { f: 329.63, d: 0.8, gap: 0.9 },

      // Tum dena saath mera
      { f: 329.63, d: 0.35, gap: 0.4 },
      { f: 349.23, d: 0.35, gap: 0.4 },
      { f: 392.00, d: 0.45, gap: 0.5 },
      { f: 392.00, d: 0.45, gap: 0.5 },
      { f: 392.00, d: 0.45, gap: 0.5 },
      { f: 349.23, d: 0.35, gap: 0.4 },
      { f: 329.63, d: 0.35, gap: 0.4 },
      { f: 349.23, d: 0.8, gap: 0.9 },

      // O humnawa
      { f: 293.66, d: 0.5, gap: 0.55 },
      { f: 329.63, d: 0.5, gap: 0.55 },
      { f: 261.63, d: 1.2, gap: 1.4 }
    ];

    let currentOffset = 0.1;
    const now = this.ctx.currentTime;

    notes.forEach((note) => {
      const scheduledTime = now + currentOffset;
      this.playNote(note.f, scheduledTime, note.d, 'triangle', 0.22);
      this.playNote(note.f * 0.5, scheduledTime, note.d, 'sine', 0.15); // Warm bass octave
      currentOffset += note.gap;
    });

    const totalDurationMs = (currentOffset + 0.5) * 1000;
    const tId = setTimeout(() => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    }, totalDurationMs);
    this.currentTimeoutIds.push(tId);
  }
}

export const audioManager = new AudioManager();
