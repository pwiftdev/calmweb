'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

interface CalmLoaderProps {
  show: boolean;
  onEnter: () => void;
}

export default function CalmLoader({ show, onEnter }: CalmLoaderProps) {
  const memeAssets = [
    'photo_2025-11-12 20.15.25.jpeg',
    'photo_2025-11-12 20.15.50.jpeg',
    'photo_2025-11-12 20.15.51 (1).jpeg',
    'photo_2025-11-12 20.15.51.jpeg',
    'photo_2025-11-12 20.15.52 (1).jpeg',
    'photo_2025-11-12 20.15.52.jpeg',
    'photo_2025-11-12 20.15.53.jpeg',
    'photo_2025-11-12 20.15.54 (1).jpeg',
    'photo_2025-11-12 20.15.54.jpeg',
    'photo_2025-11-12 20.15.55.jpeg',
  ];

  const floatingMemes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        src: `/memes/${memeAssets[i % memeAssets.length]}`,
        size: 70 + ((i * 17) % 80),
        left: (i * 37) % 100,
        top: (i * 29) % 100,
        duration: 12 + (i % 8),
        delay: (i % 6) * 0.35,
        xAmp: 25 + (i % 5) * 8,
        yAmp: 20 + (i % 4) * 10,
        rotateAmp: 6 + (i % 4) * 2,
      })),
    []
  );

  const handleEnter = () => {
    onEnter();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-calm-100 via-nourish-100 to-calm-200"
            animate={{
              background: [
                'linear-gradient(135deg, #faf5ff 0%, #ffedd5 50%, #e9d5ff 100%)',
                'linear-gradient(225deg, #e9d5ff 0%, #faf5ff 50%, #ffedd5 100%)',
                'linear-gradient(315deg, #ffedd5 0%, #e9d5ff 50%, #faf5ff 100%)',
                'linear-gradient(45deg, #faf5ff 0%, #e9d5ff 50%, #ffedd5 100%)',
                'linear-gradient(135deg, #faf5ff 0%, #ffedd5 50%, #e9d5ff 100%)',
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Large floating orbs */}
          <motion.div
            className="absolute top-10 sm:top-20 left-0 sm:left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-calm-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, -25, 0],
              y: [0, -25, 50, 0],
              scale: [1, 1.3, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 sm:bottom-20 right-0 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-nourish-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 25, 0],
              y: [0, 25, -50, 0],
              scale: [1, 1.2, 1.4, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-calm-200/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1.2, 1],
              opacity: [0.2, 0.4, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating meme background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingMemes.map((meme) => (
              <motion.div
                key={`loader-meme-${meme.id}`}
                className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  left: `${meme.left}%`,
                  top: `${meme.top}%`,
                  width: meme.size,
                  height: meme.size,
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  x: [0, meme.xAmp, -meme.xAmp * 0.6, meme.xAmp * 0.35, 0],
                  y: [0, -meme.yAmp, meme.yAmp * 0.7, -meme.yAmp * 0.4, 0],
                  rotate: [0, meme.rotateAmp, -meme.rotateAmp, meme.rotateAmp * 0.4, 0],
                  scale: [1, 1.06, 0.97, 1.04, 1],
                  opacity: [0.25, 0.45, 0.35, 0.45, 0.25],
                }}
                transition={{
                  duration: meme.duration,
                  repeat: Infinity,
                  delay: meme.delay,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src={meme.src}
                  alt="Calm meme"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 72px, 120px"
                />
              </motion.div>
            ))}
          </div>

          {/* Gentle wave effect */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <motion.div
              className="absolute w-full h-full bg-gradient-to-t from-calm-200/40 to-transparent"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.h1
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl md:text-8xl lg:text-9xl font-extralight text-calm-800 mb-4 tracking-tight"
              >
                stay calm
              </motion.h1>
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-calm-600"
              >
                $calm
              </motion.div>
            </motion.div>

            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-calm-500 via-nourish-500 to-calm-600 text-white rounded-full text-xl md:text-2xl font-medium shadow-2xl hover:shadow-calm-500/50 transition-all duration-300"
            >
              Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

