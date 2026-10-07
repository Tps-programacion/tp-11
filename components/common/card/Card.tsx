import React from 'react';
import './card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`common-card ${className}`}>
      {children}
    </div>
  );
};