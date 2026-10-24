// Web Audio API Birthday Melodies & Sound Effects
class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentTimeoutIds = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(frequency, startTime, duration, type = 'sine', volume = 0.2) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, startTime);

      // Smooth envelope
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
    this.init();
    if (!this.ctx || this.isMuted) return;

    const baseNotes = highPitch ? [523.25, 659.25, 783.99, 1046.50] : [261.63, 329.63, 392.00, 523.25];
    const now = this.ctx.currentTime;
    baseNotes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.08, 0.8, 'triangle', 0.15);
    });
  }

  playBlowSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      // Wind / breath noise synthesized with buffer
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

      // Magic chime afterward
      setTimeout(() => {
        this.playChime(true);
      }, 350);
    } catch {
      // Audio fallback
    }
  }

  playPopSound() {
    this.init();
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

  playHappyBirthdaySong(onEnd) {
    this.init();
    this.stopSong();
    this.isPlaying = true;

    // Frequencies (Hz) for Happy Birthday in Key of C
    // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const notes = [
      { f: 261.63, d: 0.35, gap: 0.4 },  // Hap-
      { f: 261.63, d: 0.35, gap: 0.4 },  // py
      { f: 293.66, d: 0.7, gap: 0.75 },  // birth-
      { f: 261.63, d: 0.7, gap: 0.75 },  // day
      { f: 349.23, d: 0.7, gap: 0.75 },  // to
      { f: 329.63, d: 1.2, gap: 1.3 },   // you

      { f: 261.63, d: 0.35, gap: 0.4 },  // Hap-
      { f: 261.63, d: 0.35, gap: 0.4 },  // py
      { f: 293.66, d: 0.7, gap: 0.75 },  // birth-
      { f: 261.63, d: 0.7, gap: 0.75 },  // day
      { f: 392.00, d: 0.7, gap: 0.75 },  // to
      { f: 349.23, d: 1.2, gap: 1.3 },   // you

      { f: 261.63, d: 0.35, gap: 0.4 },  // Hap-
      { f: 261.63, d: 0.35, gap: 0.4 },  // py
      { f: 523.25, d: 0.7, gap: 0.75 },  // birth-
      { f: 440.00, d: 0.7, gap: 0.75 },  // day
      { f: 349.23, d: 0.7, gap: 0.75 },  // dear
      { f: 329.63, d: 0.7, gap: 0.75 },  // [Name]
      { f: 293.66, d: 1.0, gap: 1.1 },   // ...

      { f: 466.16, d: 0.35, gap: 0.4 },  // Hap- (Bb4)
      { f: 466.16, d: 0.35, gap: 0.4 },  // py
      { f: 440.00, d: 0.7, gap: 0.75 },  // birth-
      { f: 349.23, d: 0.7, gap: 0.75 },  // day
      { f: 392.00, d: 0.7, gap: 0.75 },  // to
      { f: 349.23, d: 1.4, gap: 1.5 }    // you
    ];

    let currentOffset = 0.1;
    const now = this.ctx.currentTime;

    notes.forEach((note) => {
      const scheduledTime = now + currentOffset;
      this.playNote(note.f, scheduledTime, note.d, 'triangle', 0.18);
      // Add subtle harmony bell an octave higher
      this.playNote(note.f * 2, scheduledTime, note.d * 0.4, 'sine', 0.05);

      currentOffset += note.gap;
    });

    const totalDurationMs = (currentOffset + 0.5) * 1000;
    const tId = setTimeout(() => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    }, totalDurationMs);
    this.currentTimeoutIds.push(tId);
  }

  stopSong() {
    this.isPlaying = false;
    this.currentTimeoutIds.forEach((id) => clearTimeout(id));
    this.currentTimeoutIds = [];
    if (this.ctx) {
      // Quick re-init to silence ongoing osc
      try {
        this.ctx.close().then(() => {
          this.ctx = null;
        });
      } catch {
        this.ctx = null;
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlaying) {
      this.stopSong();
    }
    return this.isMuted;
  }
}

export const audioManager = new AudioManager();
