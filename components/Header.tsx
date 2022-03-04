import styles from "../styles/Header.module.css";
import { Color } from "../types";
import { useState, useEffect } from "react";
import Link from "next/link";
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
        <Link href={"/"}>
          <a className={`text-${colors.textColor}`}>Hell Week</a>
        </Link>
      </div>
      <div className={styles.tabContainer}>
        <div className={styles.tab}>
          <Link href={"/Food"}>
            <a className={`text-${colors.textColor}`}>Foods</a>
          </Link>
        </div>
        <div className={styles.tab}>
          <Link href={"/Movie"}>
            <a className={`text-${colors.textColor}`}>Movies</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
