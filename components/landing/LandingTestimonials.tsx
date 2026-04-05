'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya Roy',
    city: 'Kolkata',
    quote: '"Found my first freelance gig within a week! The AI interview prep helped me nail the screening call too."',
    rating: 5,
    avatar: { bg: 'from-blue-400 to-blue-600', letter: 'A' },
  },
  {
    name: 'Rahul Sharma',
    city: 'Delhi',
    quote: '"The IntervueAI mock interviews are incredibly realistic. I practiced 5 times and got my dream internship!"',
    rating: 5,
    avatar: { bg: 'from-purple-400 to-purple-600', letter: 'R' },
  },
  {
    name: 'Priya Nair',
    city: 'Bangalore',
    quote: '"As a job poster, I love how easy it is to find talented students for short-term projects. Super smooth UX."',
    rating: 4,
    avatar: { bg: 'from-green-400 to-green-600', letter: 'P' },
  },
];

export default function LandingTestimonials() {
  return (
    <section className="py-20 px-4 bg-[#EDE9FE]/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontFamily: 'var(--font-sora)' }}>
            What Our Users Say 💬
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="clay-card-soft bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatar.bg} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar.letter}
                </div>
                <div>
                  <p className="font-semibold text-brand-text text-sm">{t.name}</p>
                  <p className="text-xs text-brand-text-secondary">📍 {t.city}</p>
                </div>
              </div>

              <p className="text-brand-text-secondary text-sm leading-relaxed mb-4 italic">
                {t.quote}
              </p>

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
