import styles from './TodoForm.module.scss';

type TodoFormProps = {
  formTitle: string;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

const TodoForm = ({
  formTitle,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: TodoFormProps): JSX.Element => {
  return (
    <>
      <h2 className={styles.formTitle}>{formTitle}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="todoTitle" className={styles.label}>
          Title
        </label>
        <input
          id="todoTitle"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter todo title"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="todoDescription" className={styles.label}>
          Description
        </label>
        <textarea
          id="todoDescription"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter todo description"
          className={styles.textarea}
        />
      </div>
    </>
  );
};

export default TodoForm;
