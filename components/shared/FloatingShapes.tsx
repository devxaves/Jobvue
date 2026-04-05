'use client';

import { motion } from 'framer-motion';

const shapes = [
  // Floating circles
  { type: 'circle', x: '8%', y: '15%', size: 60, color: '#2563EB', opacity: 0.12, duration: 8, delay: 0 },
  { type: 'circle', x: '85%', y: '20%', size: 45, color: '#7C3AED', opacity: 0.1, duration: 10, delay: 1 },
  { type: 'circle', x: '75%', y: '75%', size: 35, color: '#10B981', opacity: 0.1, duration: 7, delay: 2 },
  { type: 'circle', x: '15%', y: '80%', size: 50, color: '#F59E0B', opacity: 0.08, duration: 9, delay: 0.5 },
  { type: 'circle', x: '50%', y: '10%', size: 25, color: '#2563EB', opacity: 0.1, duration: 6, delay: 3 },

  // Floating squares (rotated = diamond)
  { type: 'square', x: '20%', y: '35%', size: 20, color: '#7C3AED', opacity: 0.1, duration: 12, delay: 1.5 },
  { type: 'square', x: '70%', y: '50%', size: 25, color: '#2563EB', opacity: 0.08, duration: 11, delay: 0 },
  { type: 'square', x: '90%', y: '60%', size: 18, color: '#10B981', opacity: 0.1, duration: 8, delay: 2 },

  // Floating triangles
  { type: 'triangle', x: '30%', y: '65%', size: 22, color: '#F59E0B', opacity: 0.1, duration: 10, delay: 1 },
  { type: 'triangle', x: '60%', y: '25%', size: 18, color: '#EF4444', opacity: 0.08, duration: 9, delay: 3 },
  
  // Dots cluster
  { type: 'dot', x: '40%', y: '85%', size: 8, color: '#2563EB', opacity: 0.15, duration: 5, delay: 0 },
  { type: 'dot', x: '55%', y: '90%', size: 6, color: '#7C3AED', opacity: 0.15, duration: 4, delay: 1 },
  { type: 'dot', x: '25%', y: '50%', size: 7, color: '#10B981', opacity: 0.12, duration: 6, delay: 2 },

  // Plus signs
  { type: 'plus', x: '80%', y: '35%', size: 16, color: '#2563EB', opacity: 0.1, duration: 7, delay: 0.5 },
  { type: 'plus', x: '10%', y: '55%', size: 14, color: '#7C3AED', opacity: 0.08, duration: 8, delay: 2 },
];

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, 0, -8, 0],
            rotate: shape.type === 'square' ? [45, 90, 135, 90, 45] : [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {shape.type === 'circle' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                backgroundColor: shape.color,
                opacity: shape.opacity,
                boxShadow: `0 4px 20px ${shape.color}40`,
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: 4,
                backgroundColor: shape.color,
                opacity: shape.opacity,
                transform: 'rotate(45deg)',
                boxShadow: `0 4px 15px ${shape.color}30`,
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" style={{ opacity: shape.opacity }}>
              <polygon points="12,2 22,22 2,22" fill={shape.color} />
            </svg>
          )}
          {shape.type === 'dot' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                backgroundColor: shape.color,
                opacity: shape.opacity,
              }}
            />
          )}
          {shape.type === 'plus' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 24 24" style={{ opacity: shape.opacity }}>
              <rect x="10" y="2" width="4" height="20" rx="2" fill={shape.color} />
              <rect x="2" y="10" width="20" height="4" rx="2" fill={shape.color} />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Animated ring */}
      <motion.div
        className="absolute"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg width="500" height="500" viewBox="0 0 500 500" style={{ opacity: 0.03 }}>
          <circle cx="250" cy="250" r="200" stroke="#2563EB" strokeWidth="1" fill="none" strokeDasharray="10 15" />
          <circle cx="250" cy="250" r="180" stroke="#7C3AED" strokeWidth="1" fill="none" strokeDasharray="8 20" />
        </svg>
      </motion.div>

      {/* 3D-style cube wireframe */}
      <motion.div
        className="absolute"
        style={{ right: '10%', bottom: '20%', opacity: 0.06 }}
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 30, 0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          {/* Front face */}
          <rect x="15" y="15" width="40" height="40" stroke="#2563EB" strokeWidth="2" fill="none" />
          {/* Back face */}
          <rect x="25" y="5" width="40" height="40" stroke="#2563EB" strokeWidth="1.5" fill="none" />
          {/* Connecting edges */}
          <line x1="15" y1="15" x2="25" y2="5" stroke="#2563EB" strokeWidth="1" />
          <line x1="55" y1="15" x2="65" y2="5" stroke="#2563EB" strokeWidth="1" />
          <line x1="55" y1="55" x2="65" y2="45" stroke="#2563EB" strokeWidth="1" />
          <line x1="15" y1="55" x2="25" y2="45" stroke="#2563EB" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Hexagon */}
      <motion.div
        className="absolute"
        style={{ left: '5%', top: '30%', opacity: 0.05 }}
        animate={{ rotate: [0, 60, 120, 180, 240, 300, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon points="30,2 55,16 55,44 30,58 5,44 5,16" stroke="#7C3AED" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
}
