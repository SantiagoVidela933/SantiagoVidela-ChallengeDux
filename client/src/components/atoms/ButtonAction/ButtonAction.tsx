'use client';

import styles from './ButtonAction.module.css';

interface ButtonActionProps {
  label: string;
  icon: string;
  onClick: () => void;
  variant?: 'edit' | 'delete';
}

export default function ButtonAction({
  label,
  icon,
  onClick,
  variant = 'edit',
}: ButtonActionProps) {
  return (
    <button
      className={`${styles.button} ${variant === 'delete' ? styles.delete : styles.edit}`}
      onClick={onClick}
      title={label}
      type="button"
    >
      <i className={`pi ${icon}`} aria-hidden="true" />
    </button>
  );
}
