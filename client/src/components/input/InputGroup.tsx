import React from 'react';
import styles from './InputGroup.module.css';

interface InputGroupProps {
  children: React.ReactNode;
  label?: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  children,
  label,
  htmlFor,
  error,
  required = false
}) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={htmlFor} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputGroup; 