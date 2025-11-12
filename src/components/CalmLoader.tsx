'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CalmLoaderProps {
  show: boolean;
  onEnter: () => void;
}

export default function CalmLoader({ show, onEnter }: CalmLoaderProps) {
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
                'linear-gradient(135deg, #f0f9ff 0%, #dcfce7 50%, #e0f2fe 100%)',
                'linear-gradient(225deg, #e0f2fe 0%, #f0f9ff 50%, #dcfce7 100%)',
                'linear-gradient(315deg, #dcfce7 0%, #e0f2fe 50%, #f0f9ff 100%)',
                'linear-gradient(45deg, #f0f9ff 0%, #e0f2fe 50%, #dcfce7 100%)',
                'linear-gradient(135deg, #f0f9ff 0%, #dcfce7 50%, #e0f2fe 100%)',
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

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-calm-300/30 to-nourish-300/30"
                style={{
                  width: 20 + Math.random() * 40,
                  height: 20 + Math.random() * 40,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, -200, -100, 0],
                  x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                  opacity: [0.2, 0.5, 0.7, 0.5, 0.2],
                  scale: [1, 1.2, 1.5, 1.2, 1],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
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
              className="px-12 py-5 bg-gradient-to-r from-calm-500 to-calm-600 text-white rounded-full text-xl md:text-2xl font-medium shadow-2xl hover:shadow-calm-500/50 transition-all duration-300"
            >
              Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

