'use client';

import { useEffect } from 'react';

import styles from './Toast.module.scss';

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.toast}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
