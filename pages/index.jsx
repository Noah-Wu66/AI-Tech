'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

const Particles = () => {
  const [particleCount, setParticleCount] = useState(25);
  
  useEffect(() => {
    setParticleCount(window.innerWidth > 768 ? 50 : 25);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-100 rounded-full"
          style={{
            width: Math.random() * 5 + 1,
            height: Math.random() * 5 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="text-red-500">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ButtonOption = ({ href, text, onClick }) => (
  <Link href={href} onClick={onClick} className="w-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex items-center justify-between w-80 py-4 px-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:bg-opacity-70 transition duration-100 ease-in-out group"
    >
      <span className="text-xl font-semibold">{text}</span>
      <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-100" />
    </motion.div>
  </Link>
)

export default function Component() {
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState(null)
  const [direction, setDirection] = useState(0)

  const categoryNames = {
    normal1: "文字对话类",
    normal2: "创意图片类",
    normal3: "视频动画类",
    normal4: "音乐谱曲类",
    normal5: "数字角色类"
  }

  useEffect(() => {
    const savedUserType = localStorage.getItem('userType')
    if (savedUserType) {
      setUserType(savedUserType)
      setStep(3)
    } else {
      const timer1 = setTimeout(() => setStep(1), 1000)
      const timer2 = setTimeout(() => setStep(2), 2000)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [])

  const handleUserTypeSelect = (type) => (e) => {
    e.preventDefault()
    setUserType(type)
    setStep(3)
    setDirection(1)
    localStorage.setItem('userType', type)
  }

  const handleBackToUserTypeSelection = () => {
    setStep(2);
    setUserType(null);
    setDirection(-1);
    localStorage.removeItem('userType')
  };

  const pageVariants = {
    initial: (custom) => ({
      opacity: 0,
      x: custom === 0 ? 0 : custom * 100 + '%',
      scale: custom === 0 ? 0.8 : 1,
    }),
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: (custom) => ({ 
      opacity: 0, 
      x: custom * -100 + '%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      }
    })
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  const containerVariants = {
    hidden: (custom) => ({
      opacity: 0,
      y: custom === 0 ? 0 : 20,
    }),
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: (custom) => ({ 
      opacity: 0, 
      x: custom * -100 + '%',
      transition: { 
        duration: 0.3, 
        ease: "easeInOut",
        when: "beforeChildren",
      }
    })
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: (custom) => ({ 
      opacity: 0, 
      x: custom * -100 + '%',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    })
  }

  const renderUserOptions = () => {
    switch(userType) {
      case 'normal1':
        return (
          <>
            <ButtonOption href="https://kimi.moonshot.cn/" text="Kimi AI" />
            <ButtonOption href="https://tongyi.aliyun.com/" text="通义千问" />
            <ButtonOption href="https://www.chatglm.cn/" text="智谱清言" />
            <ButtonOption href="https://chatgpt.com/" text="ChatGPT" />
            <ButtonOption href="#" text="返回类型选择" onClick={handleBackToUserTypeSelection} />
          </>
        );
      case 'normal2':
        return (
          <>
            <ButtonOption href="https://www.freepik.com/" text="Flux-1" />
            <ButtonOption href="https://klingai.kuaishou.com/text-to-image/new" text="可灵 AI" />
            <ButtonOption href="https://jimeng.jianying.com/ai-tool/image/generate" text="即梦 AI" />
            <ButtonOption href="https://chatgpt.com/" text="Dall-E 3" />
            <ButtonOption href="#" text="返回类型选择" onClick={handleBackToUserTypeSelection} />
          </>
        );
      case 'normal3':
        return (
          <>
            <ButtonOption href="https://klingai.kuaishou.com/text-to-video/new" text="可灵 AI" />
            <ButtonOption href="https://jimeng.jianying.com/ai-tool/video/generate" text="即梦 AI" />
            <ButtonOption href="https://chatglm.cn/video?lang=zh" text="智谱清影" />
            <ButtonOption href="https://hailuoai.com/video" text="海螺视频" />
            <ButtonOption href="https://app.runwayml.com/" text="Runway" />
            <ButtonOption href="#" text="返回类型选择" onClick={handleBackToUserTypeSelection} />
          </>
        );
      case 'normal4':
        return (
          <>
            <ButtonOption href="https://hailuoai.com/music" text="海螺音乐" />
            <ButtonOption href="https://www.tiangong.cn/music" text="天工 AI" />
            <ButtonOption href="https://suno.com/" text="Suno AI" />
            <ButtonOption href="https://stableaudio.com/generate" text="Stable Audio" />
            <ButtonOption href="#" text="返回类型选择" onClick={handleBackToUserTypeSelection} />
          </>
        );
      case 'normal5':
        return (
          <>
            <ButtonOption href="https://hifly.cc/" text="飞影数字人" />
            <ButtonOption href="https://fish.audio/zh-CN/" text="Fish Audio" />
            <ButtonOption href="https://app.heygen.com/home" text="HeyGen" />
            <ButtonOption href="#" text="返回类型选择" onClick={handleBackToUserTypeSelection} />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-blue-800 overflow-hidden">
        <Particles />
        
        <AnimatePresence mode="wait" custom={direction}>
          {step < 3 ? (
            <motion.div 
              key="page1"
              className="flex flex-col items-center justify-center space-y-8"
              custom={direction}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onAnimationComplete={() => setDirection(1)}
            >
              <motion.div layout variants={containerVariants} initial="hidden" animate="visible" exit="exit" custom={direction}>
                <motion.h1 
                  variants={itemVariants}
                  className="text-5xl font-bold text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  欢迎使用<br />AI教育学习平台
                </motion.h1>
              </motion.div>

              <motion.div layout variants={containerVariants} initial="hidden" animate="visible" exit="exit" custom={direction}>
                {step >= 1 && (
                  <motion.p
                    variants={itemVariants}
                    className="text-3xl font-light"
                    initial={direction === -1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    类型...
                  </motion.p>
                )}
              </motion.div>

              <motion.div layout variants={containerVariants} initial="hidden" animate="visible" exit="exit" custom={direction}>
                {step >= 2 && (
                  <motion.div
                    className="flex flex-col items-center space-y-4"
                  >
                    <ButtonOption href="#" text="文字对话" onClick={handleUserTypeSelect('normal1')} />
                    <ButtonOption href="#" text="创意图片" onClick={handleUserTypeSelect('normal2')} />
                    <ButtonOption href="#" text="视频动画" onClick={handleUserTypeSelect('normal3')} />
                    <ButtonOption href="#" text="音乐谱曲" onClick={handleUserTypeSelect('normal4')} />
                    <ButtonOption href="#" text="数字角色" onClick={handleUserTypeSelect('normal5')} />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="page2"
              className="flex flex-col items-center justify-center space-y-8"
              custom={direction}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <motion.h1 
                className="text-5xl font-bold text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {categoryNames[userType]}
              </motion.h1>

              <motion.p
                className="text-3xl font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                选择...
              </motion.p>

              <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {renderUserOptions()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}
