'use client';

import styles from './Checkbox.module.scss';

type CheckboxProps = {
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox = ({
  label,
  defaultChecked = false,
  onChange,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={handleChange}
        className={styles.checkbox}
      />
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
};

export default Checkbox;
