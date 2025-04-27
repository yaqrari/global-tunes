import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarryBackground from './components/StarryBackground';
import BackgroundGradient from './components/BackgroundGradient';
import GlobeVisualization from './components/GlobeVisualization';
import MusicControls from './components/MusicControls';
import SearchCard from './components/SearchCard';
import TimeRangeSelector from './components/TimeRangeSelector';
import InfoPanel from './components/InfoPanel';
import HeatmapLegend from './components/HeatmapLegend';
import SongList from './components/SongList';
import AppHeader from './components/AppHeader';
import { useMusicStore } from './store/musicStore';

function App() {
  const { isPlaying, currentSong } = useMusicStore();
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Elements */}
      <BackgroundGradient />
      <StarryBackground />
      
      {/* Application Header */}
      <AppHeader />
      
      {/* Globe Visualization */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <GlobeVisualization playing={isPlaying} />
      </motion.div>

      {/* Top overlay gradient for better UI contrast */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background-dark to-transparent z-1"></div>

      {/* Song Library */}
      <SongList />

      {/* Search Card */}
      <motion.div 
        className="absolute top-20 left-6 z-10 max-w-sm w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <SearchCard />
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        className="absolute top-20 right-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <TimeRangeSelector />
      </motion.div>

      {/* Tutorial Overlay - shown once on load */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowTutorial(false)}
          >
            <motion.div 
              className="glass-card p-8 max-w-md mx-auto text-center"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-medium text-white mb-4">Welcome to Music Globe</h2>
              <p className="text-white/80 mb-6">
                Discover how your favorite music is trending around the world with our 
                interactive globe visualization.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 rounded-lg">
                  <h3 className="text-white font-medium mb-1">Search Songs</h3>
                  <p className="text-white/60 text-sm">
                    Find your favorite songs and see their global popularity.
                  </p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <h3 className="text-white font-medium mb-1">Explore Data</h3>
                  <p className="text-white/60 text-sm">
                    Interact with the globe to see detailed regional stats.
                  </p>
                </div>
              </div>
              
              <button 
                className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full transition-colors"
                onClick={() => setShowTutorial(false)}
              >
                Let's Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Panel when song is selected */}
      <AnimatePresence>
        {currentSong && (
          <motion.div
            className="absolute bottom-28 left-6 z-10 max-w-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <InfoPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heatmap Legend when song is selected */}
      <AnimatePresence>
        <HeatmapLegend visible={!!currentSong} />
      </AnimatePresence>

      {/* Music Controls */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 mx-auto z-10 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <MusicControls />
      </motion.div>
    </div>
  );
}

export default App;