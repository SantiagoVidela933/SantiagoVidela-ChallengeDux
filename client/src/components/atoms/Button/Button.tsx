'use client';

import { Button as PrimeButton } from 'primereact/button';
import React from 'react';

type ButtonProps = {
  label: string;
  icon?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  severity?: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast';
  outlined?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  label, 
  icon, 
  onClick, 
  severity = undefined, 
  outlined = false, 
  disabled = false, 
  type = 'button', 
  className = ''
}) => {
  return (
    <PrimeButton 
      label={label}
      icon={icon}
      severity={severity}
      outlined={outlined}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
    />
  )
}

export default Button
