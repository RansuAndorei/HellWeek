import type { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import data from "../data/favoriteFood";
import Title from "../components/Title";
import Card from "../components/Card";
import Sort from "../components/Sort";
import Layout from "../components/Layout";
import { Food } from "../types";
import { lightTheme, darkTheme } from "../data/colors";

// import { useState } from "react";

/*
  1. Create a NextJS application that showcases your favourite foods (or dishes) in card format. (List at least 6 foods)
    1. FoodCard contains:
        1. Image
        2. Description (Describe it’s contents)
        3. Rating (Out of 5)
  2. Allow users to filter by name.
    1. Let’s say your favourite foods are: [”apple”, “banana”, “steak”]
        1. If you type “a”, then your list should only contain foods that contain “a” (returns apple, banana, steak)
        2. If you type “ea”, then your list only returns foods that contain “ea” (returns steak)
  3. Allow users to sort by rating
    1. Returns list in increasing or decreasing order by rating.
*/

const Home: NextPage = ({
  FavoriteFoods,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sortedFoods, setSortedFoods] = useState(FavoriteFoods);
  const [text, setText] = useState("");
  const [sort, setSort] = useState("name");
  const [color, setColors] = useState(lightTheme);

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Favorite Food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout theme={color}>
        <div className={styles.toggleButtonContainer}>
          <button
            className={`btn btn-${color.buttonColor} ${styles.toggleButton}`}
            onClick={changeTheme}
          >
            {color === lightTheme ? "☽" : "☼"}
          </button>
        </div>
        <Title
          title="Welcome to my Favorite Dishes"
          backgroundImage="/public/static/images/foodBg3.png"
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
              return <Card key={food.id} data={food} theme={color} />;
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
