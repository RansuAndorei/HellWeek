import styles from "../styles/Title.module.css";
import Image from "next/image";

interface props {
  title: string;
  backgroundImage: string;
}

const Title = (props: props) => {
  return (
    <div className={styles.welcomeContainer}>
      <Image
        src={props.backgroundImage}
        alt={"foodBg"}
        layout="fill"
        quality={100}
        priority
      />
      <div className={styles.titleContainer}>
        <h1 className={`display-1 ${styles.title}`}>{props.title}</h1>
      </div>
    </div>
  );
};

export default Title;
