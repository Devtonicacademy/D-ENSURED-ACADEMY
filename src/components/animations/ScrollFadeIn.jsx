import { motion } from 'framer-motion';
import React from 'react';

/**
 * ScrollFadeIn - a wrapper component that animates its children when they enter the viewport.
 * It uses framer‑motion to fade in and slide up the content with a smooth transition.
 *
 * Props:
 *   children – the content to render inside the animated container.
 *   delay?   – optional delay (in seconds) before the animation starts.
 *   duration? – optional duration (in seconds) of the animation.
 */
export default function ScrollFadeIn({ children, delay = 0, duration = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
