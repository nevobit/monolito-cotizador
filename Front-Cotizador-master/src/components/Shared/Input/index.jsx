import styles from './Input.module.css'

const Input = ({ icon, className, ...rest }) => {
    return (
      <div className={styles.input}>
        {icon && icon}
        <input {...rest} className={`${styles.input_element} ${className === 'none' ? styles.input_none : ''}`} />
      </div>
    );
  }
  
  export default Input;
  