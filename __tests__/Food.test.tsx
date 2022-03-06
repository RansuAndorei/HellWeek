import { fireEvent, render, screen } from "@testing-library/react";
import Food from "../pages/Food";
import "@testing-library/jest-dom";
import type { NextPage } from "next";
import data from "../data/favoriteFood";
import { Food as FoodType } from "../types";

interface FormType {
  Component: NextPage;
  pageProps: object;
}

const mockFoodGetStaticProps = () => {
  const FavoriteFoods: FoodType[] = [...data].sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  return FavoriteFoods;
};

describe("Does it exist?", () => {
  const MyApp = ({ Component, pageProps }: FormType) => {
    return <Component {...pageProps} />;
  };

  it("Renders the Add Food Button", () => {
    const favoriteFoods = mockFoodGetStaticProps();
    const props = { FavoriteFoods: favoriteFoods };
    render(<MyApp Component={Food} pageProps={props} />);
    expect(screen.getByText("Add Food")).toBeInTheDocument();
  });
});

const sortByName = (food: FoodType[]) => {
  const sorted: FoodType[] = [...food].sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );
  const names = sorted.map((food) => food.name);
  return names;
};

const sortAscending = (food: FoodType[]) => {
  const sorted = [...food].sort((a, b) => a.rating - b.rating);
  const names = sorted.map((food) => food.name);
  return names;
};

const sortDescending = (food: FoodType[]) => {
  const sorted = [...food].sort((a, b) => b.rating - a.rating);
  const names = sorted.map((food) => food.name);
  return names;
};

describe("Does it behave as expected", () => {
  const MyApp = ({ Component, pageProps }: FormType) => {
    return <Component {...pageProps} />;
  };

  beforeEach(() => {
    const favoriteFoods = mockFoodGetStaticProps();
    const props = { FavoriteFoods: favoriteFoods };
    render(<MyApp Component={Food} pageProps={props} />);
  });

  const buttonClick = (name: string) => {
    const buttonName = screen.getByRole("button", { name: name });
    fireEvent.click(buttonName);
    return screen.getAllByTestId("test-card-name");
  };

  it("Sort the Food Card by Name", () => {
    const cardList = buttonClick("Name");
    const cardListNames = cardList.map((card) => card.innerHTML);
    expect(cardListNames).toEqual(sortByName(data));
  });

  it("Sort the Food Card by Ratings (Ascending)", () => {
    const cardList = buttonClick("Ratings (Ascending)");
    const cardListNames = cardList.map((card) => card.innerHTML);
    expect(cardListNames).toEqual(sortAscending(mockFoodGetStaticProps()));
  });

  it("Sort the Food Card by Ratings (Descending)", () => {
    const cardList = buttonClick("Ratings (Descending)");
    const cardListNames = cardList.map((card) => card.innerHTML);
    expect(cardListNames).toEqual(sortDescending(mockFoodGetStaticProps()));
  });

  it("Filter Food", () => {
    const input = screen.getByPlaceholderText(/Filter/i);
    fireEvent.change(input, { target: { value: "ch" } });
    const cardList = screen.getAllByTestId("test-card-name");
    const cardListNames = cardList.map((card) => card.innerHTML);
    expect(cardListNames).toEqual([
      "Chicken Inasal",
      "Lechon",
      "Lechon Kawali",
    ]);
  });

  it("Empty List", () => {
    const input = screen.getByPlaceholderText(/Filter/i);
    fireEvent.change(input, { target: { value: "Salad" } });
    const emptyText = screen.getByText("No Food Found");
    expect(emptyText).toBeInTheDocument();
  });
});
