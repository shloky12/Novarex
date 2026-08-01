// Web Audio API high-fidelity V12 hypercar audio engine
let audioCtx: AudioContext | null = null;
let engineOscs: OscillatorNode[] = [];
let noiseNode: AudioBufferSourceNode | null = null;
let turboOsc: OscillatorNode | null = null;
let mainGain: GainNode | null = null;
let isPlaying = false;
let revInterval: number | null = null;

export function toggleSoundscape(): boolean {
  if (isPlaying) {
    stopSoundscape();
    return false;
  } else {
    startSoundscape();
    return true;
  }
}

export function isSoundscapePlaying(): boolean {
  return isPlaying;
}

export function startSoundscape() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Master Output & Limiter/Gain
    mainGain = audioCtx.createGain();
    mainGain.gain.setValueAtTime(0.001, now);
    // Smooth ramp-in
    mainGain.gain.exponentialRampToValueAtTime(0.12, now + 1.5);

    // High Pass to filter out unpleasant rumble < 25Hz
    const hpFilter = audioCtx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(30, now);

    // Exhaust Tone Formant Resonator (creates crisp high-pitched metallic hypercar note)
    const exhaustResonator = audioCtx.createBiquadFilter();
    exhaustResonator.type = 'peaking';
    exhaustResonator.frequency.setValueAtTime(1450, now); // Metallic high exhaust formant
    exhaustResonator.Q.setValueAtTime(3.5, now);
    exhaustResonator.gain.setValueAtTime(8, now);

    // Low Pass Warmth Filter
    const lpFilter = audioCtx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.frequency.setValueAtTime(2800, now);

    // V12 Firing Harmonics Setup
    // Fundamental firing frequency for V12 @ ~1100 RPM idle is ~110 Hz
    const baseFreq = 52; // Fundamental mechanical rotation
    const harmonics = [
      { type: 'sawtooth', freqMult: 1, gain: 0.35 },    // 1st order sub
      { type: 'sawtooth', freqMult: 2, gain: 0.4 },     // V6 engine bank A
      { type: 'sawtooth', freqMult: 3, gain: 0.3 },     // V12 firing order primary
      { type: 'triangle', freqMult: 6, gain: 0.25 },    // Higher order high-pitched howl
      { type: 'sine', freqMult: 12, gain: 0.15 }        // Titanium exhaust scream order
    ];

    engineOscs = [];

    const engineBus = audioCtx.createGain();
    engineBus.gain.setValueAtTime(0.7, now);

    harmonics.forEach((h) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      
      osc.type = h.type as OscillatorType;
      osc.frequency.setValueAtTime(baseFreq * h.freqMult, now);
      oscGain.gain.setValueAtTime(h.gain, now);

      osc.connect(oscGain);
      oscGain.connect(engineBus);
      osc.start(now);
      engineOscs.push(osc);
    });

    // High-Tech Hybrid / Turbo Electric Whistle (2.2 kHz - 3.8 kHz subtle spooling tone)
    turboOsc = audioCtx.createOscillator();
    const turboGain = audioCtx.createGain();
    turboOsc.type = 'sine';
    turboOsc.frequency.setValueAtTime(2400, now);
    turboGain.gain.setValueAtTime(0.015, now);

    // Subtle LFO modulation for organic engine idle dynamics
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(2.2, now); // ~2.2 Hz breathing pulse
    lfoGain.gain.setValueAtTime(3.5, now);
    lfo.connect(engineOscs[0].frequency); // subtly modulate fundamental frequency
    lfo.start(now);

    // Mechanical Air Intake Noise (Crisp raspiness)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, now);
    noiseFilter.Q.setValueAtTime(2.0, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(engineBus);
    noiseNode.start(now);

    // Stereo Panner for Spatial Depth
    let pannerNode: AudioNode = mainGain;
    if (audioCtx.createStereoPanner) {
      const panner = audioCtx.createStereoPanner();
      panner.pan.setValueAtTime(0.0, now);
      pannerNode = panner;
    }

    // Wiring graph
    engineBus.connect(hpFilter);
    turboOsc.connect(turboGain);
    turboGain.connect(hpFilter);

    hpFilter.connect(exhaustResonator);
    exhaustResonator.connect(lpFilter);
    lpFilter.connect(mainGain);
    mainGain.connect(pannerNode);

    if (pannerNode !== mainGain) {
      pannerNode.connect(audioCtx.destination);
    } else {
      mainGain.connect(audioCtx.destination);
    }

    turboOsc.start(now);

    // Dynamic subtle engine rev pulse interval
    let pulseCount = 0;
    revInterval = window.setInterval(() => {
      if (!audioCtx || !isPlaying) return;
      const t = audioCtx.currentTime;
      pulseCount++;
      // Every few seconds, simulate a subtle blip of throttle / rev pulse
      if (pulseCount % 5 === 0 && engineOscs.length > 0) {
        const targetFreq = baseFreq * 1.35; // Rev up slightly
        engineOscs.forEach((osc, idx) => {
          const mult = harmonics[idx]?.freqMult || 1;
          osc.frequency.cancelScheduledValues(t);
          osc.frequency.setValueAtTime(osc.frequency.value, t);
          osc.frequency.exponentialRampToValueAtTime(targetFreq * mult, t + 0.4);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * mult, t + 1.2);
        });
        if (turboOsc) {
          turboOsc.frequency.cancelScheduledValues(t);
          turboOsc.frequency.setValueAtTime(turboOsc.frequency.value, t);
          turboOsc.frequency.exponentialRampToValueAtTime(3600, t + 0.4);
          turboOsc.frequency.exponentialRampToValueAtTime(2400, t + 1.2);
        }
      }
    }, 1000);

    isPlaying = true;
  } catch (err) {
    console.warn('AudioContext not allowed or not supported:', err);
    isPlaying = false;
  }
}

export function stopSoundscape() {
  if (revInterval) {
    clearInterval(revInterval);
    revInterval = null;
  }

  if (mainGain && audioCtx) {
    const now = audioCtx.currentTime;
    mainGain.gain.cancelScheduledValues(now);
    mainGain.gain.setValueAtTime(mainGain.gain.value, now);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      try {
        engineOscs.forEach((osc) => {
          osc.stop();
          osc.disconnect();
        });
        engineOscs = [];
        turboOsc?.stop();
        turboOsc?.disconnect();
        turboOsc = null;
        noiseNode?.stop();
        noiseNode?.disconnect();
        noiseNode = null;
      } catch {
        // ignore cleanup errors
      }
      isPlaying = false;
    }, 850);
  } else {
    isPlaying = false;
  }
}

