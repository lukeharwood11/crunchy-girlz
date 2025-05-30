import React, { useState, useEffect } from 'react';
import styles from './Image.module.css';
import { Icon, Logo } from '../icons';

export type ImageSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ImageVariant = 'default' | 'rounded' | 'circle';

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  src: string;
  alt: string;
  size?: ImageSize;
  variant?: ImageVariant;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  width?: number | string;
  height?: number | string;
}

// Image cache utilities
const CACHE_PREFIX = 'img_cache_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

const getCachedImage = (url: string): string | null => {
  try {
    const cached = localStorage.getItem(CACHE_PREFIX + btoa(url));
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      } else {
        localStorage.removeItem(CACHE_PREFIX + btoa(url));
      }
    }
  } catch (error) {
    console.warn('Error reading from image cache:', error);
  }
  return null;
};

const setCachedImage = (url: string, dataUrl: string): void => {
  try {
    const cacheData = {
      data: dataUrl,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_PREFIX + btoa(url), JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Error saving to image cache:', error);
  }
};

const fetchAndCacheImage = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCachedImage(url, dataUrl);
      resolve(dataUrl);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  size = 'medium',
  variant = 'default',
  fallbackSrc,
  loading = 'lazy',
  objectFit = 'cover',
  width,
  height,
  className,
  onError,
  onLoad,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  // Handle image loading with caching
  useEffect(() => {
    if (!src) {
      setCurrentSrc('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setShowLogo(false);

    // Check cache first
    const cachedImage = getCachedImage(src);
    if (cachedImage) {
      setCurrentSrc(cachedImage);
      setIsLoading(false);
      return;
    }

    // If not cached, fetch and cache
    fetchAndCacheImage(src)
      .then((dataUrl) => {
        setCurrentSrc(dataUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn('Failed to load image:', error);
        if (fallbackSrc) {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        } else {
          setShowLogo(true);
        }
        setIsLoading(false);
      });
  }, [src, fallbackSrc]);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setShowLogo(true);
    }
    onError?.(event);
  };

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const imageClasses = [
    styles.image,
    !width && !height && styles[size], // Only apply size classes if custom width/height not set
    styles[variant],
    styles[objectFit],
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    !width && !height && styles[size], // Apply size to container if no custom dimensions
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const customStyles = {
    width: width || undefined,
    height: height || undefined,
  };

  // Show logo fallback if there's an error and no fallback src
  if (showLogo) {
    return (
      <div 
        className={containerClasses}
        style={customStyles}
      >
        <div className={styles.logoFallback}>
          <Icon size={40}/>
        </div>
      </div>
    );
  }

  // Show skeleton while loading or if no src
  if (isLoading || !currentSrc) {
    return (
      <div 
        className={containerClasses}
        style={customStyles}
      >
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div 
      className={containerClasses}
      style={customStyles}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={imageClasses}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default Image;