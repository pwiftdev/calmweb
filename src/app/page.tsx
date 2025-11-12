'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { FaTwitter, FaCopy, FaCheck } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import CalmLoader from '../components/CalmLoader';
import AudioPlayer from '../components/AudioPlayer';

const memes = [
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

const CONTRACT_ADDRESS = 'BzvFzpYxT4G29AXpyu1pMR2Db1GTLM3Wvpw2i81Upump';
const PUMPFUN_LINK = 'https://pump.fun/coin/BzvFzpYxT4G29AXpyu1pMR2Db1GTLM3Wvpw2i81Upump';
const X_COMMUNITY_LINK = 'https://x.com/i/communities/1988658347789160516';

// Floating particles component
const FloatingParticle = ({ delay, duration, size, x, y }: { delay: number; duration: number; size: number; x: string; y: string }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-calm-300/40 to-nourish-300/40"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
    }}
    animate={{
      y: [0, -100, 0],
      x: [0, 50, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const memesRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const philosophyInView = useInView(philosophyRef, { once: true, amount: 0.3 });
  const memesInView = useInView(memesRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Disable scrolling when loader is visible
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoader]);

  const handleEnterCalmMode = () => {
    setShowLoader(false);
    setSiteVisible(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <>
      {/* Calm Loader */}
      {showLoader && <CalmLoader show={showLoader} onEnter={handleEnterCalmMode} />}

      {/* Main Site Content - Always rendered but hidden initially */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: siteVisible ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="min-h-screen overflow-x-hidden w-full max-w-full"
        style={{ 
          visibility: siteVisible ? 'visible' : 'hidden',
          pointerEvents: siteVisible ? 'auto' : 'none'
        }}
      >
        {/* Audio Player */}
        <AudioPlayer audioSrc="/calmmusic.mp3" autoPlay={siteVisible} />
      {/* Hero Section - Full Immersive */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 overflow-hidden w-full max-w-full">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-calm-100 via-nourish-100 to-calm-200"
          animate={{
            background: [
              'linear-gradient(135deg, #f0f9ff 0%, #dcfce7 50%, #e0f2fe 100%)',
              'linear-gradient(225deg, #e0f2fe 0%, #f0f9ff 50%, #dcfce7 100%)',
              'linear-gradient(315deg, #dcfce7 0%, #e0f2fe 50%, #f0f9ff 100%)',
              'linear-gradient(135deg, #f0f9ff 0%, #dcfce7 50%, #e0f2fe 100%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 0.5}
              duration={8 + Math.random() * 4}
              size={20 + Math.random() * 40}
              x={`${Math.random() * 100}%`}
              y={`${Math.random() * 100}%`}
            />
          ))}
        </div>

        {/* Large floating orbs */}
        <motion.div
          className="absolute top-10 sm:top-20 left-0 sm:left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-calm-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-0 sm:right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-nourish-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 25, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Main Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto text-center w-full px-4 sm:px-6"
        >
          {/* Logo with dramatic entrance */}
          <motion.div
            style={{ scale: logoScale, y: logoY }}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", type: "spring" }}
            className="mb-12"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/calmlogo.jpeg"
                alt="Stay Calm Logo"
                width={280}
                height={280}
                className="mx-auto rounded-full shadow-2xl border-8 border-white/60 backdrop-blur-sm"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Title with dramatic reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[12rem] font-extralight mb-4 sm:mb-6 text-calm-800 tracking-tighter leading-none break-words"
          >
            stay calm
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 sm:mb-12 text-calm-600"
          >
            $calm
          </motion.div>

          {/* Tagline with typewriter effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-calm-700 font-light mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2"
          >
            In the mayhem of crypto, there&apos;s one thing to remember:
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-calm-600 font-medium italic text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl block mt-3 sm:mt-4"
            >
              just stay calm.
            </motion.span>
          </motion.p>

          {/* Contract Address */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-8 sm:mb-10 flex flex-col items-center gap-3 sm:gap-4 w-full px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 sm:gap-4 bg-white/90 backdrop-blur-md px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full shadow-2xl border-2 border-calm-200/60 w-full max-w-full sm:max-w-none"
            >
              <span className="text-xs sm:text-sm md:text-base text-calm-600 font-mono font-semibold whitespace-nowrap">CA:</span>
              <span className="text-xs sm:text-sm md:text-base text-calm-800 font-mono break-all">{CONTRACT_ADDRESS}</span>
              <motion.button
                onClick={copyToClipboard}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 p-2 hover:bg-calm-100 rounded-full transition-colors"
                aria-label="Copy contract address"
              >
                {copied ? (
                  <FaCheck className="text-nourish-500" size={20} />
                ) : (
                  <FaCopy className="text-calm-600" size={20} />
                )}
              </motion.button>
            </motion.div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-base text-nourish-600 font-medium"
              >
                Copied!
              </motion.p>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4"
          >
            <motion.a
              href={PUMPFUN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-calm-500 to-calm-600 text-white rounded-full text-base sm:text-lg md:text-xl font-medium shadow-2xl hover:shadow-calm-500/50 transition-all duration-300 w-full sm:w-auto"
            >
              View on Pump.fun
              <HiExternalLink size={18} className="sm:w-5 sm:h-5" />
            </motion.a>
            <motion.a
              href={X_COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/95 backdrop-blur-md text-calm-700 rounded-full text-base sm:text-lg md:text-xl font-medium shadow-2xl hover:shadow-xl transition-all duration-300 border-2 border-calm-200 w-full sm:w-auto"
            >
              <FaTwitter className="text-calm-500" size={18} />
              Join Community
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-calm-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-calm-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Narrative Section - Mobile-Friendly Storytelling */}
      <section ref={philosophyRef} className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden w-full max-w-full">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white via-calm-50/40 to-nourish-50/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-calm-300/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10 w-full px-2 sm:px-4">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extralight text-calm-800 mb-6 md:mb-8 tracking-tight"
            >
              The Philosophy
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '150px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-calm-400 via-nourish-400 to-calm-400 mx-auto rounded-full"
            />
          </motion.div>

          {/* Vertical Storytelling Flow */}
          <div className="space-y-12 md:space-y-16">
            {/* Story blocks */}
            {[
              {
                type: 'chaos',
                title: 'The Mayhem',
                items: [
                  'Crypto markets are wild.',
                  'Prices swing.',
                  'FOMO hits.',
                  'Panic spreads.',
                ],
                color: 'text-red-500',
                bgColor: 'from-red-50/30 to-orange-50/20',
              },
              {
                type: 'transition',
                text: 'But in the chaos, there&apos;s clarity:',
                highlight: true,
              },
              {
                type: 'calm',
                title: 'The Calm',
                items: [
                  'Stay calm.',
                  'Find peace within the storm.',
                ],
                color: 'text-calm-600',
                bgColor: 'from-calm-50/40 to-nourish-50/30',
              },
            ].map((block, blockIndex) => (
              <motion.div
                key={blockIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: blockIndex * 0.2 }}
                className="relative"
              >
                {block.type === 'transition' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center py-8 md:py-12"
                  >
                    <motion.p
                      className="text-xl md:text-2xl lg:text-3xl text-calm-700 font-medium"
                    >
                      {block.text}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br ${block.bgColor} backdrop-blur-sm border border-white/50 shadow-xl`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold ${block.color} mb-6 md:mb-8 text-center`}
                    >
                      {block.title}
                    </motion.h3>
                    <div className="space-y-4 md:space-y-6">
                      {block.items?.map((item, itemIndex) => (
                        <motion.p
                          key={itemIndex}
                          initial={{ opacity: 0, x: block.type === 'chaos' ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.6, delay: 0.4 + itemIndex * 0.15 }}
                          className={`text-lg md:text-xl lg:text-2xl font-light text-center ${
                            itemIndex === 0 && block.type === 'calm'
                              ? 'text-2xl md:text-3xl lg:text-4xl text-calm-600 font-medium italic'
                              : 'text-gray-700'
                          }`}
                        >
                          {item}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}

            {/* Central Message */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative text-center py-12 md:py-16 px-6 md:px-8"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-calm-100/40 via-white/80 to-nourish-100/40 rounded-3xl blur-2xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <div className="relative z-10 space-y-4 md:space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="text-xl md:text-2xl lg:text-3xl text-calm-700 font-light"
                >
                  $calm isn&apos;t about avoiding the storm.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="text-xl md:text-2xl lg:text-3xl text-calm-700 font-light"
                >
                  It&apos;s about finding peace within it.
                </motion.p>
              </div>
            </motion.div>

            {/* Final Quote */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center relative py-12 md:py-16"
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-calm-300/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  delay: 1,
                  duration: 3,
                  repeat: Infinity,
                }}
                className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-light italic text-calm-600 leading-tight px-4"
              >
                &ldquo;In the mayhem,
                <br />
                <span className="font-medium">stay calm.&rdquo;</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meme Gallery Section - Immersive Grid */}
      <section ref={memesRef} className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden w-full max-w-full">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white via-calm-50/50 to-nourish-50/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <div className="max-w-7xl mx-auto relative z-10 w-full px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-extralight text-calm-800 mb-8 tracking-tight"
            >
              Stay Calm Memes
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '200px' }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-1 bg-gradient-to-r from-calm-400 via-nourish-400 to-calm-400 mx-auto rounded-full mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-calm-600 font-light"
            >
              A collection of calm vibes for your viewing pleasure
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memes.map((meme, index) => (
              <motion.div
                key={meme}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  zIndex: 10,
                }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm"
              >
                <div className="aspect-square relative">
                  <Image
                    src={`/memes/${meme}`}
                    alt={`Calm meme ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-125"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-calm-800 via-calm-900 to-calm-950 text-white text-center overflow-hidden w-full max-w-full">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-4"
          >
            stay calm
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-calm-300 text-lg mb-8"
          >
            $calm on Pump.fun
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <motion.a
              href={X_COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-calm-700/50 hover:bg-calm-700 rounded-full transition-colors backdrop-blur-sm"
              aria-label="X Community"
            >
              <FaTwitter size={24} className="text-calm-300" />
            </motion.a>
            <motion.a
              href={PUMPFUN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-calm-700/50 hover:bg-calm-700 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Pump.fun"
            >
              <HiExternalLink size={24} className="text-calm-300" />
            </motion.a>
          </motion.div>

          {/* Contract Address in Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-3 text-calm-400 text-sm font-mono"
          >
            <span>{CONTRACT_ADDRESS}</span>
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 hover:text-white transition-colors"
              aria-label="Copy contract address"
            >
              {copied ? (
                <FaCheck size={14} />
              ) : (
                <FaCopy size={14} />
              )}
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-calm-500 text-sm mt-8 font-light italic"
          >
            In the mayhem, stay calm.
          </motion.p>
        </div>
      </footer>
      </motion.main>
    </>
  );
}
