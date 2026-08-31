// Web Audio API procedural sound synthesizer (Zero external MP3 dependencies)
class SoundManager {
  constructor() {
    this.audioCtx = null
    this.isMuted = localStorage.getItem('ka_game_muted') === 'true'
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        this.audioCtx = new AudioContext()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    localStorage.setItem('ka_game_muted', this.isMuted.toString())
    return this.isMuted
  }

  playJump() {
    if (this.isMuted) return
    this.init()
    if (!this.audioCtx) return

    try {
      const osc = this.audioCtx.createOscillator()
      const gain = this.audioCtx.createGain()

      osc.type = 'square'
      const now = this.audioCtx.currentTime
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.12)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      osc.connect(gain)
      gain.connect(this.audioCtx.destination)

      osc.start(now)
      osc.stop(now + 0.12)
    } catch (e) {
      // Audio fallback
    }
  }

  playCoin() {
    if (this.isMuted) return
    this.init()
    if (!this.audioCtx) return

    try {
      const now = this.audioCtx.currentTime
      const osc1 = this.audioCtx.createOscillator()
      const osc2 = this.audioCtx.createOscillator()
      const gain = this.audioCtx.createGain()

      osc1.type = 'sine'
      osc2.type = 'triangle'

      osc1.frequency.setValueAtTime(987.77, now) // B5
      osc1.frequency.setValueAtTime(1318.51, now + 0.08) // E6

      osc2.frequency.setValueAtTime(987.77, now)
      osc2.frequency.setValueAtTime(1318.51, now + 0.08)

      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.audioCtx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.3)
      osc2.stop(now + 0.3)
    } catch (e) {
      // Audio fallback
    }
  }

  playBlockHit() {
    if (this.isMuted) return
    this.init()
    if (!this.audioCtx) return

    try {
      const now = this.audioCtx.currentTime
      const osc = this.audioCtx.createOscillator()
      const gain = this.audioCtx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(260, now)
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06)
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.18)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

      osc.connect(gain)
      gain.connect(this.audioCtx.destination)

      osc.start(now)
      osc.stop(now + 0.2)
    } catch (e) {
      // Audio fallback
    }
  }

  playPowerup() {
    if (this.isMuted) return
    this.init()
    if (!this.audioCtx) return

    try {
      const now = this.audioCtx.currentTime
      const notes = [330, 392, 659, 523, 587, 784]
      notes.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator()
        const gain = this.audioCtx.createGain()
        const t = now + i * 0.05

        osc.type = 'square'
        osc.frequency.setValueAtTime(freq, t)
        gain.gain.setValueAtTime(0.06, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1)

        osc.connect(gain)
        gain.connect(this.audioCtx.destination)

        osc.start(t)
        osc.stop(t + 0.1)
      })
    } catch (e) {
      // Audio fallback
    }
  }

  playLevelComplete() {
    if (this.isMuted) return
    this.init()
    if (!this.audioCtx) return

    try {
      const now = this.audioCtx.currentTime
      const chords = [523.25, 659.25, 783.99, 1046.5] // C E G C
      chords.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator()
        const gain = this.audioCtx.createGain()
        const t = now + idx * 0.08

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, t)
        gain.gain.setValueAtTime(0.1, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)

        osc.connect(gain)
        gain.connect(this.audioCtx.destination)

        osc.start(t)
        osc.stop(t + 0.4)
      })
    } catch (e) {
      // Audio fallback
    }
  }
}

export const soundManager = new SoundManager()
