import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';

import styles from './AlertDialog.module.scss';

type AlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

const AlertDialog = ({ isOpen, onClose, message }: AlertDialogProps) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonGroup}>
        <Button text="cancel" theme="dangerous" />
        <Button text="ok" theme="primary" />
      </div>
    </Dialog>
  );
};

export default AlertDialog;
