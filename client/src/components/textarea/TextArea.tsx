import React from 'react';
import styles from './TextArea.module.css';

export type TextAreaVariant = 'default' | 'error';
export type TextAreaSize = 'small' | 'medium' | 'large';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const TextArea: React.FC<TextAreaProps> = ({
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  resize = 'vertical',
  className,
  ...props
}) => {
  const textareaClasses = [
    styles.textarea,
    styles[variant],
    styles[size],
    styles[`resize-${resize}`],
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.textareaWrapper,
    styles[variant],
    styles[size]
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <textarea
        className={textareaClasses}
        {...props}
      />
    </div>
  );
};

export default TextArea;