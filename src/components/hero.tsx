'use client'

import type { PageContent } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
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
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })

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
            <motion.h3 variants={FADE_DOWN_ANIMATION_VARIANTS} className="font-code text-lg text-accent tracking-widest uppercase mb-4">
                Gurleen Kaur
            </motion.h3>
            <motion.h1
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-400 to-accent mb-4"
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
              className="max-w-2xl text-base md:text-lg text-gray-400"
            >
              {content.bio}
            </motion.p>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end"
          >
            <Image
              src="https://placehold.co/300x300.png"
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
