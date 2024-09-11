import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';

import styles from './AlertDialog.module.scss';

type AlertDialogProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

const AlertDialog = ({
  isOpen,
  message,
  onClose,
  onConfirm,
}: AlertDialogProps) => {
  return (
    <Dialog isOpen={isOpen}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonGroup}>
        <Button text="cancel" theme="dangerous" onClick={onClose} />
        <Button text="ok" theme="primary" onClick={onConfirm} />
      </div>
    </Dialog>
  );
};

export default AlertDialog;
