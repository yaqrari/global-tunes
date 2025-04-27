import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MusicControls = () => {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    volume,
    togglePlay,
    setCurrentTime,
    setVolume,
    nextSong,
    prevSong
  } = useMusicStore();
  
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update time manually since we don't have real audio
  useEffect(() => {
    if (isPlaying && currentSong) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            nextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentSong, setCurrentTime, nextSong]);
  
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSong || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    setCurrentTime(percent * currentSong.duration);
  }, [currentSong, setCurrentTime]);
  
  const handleVolumeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    setVolume(percent);
    if (percent > 0 && isMuted) setIsMuted(false);
  }, [setVolume, isMuted]);
  
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, setVolume, prevVolume]);
  
  // Generate audio visualization bars for the player
  const audioVisualizationBars = useMemo(() => {
    const bars = [];
    const numBars = 28;
    
    for (let i = 0; i < numBars; i++) {
      // Calculate height based on a sine wave that changes with time and bar position
      const height = isPlaying ? 
        Math.abs(Math.sin((Date.now() * 0.003) + (i * 0.3))) * 0.7 + 0.3 : 
        0.15;
      
      bars.push(
        <div 
          key={`viz-bar-${i}`}
          className="audio-bar w-[2px] bg-primary-500/70 rounded-full transition-transform duration-100"
          style={{ 
            height: `${Math.max(3, height * 24)}px`,
            '--bar-index': i,
            transform: `scaleY(${isPlaying ? height : 0.15})`
          } as React.CSSProperties}
        />
      );
    }
    
    return bars;
  }, [isPlaying]);
  
  if (!currentSong) {
    return (
      <div className="glass-card p-6 mx-4 flex flex-col items-center">
        <div className="flex items-center mb-3">
          <Music size={18} className="mr-2 text-primary-400" />
          <h3 className="text-white font-medium">Song Popularity Globe</h3>
        </div>
        <p className="text-white/70 text-center text-sm mb-3">
          Search and select a song to visualize its global popularity
        </p>
        <div className="flex items-center justify-center">
          <Sparkles size={14} className="text-primary-400 mr-1" />
          <span className="text-xs text-white/50">
            Data from Spotify API (mock data currently)
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="glass-card p-6 mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Song info and progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md overflow-hidden mr-4 shadow-glow">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-medium text-lg">{currentSong.title}</h3>
            <p className="text-white/60 text-sm">{currentSong.artist}</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex h-6 space-x-[2px] items-end">
            {audioVisualizationBars}
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div 
          ref={progressRef}
          className="h-2 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${(currentTime / currentSong.duration) * 100}%`,
            }}
            transition={{ type: 'tween' }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-white/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>
      
      {/* Player controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            className="glass-button h-8 px-2 flex items-center justify-center space-x-1"
            onClick={toggleMute}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={16} className="text-white/80" />
            ) : (
              <Volume2 size={16} className="text-white/80" />
            )}
            <div 
              ref={volumeRef}
              className="w-16 h-1.5 bg-white/10 rounded-full cursor-pointer hidden sm:block"
              onClick={handleVolumeClick}
            >
              <div 
                className="h-full bg-primary-500/40 rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="glass-button h-9 w-9 flex items-center justify-center"
            onClick={prevSong}
          >
            <SkipBack size={18} className="text-white/80" />
          </button>
          
          <button 
            className="glass-button h-12 w-12 flex items-center justify-center bg-primary-600/30 hover:bg-primary-600/40"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white ml-0.5" />
            )}
          </button>
          
          <button 
            className="glass-button h-9 w-9 flex items-center justify-center"
            onClick={nextSong}
          >
            <SkipForward size={18} className="text-white/80" />
          </button>
        </div>
        
        <div className="w-[76px] sm:w-[100px] flex justify-end">
          <div className="flex md:hidden items-center space-x-2">
            <div className="flex h-6 space-x-[2px] items-end">
              {audioVisualizationBars.slice(0, 10)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicControls;