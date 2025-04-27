import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, Filter, Search, X } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import SongCard from './SongCard';

const SongList = () => {
  const { songs, searchQuery, setSearchQuery } = useMusicStore();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [sortBy, setSortBy] = useState<'popularity' | 'title' | 'artist'>('popularity');

  // When searchQuery or sortBy changes, update filteredSongs
  useEffect(() => {
    let filtered = [...songs];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered = filtered.sort((a, b) => {
          // Calculate average popularity for each song
          const avgPopA = a.popularity.reduce((sum: number, region: any) => sum + region.popularity, 0) / a.popularity.length;
          const avgPopB = b.popularity.reduce((sum: number, region: any) => sum + region.popularity, 0) / b.popularity.length;
          return avgPopB - avgPopA;
        });
        break;
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist':
        filtered = filtered.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
    }
    
    setFilteredSongs(filtered);
  }, [songs, searchQuery, sortBy]);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="glass-button p-3 fixed top-6 right-6 z-20 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={20} /> : <Library size={20} />}
      </motion.button>

      {/* Song list panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed top-0 right-0 h-full w-72 glass-card p-4 z-10 flex flex-col"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="mb-4 flex flex-col">
              <h2 className="text-lg font-medium text-white mb-4 mt-6 flex items-center">
                <Library size={18} className="mr-2" />
                Song Library
              </h2>

              {/* Search input */}
              <div className="relative flex items-center mb-4">
                <div className="absolute left-3 text-white/60">
                  <Search size={15} />
                </div>
                
                <input
                  type="text"
                  placeholder="Search songs..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-9 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {searchQuery && (
                  <button
                    className="absolute right-3 text-white/60 hover:text-white"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sort options */}
              <div className="flex items-center mb-4 text-xs">
                <Filter size={12} className="mr-1 text-white/60" />
                <span className="text-white/60 mr-2">Sort by:</span>
                <div className="flex space-x-2">
                  {['popularity', 'title', 'artist'].map(option => (
                    <button
                      key={option}
                      className={`px-2 py-1 rounded-full ${sortBy === option ? 'bg-primary-500/20 text-primary-300' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                      onClick={() => setSortBy(option as any)}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Song list */}
            <div className="overflow-y-auto flex-1 -mx-2 px-2">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song, index) => (
                  <SongCard key={song.id} song={song} index={index} />
                ))
              ) : (
                <div className="text-white/60 text-center py-8">
                  No songs found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 mt-2 text-xs text-white/40 text-center">
              {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''} in library
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SongList;