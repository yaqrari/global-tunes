import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Users, Globe, BarChart2, Music, MapPin } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';

// Format large numbers with K, M, etc.
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const InfoPanel = () => {
  const { currentSong, selectedTimeRange } = useMusicStore();
  
  const trendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} className="text-green-400" />;
      case 'down':
        return <TrendingDown size={14} className="text-red-400" />;
      case 'stable':
        return <Minus size={14} className="text-yellow-400" />;
    }
  };
  
  const totalListeners = useMemo(() => {
    if (!currentSong) return 0;
    return currentSong.popularity.reduce((sum, region) => sum + region.listeners, 0);
  }, [currentSong]);
  
  const topRegions = useMemo(() => {
    if (!currentSong) return [];
    return [...currentSong.popularity]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
  }, [currentSong]);
  
  const averagePopularity = useMemo(() => {
    if (!currentSong) return 0;
    const sum = currentSong.popularity.reduce((sum, region) => sum + region.popularity, 0);
    return Math.round(sum / currentSong.popularity.length);
  }, [currentSong]);
  
  const popularityTrend = useMemo(() => {
    if (!currentSong) return 'stable';
    const upCount = currentSong.popularity.filter(r => r.trend === 'up').length;
    const downCount = currentSong.popularity.filter(r => r.trend === 'down').length;
    
    if (upCount > currentSong.popularity.length * 0.6) return 'up';
    if (downCount > currentSong.popularity.length * 0.4) return 'down';
    return 'stable';
  }, [currentSong]);

  // Calculate global popularity stats
  const popularityStats = useMemo(() => {
    if (!currentSong) return { high: 0, medium: 0, low: 0 };
    
    const high = currentSong.popularity.filter(r => r.popularity >= 75).length;
    const medium = currentSong.popularity.filter(r => r.popularity >= 50 && r.popularity < 75).length;
    const low = currentSong.popularity.filter(r => r.popularity < 50).length;
    
    const total = currentSong.popularity.length;
    
    return {
      high: Math.round((high / total) * 100),
      medium: Math.round((medium / total) * 100),
      low: Math.round((low / total) * 100)
    };
  }, [currentSong]);
  
  if (!currentSong) return null;
  
  return (
    <motion.div 
      className="glass-card p-4 w-full max-w-xs"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium flex items-center">
          <Music size={16} className="mr-1.5" />
          Global Insights
        </h3>
        <div className="text-xs text-white/60 flex items-center">
          <span className="mr-1">{selectedTimeRange.label}</span>
          <BarChart2 size={14} />
        </div>
      </div>
      
      {/* Song Info */}
      <div className="mb-3 pb-3 border-b border-white/10">
        <div className="text-sm font-medium text-white">{currentSong.title}</div>
        <div className="text-xs text-white/70">{currentSong.artist}</div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="flex items-center mb-1">
            <Users size={14} className="text-white/70 mr-1" />
            <span className="text-xs text-white/70">Total Listeners</span>
          </div>
          <div className="text-lg font-semibold text-white">
            {formatNumber(totalListeners)}
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-2">
          <div className="flex items-center mb-1">
            <Globe size={14} className="text-white/70 mr-1" />
            <span className="text-xs text-white/70">Avg. Popularity</span>
          </div>
          <div className="text-lg font-semibold text-white flex items-center">
            {averagePopularity}%
            <span className="ml-1 flex items-center">
              {trendIcon(popularityTrend)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Popularity Distribution */}
      <div className="bg-white/5 rounded-lg p-2 mb-3">
        <div className="text-xs text-white/70 mb-2">Global Popularity</div>
        <div className="w-full h-2 rounded-full flex overflow-hidden">
          <div 
            className="bg-primary-600" 
            style={{ width: `${popularityStats.high}%` }}
          ></div>
          <div 
            className="bg-primary-400" 
            style={{ width: `${popularityStats.medium}%` }}
          ></div>
          <div 
            className="bg-primary-300" 
            style={{ width: `${popularityStats.low}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-white/70">
          <span>High: {popularityStats.high}%</span>
          <span>Medium: {popularityStats.medium}%</span>
          <span>Low: {popularityStats.low}%</span>
        </div>
      </div>
      
      {/* Top Regions */}
      <div>
        <div className="text-xs text-white/70 mb-2 flex items-center">
          <MapPin size={12} className="mr-1" />
          Top Regions
        </div>
        {topRegions.map((region, index) => (
          <div 
            key={region.region} 
            className="flex items-center justify-between mb-1.5"
          >
            <div className="flex items-center">
              <div 
                className="w-1.5 h-6 rounded-full mr-2" 
                style={{ 
                  backgroundColor: region.color || '#f43f5e',
                  opacity: 0.8 + ((5 - index) * 0.05)
                }}
              />
              <span className="text-sm text-white">{region.region}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">{region.popularity}%</span>
              {trendIcon(region.trend)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Time Period Note */}
      <div className="mt-3 pt-2 border-t border-white/10 text-xs text-white/50 text-center">
        Data shown for {selectedTimeRange.label.toLowerCase()}
      </div>
    </motion.div>
  );
};

export default InfoPanel;