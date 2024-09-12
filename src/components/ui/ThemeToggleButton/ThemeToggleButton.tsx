'use client';

import { useTheme } from '@/contexts/ThemeContext';

import styles from './ThemeToggleButton.module.scss';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className={styles.toggleButton} onClick={toggleTheme}>
      {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
