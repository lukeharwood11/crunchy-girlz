import React from 'react';
import Skeleton from './Skeleton';
import type { SkeletonSize } from './Skeleton';

export interface SkeletonTextProps {
  lines?: number;
  size?: SkeletonSize;
  width?: number | string;
  animate?: boolean;
  className?: string;
  lastLineWidth?: number | string; // Custom width for last line
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 1,
  size = 'medium',
  width = '100%',
  animate = true,
  className,
  lastLineWidth = '70%'
}) => {
  if (lines === 1) {
    return (
      <Skeleton
        variant="text"
        size={size}
        width={width}
        animate={animate}
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          variant="text"
          size={size}
          width={index === lines - 1 ? lastLineWidth : width}
          animate={animate}
        />
      ))}
    </div>
  );
};

export default SkeletonText;