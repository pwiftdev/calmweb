'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface AudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ audioSrc, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.loop = true;

    if (isPlaying) {
      // Resume audio context if it was suspended (browser autoplay policy)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            startVisualizer();
          })
          .catch((err) => {
            console.error('Audio play error:', err);
            // Auto-play might be blocked by browser, user will need to click play
            setIsPlaying(false);
          });
      }
    } else {
      audio.pause();
      stopVisualizer();
    }

    return () => {
      stopVisualizer();
    };
  }, [isPlaying, volume, isMuted]);

  // Restart visualizer when canvas size changes
  useEffect(() => {
    if (isPlaying && canvasRef.current) {
      stopVisualizer();
      setTimeout(() => {
        if (isPlaying && audioRef.current) {
          startVisualizer();
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, isPlaying]);

  // Auto-play when autoPlay prop changes to true
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // Small delay to ensure audio element is ready and user interaction has completed
      const timer = setTimeout(() => {
        // Create/resume audio context if needed (user interaction unlocks it)
        if (!audioContextRef.current) {
          // Context will be created when startVisualizer is called
        } else if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        setIsPlaying(true);
      }, 200);
      return () => clearTimeout(timer);
    } else if (!autoPlay) {
      setIsPlaying(false);
    }
  }, [autoPlay]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const startVisualizer = () => {
    if (!canvasRef.current || !audioRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create audio context if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      analyserRef.current.fftSize = 256;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!audioRef.current || audioRef.current.paused) {
        return;
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(250, 245, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(0.5, '#c084fc');
        gradient.addColorStop(1, '#fb923c');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  const stopVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVisualizer();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 z-50 max-w-[calc(100vw-1.5rem)] sm:max-w-none"
    >
      <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-calm-200/50 overflow-hidden">
        {/* Main Player */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4">
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-calm-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-calm-600 transition-colors flex-shrink-0"
          >
            {isPlaying ? <FaPause size={14} className="sm:w-4 sm:h-4" /> : <FaPlay size={14} className="sm:w-4 sm:h-4" />}
          </motion.button>

          {/* Equalizer Canvas */}
          <div className="relative flex-shrink-0">
            <canvas
              ref={canvasRef}
              width={isExpanded ? 300 : 150}
              height={isExpanded ? 80 : 40}
              className="rounded-lg bg-calm-50/50 transition-all duration-300"
              style={{
                width: isExpanded ? 'min(200px, calc(100vw - 200px))' : 'min(100px, calc(100vw - 200px))',
                height: isExpanded ? '50px' : '30px',
                maxWidth: isExpanded ? '200px' : '100px',
              }}
            />
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute inset-0 w-full h-full opacity-0 hover:opacity-20 transition-opacity bg-calm-200 rounded-lg cursor-pointer"
              aria-label="Toggle equalizer size"
              whileHover={{ opacity: 0.1 }}
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <motion.button
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-calm-600 hover:text-calm-700 transition-colors"
            >
              {isMuted ? <FaVolumeMute size={16} className="sm:w-[18px] sm:h-[18px]" /> : <FaVolumeUp size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </motion.button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-12 sm:w-16 md:w-20 h-1 bg-calm-200 rounded-lg appearance-none cursor-pointer accent-calm-500"
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </motion.div>
  );
}

