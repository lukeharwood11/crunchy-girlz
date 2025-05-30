import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  children,
  className 
}) => {
  const errorClasses = [
    styles.errorMessage,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={errorClasses}>
      {children}
    </div>
  );
};

export default ErrorMessage; 