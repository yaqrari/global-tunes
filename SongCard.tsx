import React from 'react';
import { motion } from 'framer-motion';
import { Play, Music, Clock } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

interface SongCardProps {
  song: any;
  index: number;
}

const SongCard = ({ song, index }: SongCardProps) => {
  const { setCurrentSong, currentSong } = useMusicStore();
  const isActive = currentSong?.id === song.id;

  // Format song duration in MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    setCurrentSong(song);
  };

  return (
    <motion.div
      className={`glass-card p-2 flex items-center cursor-pointer mb-2 overflow-hidden ${
        isActive ? 'border-primary-500 border' : 'border-transparent border'
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      onClick={handlePlay}
    >
      <div className="relative mr-3">
        <img
          src={song.cover}
          alt={song.title}
          className="w-12 h-12 rounded object-cover"
        />
        {isActive && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
            <div className="w-2 h-2 bg-primary-500 rounded-full mx-0.5 audio-bar" style={{ '--bar-index': 0 } as React.CSSProperties}></div>
            <div className="w-2 h-4 bg-primary-500 rounded-full mx-0.5 audio-bar" style={{ '--bar-index': 1 } as React.CSSProperties}></div>
            <div className="w-2 h-3 bg-primary-500 rounded-full mx-0.5 audio-bar" style={{ '--bar-index': 2 } as React.CSSProperties}></div>
          </div>
        )}
        {!isActive && (
          <motion.div
            className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center rounded"
            transition={{ duration: 0.2 }}
          >
            <Play size={20} className="text-white" fill="white" />
          </motion.div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">{song.title}</div>
        <div className="text-xs text-white/60 truncate">{song.artist}</div>
      </div>

      <div className="flex items-center text-xs text-white/60 ml-2">
        <Clock size={12} className="mr-1" />
        {formatDuration(song.duration)}
      </div>
    </motion.div>
  );
};

export default SongCard;