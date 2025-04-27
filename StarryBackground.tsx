import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{x: number; y: number; size: number; speed: number; opacity: number}[]>([]);
  const meteorsRef = useRef<{x: number; y: number; length: number; speed: number; opacity: number; life: number; maxLife: number}[]>([]);
  
  // Initialize stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Generate stars
      const numStars = Math.floor((canvas.width * canvas.height) / 2000);
      starsRef.current = [];
      
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05,
          opacity: Math.random() * 0.5 + 0.5
        });
      }
    };
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with pinkish hue to match the theme
      starsRef.current.forEach(star => {
        // Use a pinkish white color
        const pinkishWhite = `rgba(255, 245, 250, ${star.opacity * (0.5 + 0.5 * Math.sin(Date.now() * star.speed * 0.01))})`;
        ctx.fillStyle = pinkishWhite;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars slightly for parallax effect
        star.x = (star.x + star.speed) % canvas.width;
      });
      
      // Create meteors randomly with slightly lower frequency
      if (Math.random() < 0.005 && meteorsRef.current.length < 3) {
        const meteor = {
          x: Math.random() * canvas.width,
          y: -20,
          length: Math.random() * 80 + 20,
          speed: Math.random() * 5 + 3,
          opacity: Math.random() * 0.3 + 0.7,
          life: 0,
          maxLife: Math.random() * 100 + 50
        };
        meteorsRef.current.push(meteor);
      }
      
      // Draw and update meteors with reddish/pinkish tint
      ctx.lineWidth = 2;
      meteorsRef.current.forEach((meteor, i) => {
        // Use a pinkish gradient for meteors
        ctx.strokeStyle = `rgba(255, 180, 200, ${meteor.opacity * (1 - meteor.life / meteor.maxLife)})`;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length, meteor.y - meteor.length);
        ctx.stroke();
        
        // Update meteor position
        meteor.x += meteor.speed;
        meteor.y += meteor.speed;
        meteor.life++;
        
        // Remove meteors that are out of bounds or expired
        if (meteor.x > canvas.width + meteor.length || 
            meteor.y > canvas.height + meteor.length || 
            meteor.life > meteor.maxLife) {
          meteorsRef.current.splice(i, 1);
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <motion.div 
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 bg-gradient-radial from-background-dark/50 to-background"
      />
      {/* Add a subtle pink gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background-dark/30 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,63,94,0.03),transparent_70%)]" />
    </motion.div>
  );
};

export default StarryBackground;