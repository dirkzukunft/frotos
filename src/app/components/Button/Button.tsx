import React from 'react';
import type { colorKey } from '../../lib/colors';
import { COLORS } from '../../lib/colors';
import Icon from '../Icon/Icon';
import type { iconKey } from '../Icon/icons';
import styles from './Button.module.css';

export type ButtonProps = {
  icon?: iconKey;
  text?: string;
  color?: colorKey;
  small?: boolean;
  large?: boolean;
  transparent?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  icon = 'none',
  text,
  color = 'lightPrimary',
  small = false,
  large = false,
  transparent = false,
  onClick,
  className = '',
}: ButtonProps): JSX.Element {
  const { colorClass } = COLORS[color];

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${colorClass} 
        ${small && styles.small} ${transparent && styles.transparent} ${className}`}
    >
      {icon && (
        <Icon
          icon={icon}
          color={color}
          width={small ? '1rem' : large ? '2rem' : undefined}
          height={small ? '1rem' : large ? '2rem' : undefined}
        />
      )}
      {text && <div className={`${colorClass}`}>{text}</div>}
    </button>
  );
}