import styles from "../styles/Card.module.css";
import Image from "next/image";
import { Food, Movie, Color } from "../types";

interface CardProp {
  data: Food | Movie;
  theme: Color;
  getClickedImage: (text: string) => void;
}

const Card = ({ data, theme, getClickedImage }: CardProp) => {
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
          alt={data.name}
          layout="fill"
          priority
          onClick={() => {
            getClickedImage(data.image);
          }}
          className={styles.cardImage}
        />
      </div>
      <div
        className={`display-4 ${styles.cardTitleContainer} bg-${theme.divBackgroundColor}`}
      >
        <span
          className={`text-${theme.textColor}`}
          data-testid="test-card-name"
        >
          {data.name}
        </span>
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
