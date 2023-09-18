import styles from './Field.module.css';

const Field = ({ label, name, width, error, tip, children }) => {
    return (
      <div className={styles.field} style={{ width: width }}>
        {label && <label className={styles.label}>{label}</label>}
        {children}
        {tip && <div className={styles.tip}>{tip}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
  
  export default Field;