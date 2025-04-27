/**
 * Animation helpers for the globe visualization
 */

// Function to create a pulsating animation effect on the globe
export const createPulseAnimation = (points: any[], baseSpeed: number = 0.001) => {
  const now = Date.now();
  
  return points.map(point => {
    // Create a unique phase for each point based on its coordinates
    // This creates a wave-like effect rather than all points pulsing together
    const uniquePhase = (point.lat * 0.1 + point.lng * 0.1) % (2 * Math.PI);
    const pulseValue = Math.sin((now * baseSpeed) + uniquePhase);
    
    // Adjust the popularity value with the pulse
    const adjustedPopularity = point.popularity * (0.85 + pulseValue * 0.15);
    
    return {
      ...point,
      popularity: adjustedPopularity,
    };
  });
};

// Function to create flowing animation between regions
export const createFlowAnimation = (points: any[], currentTime: number) => {
  // Create animation that flows between points
  const animatedPoints = [...points];
  
  // Add flow lines between major regions
  if (points.length > 1) {
    // Sort points by popularity to connect important regions
    const sortedPoints = [...points]
      .filter(p => p.region) // Only consider actual regions, not fillers
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5); // Take top 5 regions
    
    // Connect them with animated flows
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const start = sortedPoints[i];
      const end = sortedPoints[i + 1];
      
      // Create flow effect
      const flowSpeed = 0.0005;
      const flowProgress = (Math.sin(currentTime * flowSpeed) + 1) / 2; // 0 to 1
      
      // Create points along the path
      const numFlowPoints = 10;
      for (let j = 0; j < numFlowPoints; j++) {
        const progress = (j / numFlowPoints) + (flowProgress * 0.5);
        if (progress > 1) continue;
        
        // Simple linear interpolation between points
        const lat = start.lat + (end.lat - start.lat) * progress;
        const lng = start.lng + (end.lng - start.lng) * progress;
        
        // Add flow point
        animatedPoints.push({
          lat,
          lng,
          popularity: 30 + (Math.sin(progress * Math.PI) * 20), // Peak in the middle
          color: start.color,
          // No region info for these points
        });
      }
    }
  }
  
  return animatedPoints;
};