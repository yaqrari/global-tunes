import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Maximize, Minimize, RotateCcw, ZoomIn, ZoomOut, Sliders } from 'lucide-react';

interface GlobeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onToggleRotation: () => void;
  isRotating: boolean;
}

const GlobeControls = ({ 
  onZoomIn, 
  onZoomOut, 
  onReset, 
  onToggleRotation, 
  isRotating 
}: GlobeControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-28 right-6 z-10">
      <div className="flex flex-col items-end">
        <button
          className="glass-button p-3 flex items-center justify-center mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <Minimize size={18} /> : <Globe size={18} />}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col items-center space-y-2"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="glass-button p-2 flex items-center justify-center"
                onClick={onZoomIn}
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>
              
              <button
                className="glass-button p-2 flex items-center justify-center"
                onClick={onZoomOut}
                title="Zoom Out"
              >
                <ZoomOut size={18} />
              </button>
              
              <button
                className={`glass-button p-2 flex items-center justify-center ${
                  isRotating ? 'bg-primary-600/20' : ''
                }`}
                onClick={onToggleRotation}
                title={isRotating ? "Stop Rotation" : "Start Rotation"}
              >
                <RotateCcw size={18} />
              </button>
              
              <button
                className="glass-button p-2 flex items-center justify-center"
                onClick={onReset}
                title="Reset View"
              >
                <Sliders size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GlobeControls;