import type { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import data from "../data/favoriteFood";
import Title from "../components/Title";
import Card from "../components/Card";
import Sort from "../components/Sort";
import Layout from "../components/Layout";
import ImageView from "../components/ImageView";
import { Food } from "../types";
import { lightTheme, darkTheme } from "../data/colors";

const Home: NextPage = ({
  FavoriteFoods,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sortedFoods, setSortedFoods] = useState(FavoriteFoods);
  const [text, setText] = useState("");
  const [sort, setSort] = useState("name");
  const [color, setColors] = useState(lightTheme);
  const [showImage, setShowImage] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const changeSort = (type: string) => {
    setSort(type);
    setSortedFoods((prev: Food[]) => {
      switch (type) {
        case "name":
          return prev.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
        case "increasing":
          return prev.sort((a, b) => a.rating - b.rating);
        case "decreasing":
          return prev.sort((a, b) => b.rating - a.rating);
        default:
          return 0;
      }
    });
  };

  const filterFood = (text: string) => {
    setText(text);
    setSortedFoods(() => {
      const tempFoods = FavoriteFoods.filter((food: Food) => {
        if (food.name.toLowerCase().includes(text, 0)) {
          return food;
        }
      });
      return tempFoods;
    });
    changeSort(sort);
  };

  const changeTheme = () => {
    setColors((prev) => {
      if (prev === lightTheme) {
        return darkTheme;
      } else {
        return lightTheme;
      }
    });
  };

  const getClickedImage = (image: string) => {
    setModalImage(image);
    setShowImage(true);
  };

  const closeImage = () => {
    setShowImage(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Favorite Food</title>
        <meta name="description" content="Hell Week Activities"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout theme={color}>
        <div className={styles.toggleButtonContainer}>
          <button
            className={`btn btn-${color.buttonColor} ${styles.toggleButton}`}
            onClick={changeTheme}
          >
            {color === lightTheme ? "☾" : "☼"}
          </button>
        </div>
        {showImage && <ImageView closeImage={closeImage} image={modalImage} />}
        <Title
          title="Welcome to my Favorite Dishes"
          backgroundImage="/static/images/foodBg.jpg"
        />
        <div className={`${styles.mainContainer} bg-${color.backgroundColor}`}>
          <Sort
            text={text}
            sort={sort}
            filterFood={filterFood}
            changeSort={changeSort}
            theme={color}
          />
          <div className={`${styles.cardsContainer}`}>
            {sortedFoods.map((food: Food) => {
              return (
                <Card
                  key={food.id}
                  data={food}
                  theme={color}
                  getClickedImage={getClickedImage}
                />
              );
            })}
            {sortedFoods.length === 0 && (
              <span className="display-5 m-10">No Food Found</span>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const FavoriteFoods: Food[] = [...data].sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  return {
    props: {
      FavoriteFoods,
    },
  };
};

export default Home;
