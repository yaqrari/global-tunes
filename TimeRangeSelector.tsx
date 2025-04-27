import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

const TimeRangeSelector = () => {
  const { timeRanges, selectedTimeRange, setSelectedTimeRange } = useMusicStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (range: any) => {
    setSelectedTimeRange(range);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        className="glass-card px-4 py-2 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar size={16} className="text-primary-400 mr-2" />
        <span className="text-sm text-white mr-1">{selectedTimeRange.label}</span>
        <ChevronDown 
          size={16} 
          className={`text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1 glass-card py-1 z-20"
          >
            {timeRanges.map((range) => (
              <div
                key={range.id}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                  selectedTimeRange.id === range.id
                    ? 'bg-primary-600/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
                onClick={() => handleSelect(range)}
              >
                {range.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeRangeSelector;