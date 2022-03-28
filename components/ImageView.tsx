import styles from "../styles/ImageView.module.css";
import Image from "next/image";

interface Param {
  closeImage: () => void;
  image: string;
}

const ImageView = ({ closeImage, image }: Param) => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.imageContainer}`}>
          <Image src={image} layout="fill" alt={image} />
        </div>
      </div>
      <div className={styles.closeButtonContainer}>
        <button
          className={`btn btn-light ${styles.closeButton}`}
          onClick={closeImage}
        >
          ✘
        </button>
      </div>
    </>
  );
};

export default ImageView;
