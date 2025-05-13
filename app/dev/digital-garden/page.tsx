'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Flower {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const colors = ['#FF69B4', '#FFD700', '#98FB98', '#87CEEB', '#DDA0DD'];
const sounds = [
  '/sounds/pop1.mp3',
  '/sounds/pop2.mp3',
  '/sounds/pop3.mp3',
];

export default function DigitalGarden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [audio] = useState(new Audio());

  const plantFlower = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newFlower: Flower = {
      id: Date.now(),
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 30 + 20,
    };

    setFlowers(prev => [...prev, newFlower]);
    
    // Play random pop sound
    audio.src = sounds[Math.floor(Math.random() * sounds.length)];
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-green-800">Digital Garden</h1>
        <p className="text-lg mb-8 text-green-700">
          Click anywhere to plant a flower. Watch your garden grow!
        </p>
        
        <div 
          className="relative w-full h-[600px] bg-white/30 backdrop-blur-sm rounded-xl border-2 border-green-300 cursor-pointer overflow-hidden"
          onClick={plantFlower}
        >
          <AnimatePresence>
            {flowers.map((flower) => (
              <motion.div
                key={flower.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{
                  position: 'absolute',
                  left: flower.x,
                  top: flower.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: flower.size,
                    height: flower.size,
                  }}
                >
                  {/* Petals */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${i * 72}deg)`,
                        transformOrigin: 'bottom center',
                      }}
                    >
                      <div
                        className="rounded-full"
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: flower.color,
                          transform: 'scale(0.5)',
                        }}
                      />
                    </motion.div>
                  ))}
                  {/* Center */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300"
                    style={{
                      width: flower.size * 0.3,
                      height: flower.size * 0.3,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-green-700">
            Flowers planted: {flowers.length}
          </p>
        </div>
      </div>
    </div>
  );
} 