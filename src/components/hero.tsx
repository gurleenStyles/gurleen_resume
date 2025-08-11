'use client'

import type { PageContent } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, KeyboardEvent } from 'react'
import { ArrowDown, Terminal, Download } from 'lucide-react'
import Image from 'next/image'

type HeroProps = {
  content: PageContent['hero']
}

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}

export default function Hero({ content }: HeroProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState(['Welcome to my portfolio! Type "help" for available commands.'])
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    let response = ''
    
    switch (cmd) {
      case 'resume':
        // Trigger resume download
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'gurleen_resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        response = 'Downloading resume...'
        
        // Only reset and show help for resume command
        setOutput(prev => [...prev, `$ ${command}`, response])
        setTimeout(() => {
          setOutput(['Welcome to my portfolio! Type "help" for available commands.'])
        }, 2000)
        return
        
      case 'help':
        response = 'Available commands:\n- resume: Download my resume\n- about: Learn about me\n- contact: Get my contact info\n- clear: Clear terminal'
        break
      case 'about':
        response = content.bio + '\n\nType "back" to return to help menu.'
        break
      case 'contact':
        response = 'Email: smartgurleen5@gmail.com\nLinkedIn: Connect with me!\nGitHub: Check out my projects\n\nType "back" to return to help menu.'
        break
      case 'back':
        response = 'Available commands:\n- resume: Download my resume\n- about: Learn about me\n- contact: Get my contact info\n- clear: Clear terminal'
        break
      case 'clear':
        setOutput(['Welcome to my portfolio! Type "help" for available commands.'])
        return
      default:
        response = `Command "${command}" not found. Type "help" for available commands.`
    }
    
    // For all other commands, just add to output without resetting
    setOutput(prev => [...prev, `$ ${command}`, response])
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    }
  }

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) =>
    pos === 1 ? 'relative' : 'fixed'
  )

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="relative h-screen flex flex-col items-center justify-center text-center md:text-left"
      id="hero"
    >
      <motion.div
        style={{ scale, position }}
        className="top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4">
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.h3 variants={FADE_DOWN_ANIMATION_VARIANTS} className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-400 to-accent mb-4">
                Gurleen Kaur
            </motion.h3>
            <motion.h1
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="font-code text-lg text-accent tracking-widest uppercase mb-4"
            >
              {content.title}
            </motion.h1>
            <motion.h2
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="font-headline text-2xl md:text-3xl font-medium text-gray-300 mb-8"
            >
              {content.subtitle}
            </motion.h2>
            <motion.p
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="max-w-2xl text-base md:text-lg text-gray-400 mb-6"
            >
              {content.bio}
            </motion.p>
            
            {/* CLI Terminal */}
            <motion.div
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="w-full max-w-md"
            >
              <button
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className="flex items-center gap-2 text-accent hover:text-primary transition-colors mb-2"
              >
                <Terminal className="w-4 h-4" />
                <span className="text-sm">Open Terminal</span>
              </button>
              
              {isTerminalOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/80 backdrop-blur-sm border border-accent/30 rounded-lg p-4 font-mono text-sm"
                >
                  <div className="h-32 overflow-y-auto mb-2 space-y-1">
                    {output.map((line, index) => (
                      <div key={index} className={line.startsWith('$') ? 'text-accent' : 'text-gray-300'}>
                        {line.split('\n').map((subline, subindex) => (
                          <div key={subindex}>{subline}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">$</span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent outline-none text-gray-300 placeholder-gray-500"
                      placeholder="Type 'help' for commands..."
                      autoFocus
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end"
          >
            <Image
              src="/image.jpeg"
              alt="My picture"
              width={300}
              height={300}
              className="rounded-full border-4 border-primary/50 glow-shadow"
              data-ai-hint="person"
            />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-10 flex items-center gap-2 text-accent"
      >
        <ArrowDown className="w-4 h-4" />
        <span>Scroll to explore</span>
      </motion.div>
    </motion.section>
  )
}
