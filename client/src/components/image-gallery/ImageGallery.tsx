import React, { useState } from 'react';
import Image from '../image/Image';
import styles from './ImageGallery.module.css';

export type GalleryVariant = 'grid' | 'masonry' | 'carousel' | 'stack';
export type GallerySize = 'small' | 'medium' | 'large';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  variant?: GalleryVariant;
  size?: GallerySize;
  columns?: number;
  spacing?: 'none' | 'small' | 'medium' | 'large';
  showCaptions?: boolean;
  onImageClick?: (image: GalleryImage, index: number) => void;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  variant = 'grid',
  size = 'medium',
  columns = 3,
  spacing = 'medium',
  showCaptions = false,
  onImageClick,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setCurrentIndex(index);
    onImageClick?.(image, index);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const galleryClasses = [
    styles.gallery,
    styles[variant],
    styles[size],
    styles[`spacing-${spacing}`],
    styles[`columns-${columns}`],
    className
  ].filter(Boolean).join(' ');

  if (variant === 'carousel') {
    return (
      <div className={galleryClasses}>
        <div className={styles.carouselContainer}>
          <button 
            className={styles.carouselButton} 
            onClick={handlePrev}
            disabled={images.length <= 1}
          >
            ←
          </button>
          
          <div className={styles.carouselImageContainer}>
            {images[currentIndex] && (
              <>
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  size={size === 'small' ? 'medium' : size === 'medium' ? 'large' : 'xlarge'}
                  className={styles.carouselImage}
                />
                {showCaptions && images[currentIndex].caption && (
                  <p className={styles.caption}>{images[currentIndex].caption}</p>
                )}
              </>
            )}
          </div>

          <button 
            className={styles.carouselButton} 
            onClick={handleNext}
            disabled={images.length <= 1}
          >
            →
          </button>
        </div>

        <div className={styles.carouselDots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'stack') {
    return (
      <div className={galleryClasses}>
        <div className={styles.stackContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.stackItem} ${index === currentIndex ? styles.activeStack : ''}`}
              style={{ zIndex: images.length - index }}
              onClick={() => handleImageClick(image, index)}
            >
              <Image
                src={image.thumbnail || image.src}
                alt={image.alt}
                size={size}
                className={styles.stackImage}
              />
              {showCaptions && image.caption && index === currentIndex && (
                <p className={styles.caption}>{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={galleryClasses}>
      {images.map((image, index) => (
        <div
          key={index}
          className={styles.galleryItem}
          onClick={() => handleImageClick(image, index)}
        >
          <Image
            src={image.thumbnail || image.src}
            alt={image.alt}
            size={size}
            className={styles.galleryImage}
          />
          {showCaptions && image.caption && (
            <p className={styles.caption}>{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;