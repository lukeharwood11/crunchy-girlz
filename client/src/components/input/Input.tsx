import React from 'react';
import styles from './Input.module.css';

export type InputVariant = 'default' | 'error';
export type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    leftIcon ? styles.hasLeftIcon : '',
    rightIcon ? styles.hasRightIcon : '',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.inputWrapper,
    styles[variant],
    styles[size]
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {leftIcon && (
        <span className={styles.leftIcon}>{leftIcon}</span>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {rightIcon && (
        <span className={styles.rightIcon}>{rightIcon}</span>
      )}
    </div>
  );
};

export default Input; 