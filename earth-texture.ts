/**
 * Helper to handle earth texture customization
 */

export const customizeEarthTexture = (globeInstance: any) => {
  // Adjust the material of the globe
  const globeMaterial = globeInstance.globeMaterial();
  
  if (globeMaterial) {
    // Increase emissive for a slight glow effect
    globeMaterial.emissive.set('#381c2c');
    globeMaterial.emissiveIntensity = 0.05;
    
    // Add slight metalness/roughness for more realistic appearance
    globeMaterial.metalness = 0.2;
    globeMaterial.roughness = 0.8;
    
    // Enhance the bump effect
    if (globeMaterial.bumpScale !== undefined) {
      globeMaterial.bumpScale = 0.015;
    }
  }
  
  return globeInstance;
};

export const applyPinkishColorFilter = (globeInstance: any) => {
  // Access the globe's material
  const globeMaterial = globeInstance.globeMaterial();
  
  if (globeMaterial && globeMaterial.map) {
    // You can apply filters or post-processing here
    // For simplicity, we'll just adjust the color balance
    
    // Slightly shift hue towards pink
    if (globeMaterial.color) {
      globeMaterial.color.set('#ff9daf');
      // Reduce opacity to let some of the texture through
      globeMaterial.opacity = 0.95; 
      globeMaterial.transparent = true;
    }
  }
  
  return globeInstance;
};