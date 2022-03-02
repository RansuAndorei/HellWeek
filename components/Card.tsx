import styles from "../styles/Card.module.css";
import Image from "next/image";
import { Food, Movie, Color } from "../types";

interface CardProp {
  data: Food | Movie;
  theme: Color;
}

const Card = ({ data, theme }: CardProp) => {
  const ratingsFill = (star: number) => {
    let rating = "";
    for (let i = 0; i < star; i++) {
      rating += "★";
    }
    return rating;
  };

  const ratingsNoFill = (star: number) => {
    let rating = "";
    for (let i = 0; i < 5 - star; i++) {
      rating += "★";
    }
    return rating;
  };

  return (
    <div
      key={data.id}
      className={`shadow-lg mb-5 bg-${theme.divBackgroundColor} ${styles.cardContainer}`}
    >
      <div className={`${styles.imageContainer}`}>
        <Image
          src={data.image}
          alt={"foodBg"}
          layout="fill"
          quality={100}
          priority
        />
      </div>
      <div
        className={`display-4 ${styles.cardTitleContainer} bg-${theme.divBackgroundColor}`}
      >
        <span className={`text-${theme.textColor}`}>{data.name}</span>
      </div>
      <div
        className={`${styles.ratingsContainer} bg-${theme.divBackgroundColor}`}
      >
        <span className={styles.ratingsFill}>{ratingsFill(data.rating)}</span>
        <span className={styles.ratingsNoFill}>
          {ratingsNoFill(data.rating)}
        </span>
      </div>
      <div
        className={`${styles.descriptionContainer} bg-${theme.divBackgroundColor}`}
      >
        <span className={`text-${theme.textColor}`}>{data.description}</span>
      </div>
    </div>
  );
};

export default Card;
