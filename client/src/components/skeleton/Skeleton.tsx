import React from 'react';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'default' | 'rounded' | 'circle' | 'text';
export type SkeletonSize = 'small' | 'medium' | 'large' | 'xlarge';

interface SkeletonProps {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  width?: number | string;
  height?: number | string;
  className?: string;
  animate?: boolean;
  lines?: number; // For text variant
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'default',
  size = 'medium',
  width,
  height,
  className,
  animate = true,
  lines = 1
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[variant],
    !width && !height && styles[size],
    animate ? styles.animate : '',
    className
  ].filter(Boolean).join(' ');

  const customStyles = {
    width: width || undefined,
    height: height || undefined,
  };

  // For text variant with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.textContainer}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`${skeletonClasses} ${styles.textLine}`}
            style={{
              ...customStyles,
              width: index === lines - 1 ? '70%' : width || '100%', // Last line is shorter
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={skeletonClasses}
      style={customStyles}
    />
  );
};

export default Skeleton;