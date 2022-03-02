import styles from "../styles/Header.module.css";
import { Color } from "../types";
import { useState, useEffect } from "react";
interface LayoutProps {
  theme: Color;
}

const Header = ({ theme }: LayoutProps) => {
  const [colors, setColors] = useState(theme);

  useEffect(() => {
    setColors(theme);
  }, [theme]);

  return (
    <div className={`${styles.container} bg-${colors.backgroundColor}`}>
      <div className={styles.logo}>
        <span className={`text-${colors.textColor}`}>Hell Week</span>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.tab}>
          <span className={`text-${colors.textColor}`}>Foods</span>
        </div>
        <div className={styles.tab}>
          <span className={`text-${colors.textColor}`}>Movies</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
