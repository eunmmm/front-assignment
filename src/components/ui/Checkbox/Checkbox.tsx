'use client';

import { useState } from 'react';

import styles from './Checkbox.module.scss';

type CheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    setIsChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={styles.checkbox}
      />
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
};

export default Checkbox;
