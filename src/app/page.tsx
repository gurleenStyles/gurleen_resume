'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import type { PageContent } from '@/lib/types';
import { personalizePageContent } from '@/app/actions';

import Header from '@/components/header';
import Hero from '@/components/hero';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import { CustomCursor } from '@/components/custom-cursor';

const initialContent: PageContent = {
  hero: {
    title: "breaching digital frontiers.",
    subtitle: "a cybersecurity intern's portfolio.",
    bio: "I'm a passionate cybersecurity enthusiast with a knack for digital forensics and ethical hacking. Currently navigating the complex world of cyber threats and defenses. I thrive on challenges, turning vulnerabilities into learning opportunities.",
  },
  skills: {
    title: "skill matrix",
    description: "My arsenal of tools and technologies. Constantly evolving, always improving.",
    skillset: [
      { name: "Penetration Testing", level: 85, category: "Offensive Security" },
      { name: "Network Security", level: 90, category: "Defensive Security" },
      { name: "Python (Scapy, Nmap)", level: 80, category: "Scripting" },
      { name: "Digital Forensics", level: 75, category: "Analysis" },
      { name: "Wireshark", level: 95, category: "Tools" },
      { name: "Linux Administration", level: 85, category: "Systems" },
    ],
  },
  projects: {
    title: "project showdown",
    description: "Engage with my past exploits. Each project is a captured flag in my journey.",
    projectList: [
      {
        id: "ctf01",
        title: "Challenge 01: The Encrypted Transmission",
        description: "A CTF challenge involving steganography and cryptography.",
        tech: ["Python", "Cryptography", "Steganography"],
        details: "Intercepted a seemingly innocuous image file that held an encrypted message. Used various steganography techniques to extract the hidden data, then performed frequency analysis to crack the simple substitution cipher and reveal the flag.",
      },
      {
        id: "ctf02",
        title: "Challenge 02: Vulnerable Web App",
        description: "Exploited multiple vulnerabilities in a custom-built web application.",
        tech: ["SQL Injection", "XSS", "Burp Suite"],
        details: "Identified and exploited a SQL injection vulnerability to bypass login. Escalated privileges by leveraging a stored Cross-Site Scripting (XSS) flaw in the user profile page. Documented all findings and provided remediation advice.",
      },
      {
        id: "ctf03",
        title: "Challenge 03: Malware Analysis",
        description: "Reverse-engineered a simple malware sample in a sandboxed environment.",
        tech: ["Reverse Engineering", "Static Analysis", "Dynamic Analysis"],
        details: "Analyzed a malicious executable to understand its behavior. Performed static analysis to identify suspicious strings and API calls, then used a debugger in a sandboxed VM for dynamic analysis to observe its network traffic and file system changes, ultimately uncovering its command-and-control mechanism.",
      },
    ],
  },
  contact: {
    title: "establish contact",
    description: "Have a challenge, a question, or an opportunity? Send a secure transmission. Your data is safe with me.",
  },
};

export default function Home() {
  const [content, setContent] = useState<PageContent>(initialContent);
  const [interactions, setInteractions] = useState({ scrolls: 0, clicks: 0 });
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const aiPersonalizationTriggered = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleInteraction = useCallback((type: 'scroll' | 'click') => {
    setInteractions(prev => ({
      ...prev,
      [type === 'scroll' ? 'scrolls' : 'clicks']: prev[type === 'scroll' ? 'scrolls' : 'clicks'] + 1,
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => handleInteraction('scroll');
    const handleClick = () => handleInteraction('click');

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [handleInteraction]);

  useEffect(() => {
    if (
      !aiPersonalizationTriggered.current &&
      !isPersonalizing &&
      (interactions.scrolls + interactions.clicks > 5)
    ) {
      aiPersonalizationTriggered.current = true;
      setIsPersonalizing(true);
      const interactionData = {
        scrollDepth: scrollYProgress.get(),
        clicks: interactions.clicks,
        timeOnPage: performance.now(),
      };

      personalizePageContent({
        interactionData: JSON.stringify(interactionData),
        currentContent: JSON.stringify(content),
      })
      .then(newContent => {
        if (newContent) {
          setContent(newContent);
        }
      })
      .finally(() => {
        setIsPersonalizing(false);
      });
    }
  }, [interactions, content, isPersonalizing, scrollYProgress]);

  return (
    <>
      <CustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50" style={{ scaleX }} />
      <Header />
      <main className="flex min-h-screen flex-col items-center pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-6xl space-y-24 md:space-y-32">
          <Hero content={content.hero} />
          <Skills content={content.skills} />
          <Projects content={content.projects} />
          <Contact content={content.contact} />
        </div>
      </main>
    </>
  );
}
