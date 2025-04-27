import React from 'react';
import { motion } from 'framer-motion';
import { Music, Globe, HeartPulse } from 'lucide-react';

const AppHeader = () => {
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-30 glass p-3 flex items-center justify-between"
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center">
        <div className="hidden md:flex items-center mr-6">
          <Globe size={18} className="text-primary-400 mr-2" />
          <span className="font-medium text-white">Music Globe</span>
        </div>
        
        <div className="text-xs text-white/70 hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-white transition-colors flex items-center">
            <Music size={14} className="mr-1" />
            <span>Discover</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center">
            <HeartPulse size={14} className="mr-1" />
            <span>Trending</span>
          </a>
        </div>
      </div>
      
      <div className="text-xs text-white/70 flex items-center">
        <span className="mr-2 hidden sm:inline">Powered by</span> 
        <span className="font-medium text-white flex items-center">
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="Spotify" 
            className="h-5 mr-1" 
          />
          API
        </span>
      </div>
    </motion.div>
  );
};

export default AppHeader;