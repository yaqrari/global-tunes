import React from 'react';
import { motion } from 'framer-motion';

interface HeatmapLegendProps {
  visible: boolean;
}

const HeatmapLegend = ({ visible }: HeatmapLegendProps) => {
  if (!visible) return null;
  
  return (
    <motion.div 
      className="absolute bottom-20 right-6 glass-card p-3 z-10 text-xs"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="font-medium mb-2">Song Popularity</div>
      <div className="flex items-center space-x-1">
        <div className="w-full h-2 rounded bg-gradient-to-r from-rose-300/50 via-rose-500/70 to-rose-700/90"></div>
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-white/70">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </motion.div>
  );
};

export default HeatmapLegend;