import styles from './Dialog.module.scss';

type DialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Dialog = ({ isOpen, children }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>{children}</div>
    </div>
  );
};

export default Dialog;
