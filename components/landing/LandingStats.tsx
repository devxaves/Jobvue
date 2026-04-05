'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { icon: '🏢', value: 500, suffix: '+', label: 'Jobs Posted' },
  { icon: '👤', value: 2000, suffix: '+', label: 'Profiles' },
  { icon: '🤝', value: 1200, suffix: '+', label: 'Matches' },
  { icon: '⭐', value: 4.8, suffix: '/5', label: 'Rating', isDecimal: true },
];

function CountUp({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, isDecimal]);

  return (
    <div ref={ref} className="text-2xl md:text-3xl font-bold text-brand-blue-dark" style={{ fontFamily: 'var(--font-sora)' }}>
      {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
    </div>
  );
}

export default function LandingStats() {
  return (
    <section className="py-8 px-4">
      <motion.div
        className="max-w-5xl mx-auto stats-strip"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <CountUp target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
              <div className="text-sm text-brand-text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
