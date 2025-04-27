import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Mic, X, Music, Sparkles } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

const SearchCard = () => {
  const { songs, searchQuery, setSearchQuery, setCurrentSong } = useMusicStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [filteredSongs, setFilteredSongs] = useState(songs);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs);
    }
  }, [searchQuery, songs]);
  
  const handleSearchFocus = () => {
    setIsExpanded(true);
  };
  
  const handleSearchBlur = (e: React.FocusEvent) => {
    // Prevent closing when clicking inside the expanded area
    if (
      e.relatedTarget && 
      e.relatedTarget instanceof Node && 
      e.currentTarget.contains(e.relatedTarget)
    ) {
      return;
    }
    
    // Only collapse if clicking outside and search is empty
    if (!searchQuery) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 200);
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };
  
  const simulateVoiceRecording = () => {
    setIsRecording(true);
    // Simulate voice recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setSearchQuery(randomSong.title);
      setIsExpanded(true);
    }, 2000);
  };
  
  const handleSelectSong = (song: any) => {
    setCurrentSong(song);
    setIsExpanded(false);
  };
  
  return (
    <div 
      className="glass-card p-4 max-w-sm w-full"
      tabIndex={-1}
      onBlur={handleSearchBlur}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Music size={16} className="mr-1.5 text-primary-400" />
          <h3 className="text-white font-medium">Search Music</h3>
        </div>
        <div className="text-xs text-white/60 flex items-center">
          <Sparkles size={12} className="mr-1 text-primary-400" />
          <span>Global Popularity</span>
        </div>
      </div>
      
      <div className="relative flex items-center">
        <div className="absolute left-3 text-white/60">
          <Search size={18} />
        </div>
        
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for songs, artists..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleSearchFocus}
        />
        
        <div className="absolute right-3 flex space-x-1">
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
          
          <button
            onClick={simulateVoiceRecording}
            className={`text-white/60 hover:text-white transition-colors ${
              isRecording ? 'text-primary-500 animate-pulse' : ''
            }`}
          >
            <Mic size={18} />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-3"
          >
            <div className="max-h-64 overflow-y-auto pr-1">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <motion.div
                    key={song.id}
                    className="flex items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer mb-1 transition-colors"
                    onClick={() => handleSelectSong(song)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">{song.title}</div>
                      <div className="text-xs text-white/60">{song.artist}</div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-white/60 text-center py-4">
                  No songs found matching "{searchQuery}"
                </div>
              )}
            </div>
            
            <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/50 text-center">
              Try searching for a song title or artist name
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchCard;