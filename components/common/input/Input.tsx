// src/components/common/Input/index.tsx
import React from 'react';
import './input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// ¡Adiós forwardRef! Ahora es un componente normal y limpio.
export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="common-input-wrapper">
      {label && <label className="common-label">{label}</label>}
      
      <input 
        className={`common-input ${error ? 'common-input-error' : ''} ${className}`} 
        {...props} 
      />
      
      {error && <span className="common-error-msg">{error}</span>}
    </div>
  );
};