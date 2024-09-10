import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  theme?: 'primary' | 'dangerous';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button = ({
  text,
  onClick,
  theme = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${styles.button} ${styles[theme]} ${styles[size]}`}
    >
      {text}
    </button>
  );
};

export default Button;
