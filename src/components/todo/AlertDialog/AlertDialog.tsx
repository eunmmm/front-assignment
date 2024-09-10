import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';

import styles from './AlertDialog.module.scss';

type AlertDialogProps = {
  isOpen: boolean;
  message: string;
};

const AlertDialog = ({ isOpen, message }: AlertDialogProps) => {
  return (
    <Dialog isOpen={isOpen}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonGroup}>
        <Button text="cancel" theme="dangerous" />
        <Button text="ok" theme="primary" />
      </div>
    </Dialog>
  );
};

export default AlertDialog;
