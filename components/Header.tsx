import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <span>Hell Week</span>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.tab}>
          <span>Foods</span>
        </div>
        <div className={styles.tab}>
          <span>Movies</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
