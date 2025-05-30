import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'subtle';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onClick?: () => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  onClick,
  className,
  header,
  footer,
  hoverable = false
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    onClick || hoverable ? styles.interactive : '',
    className
  ].filter(Boolean).join(' ');

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {header && (
        <div className={styles.header}>
          {header}
        </div>
      )}
      
      <div className={styles.content}>
        {children}
      </div>
      
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </CardComponent>
  );
};

export default Card;