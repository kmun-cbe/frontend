// Image utility functions for better asset handling

// Import images as modules for better bundling
// Use public URLs for images
const logoImg = '/logo.png';
const domeImg = '/dome-2.png';
const faviconImg = '/favicon.ico';

// Export image URLs
export const images = {
  logo: logoImg,
  dome: domeImg,
  favicon: faviconImg,
};

// Helper function to get image URL with fallback
export const getImageUrl = (imageName: keyof typeof images, fallback?: string): string => {
  try {
    return images[imageName] || fallback || '';
  } catch (error) {
    console.warn(`Failed to load image: ${imageName}`, error);
    return fallback || '';
  }
};

// Helper function for dynamic image loading with error handling
export const loadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};
