import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'primary-subtle' | 'secondary' | 'secondary-subtle' | 'alternate' | 'alternate-subtle' | 'danger' | 'danger-subtle';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    isLoading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <a
      className={buttonClasses}
      {...props}
    >
      {isLoading && (
        <span className={styles.spinner} />
      )}
      {!isLoading && leftIcon && (
        <span className={styles.leftIcon}>{leftIcon}</span>
      )}
      <span className={styles.content}>{children}</span>
      {!isLoading && rightIcon && (
        <span className={styles.rightIcon}>{rightIcon}</span>
      )}
    </a>
  );
};

export default ButtonLink; 