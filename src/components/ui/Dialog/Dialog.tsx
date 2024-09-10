import styles from './Dialog.module.scss';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog = ({
  isOpen,
  onClose,
  children,
}: DialogProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>{children}</div>
    </div>
  );
};

export default Dialog;
