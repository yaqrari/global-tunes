import React, { useRef, useEffect, useState, useCallback } from 'react';
import Globe from 'globe.gl';
import { useMusicStore } from '../store/musicStore';
import { customizeEarthTexture, applyPinkishColorFilter } from '../assets/earth-texture';
import { createPulseAnimation, createFlowAnimation } from '../assets/animations';
import GlobeControls from './GlobeControls';

const GlobeVisualization = ({ playing }: { playing: boolean }) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globe = useRef<any>(null);
  const { currentSong } = useMusicStore();
  const animationRef = useRef<number | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!globeRef.current) return;

    // Initialize globe
    globe.current = Globe()
      // Use local image files from public folder
      .globeImageUrl('/earth-blue-marble.jpg')
      .bumpImageUrl('/earth-bump.jpg')
      // Change to a dark background to match the reference
      .backgroundColor('rgba(5,9,22,0.9)')
      .width(window.innerWidth)
      .height(window.innerHeight)
      // Adjust atmosphere to pinkish color
      .atmosphereColor('rgba(255,170,170,0.7)')
      .atmosphereAltitude(0.25)
      .showAtmosphere(true)
      // Adjust hexbin colors to pink/red palette to match reference
      .hexBinPointWeight('popularity')
      .hexBinResolution(4)
      .hexTopColor(d => `rgba(248, 113, 113, ${Math.sqrt(d.sumWeight) * 0.01})`)
      .hexSideColor(d => `rgba(244, 63, 94, ${Math.sqrt(d.sumWeight) * 0.01})`)
      .hexAltitude(d => Math.sqrt(d.sumWeight) * 0.15)
      .hexTransitionDuration(800);

    // Apply glow effect to container
    if (globeRef.current) {
      globeRef.current.classList.add('earth-glow');
    }

    // Mount the globe
    globe.current(globeRef.current);

    // Apply custom styling
    customizeEarthTexture(globe.current);
    applyPinkishColorFilter(globe.current);

    // Handle window resize
    const handleResize = () => {
      if (globeRef.current && globe.current) {
        globe.current
          .width(window.innerWidth)
          .height(window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Set initial rotation and controls
    globe.current.controls().autoRotate = isRotating;
    globe.current.controls().autoRotateSpeed = 0.35;
    globe.current.controls().enableZoom = true;
    globe.current.pointOfView({ lat: 25, lng: 0, altitude: 2.0 });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (globe.current) {
        globe.current._destructor();
      }
    };
  }, []);

  // Update heatmap when song changes or playing state changes
  useEffect(() => {
    if (!globe.current) return;
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (!currentSong) {
      // If no song is selected, clear the heatmap
      globe.current.hexBinPointsData([]);
      return;
    }

    // Extract popularity data from the selected song
    const points = currentSong.popularity.map(region => ({
      lat: region.coordinates[0],
      lng: region.coordinates[1],
      popularity: region.popularity,
      color: region.color || '#f43f5e', // Rose/pink color for default
      region: region.region,
      listeners: region.listeners,
      trend: region.trend
    }));

    // Create additional points around each region for smoother heatmap
    const expandedPoints = points.flatMap(point => {
      const additionalPoints = [];
      const radius = 5; // Degrees
      const numPoints = 12; // Increase number of points for smoother appearance
      
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const lat = point.lat + Math.cos(angle) * radius * (Math.random() * 0.5 + 0.5);
        const lng = point.lng + Math.sin(angle) * radius * (Math.random() * 0.5 + 0.5);
        additionalPoints.push({
          lat,
          lng,
          popularity: point.popularity * (Math.random() * 0.3 + 0.2),
          color: point.color,
          region: null, // These are just filler points, not actual regions
          listeners: null,
          trend: null
        });
      }
      
      return [point, ...additionalPoints];
    });

    // Set higher hex resolution for smoother appearance
    globe.current.hexBinResolution(4);
    globe.current.hexBinPointsData(expandedPoints);
    
    // Enhanced colors for the hexbins to match the reference theme
    globe.current
      .hexTopColor(d => {
        const intensity = Math.sqrt(d.sumWeight) * 0.01;
        return `rgba(244, 63, 94, ${intensity})`; // Rose color
      })
      .hexSideColor(d => {
        const intensity = Math.sqrt(d.sumWeight) * 0.01;
        return `rgba(225, 29, 72, ${intensity})`; // Darker rose color for sides
      })
      .hexAltitude(d => Math.sqrt(d.sumWeight) * 0.2); // Increase height for more dramatic effect
    
    // Add tooltip for regions
    globe.current
      .hexLabel(d => {
        const mainPoint = d.points.find(p => p.region);
        if (mainPoint) {
          return `
            <div class="globe-label">
              <strong>${mainPoint.region}</strong><br />
              Popularity: ${mainPoint.popularity}%<br />
              Listeners: ${mainPoint.listeners.toLocaleString()}<br />
              Trend: ${mainPoint.trend}
            </div>
          `;
        }
        return '';
      });

    // Animate if playing
    if (playing) {
      const animate = () => {
        const now = Date.now();
        
        // Create pulsating animation and flow animation
        const pulsedPoints = createPulseAnimation(expandedPoints, 0.001);
        const animatedPoints = createFlowAnimation(pulsedPoints, now);

        globe.current.hexBinPointsData(animatedPoints);
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [currentSong, playing]);

  // Update rotation when isRotating changes
  useEffect(() => {
    if (globe.current && globe.current.controls()) {
      globe.current.controls().autoRotate = isRotating;
    }
  }, [isRotating]);

  // Globe control handlers
  const handleZoomIn = useCallback(() => {
    if (globe.current) {
      const currentAltitude = globe.current.controls().getPolarAngle();
      globe.current.controls().setPolarAngle(Math.max(currentAltitude - 0.3, 0.5));
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (globe.current) {
      const currentAltitude = globe.current.controls().getPolarAngle();
      globe.current.controls().setPolarAngle(Math.min(currentAltitude + 0.3, Math.PI - 0.5));
    }
  }, []);

  const handleReset = useCallback(() => {
    if (globe.current) {
      globe.current.pointOfView({ lat: 25, lng: 0, altitude: 2.0 });
    }
  }, []);

  const handleToggleRotation = useCallback(() => {
    setIsRotating(!isRotating);
  }, [isRotating]);

  return (
    <>
      <div ref={globeRef} className="h-full w-full" />
      <GlobeControls 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onToggleRotation={handleToggleRotation}
        isRotating={isRotating}
      />
    </>
  );
};

export default GlobeVisualization;