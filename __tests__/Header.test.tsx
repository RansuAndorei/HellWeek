import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import "@testing-library/jest-dom";

const theme = {
  backgroundColor: "white",
  divBackgroundColor: "light",
  textColor: "black",
  buttonColor: "dark",
};

describe("Does it exist?", () => {
  beforeEach(() => {
    render(<Header theme={theme} />);
  });

  const getText = (text: string) => {
    expect(screen.getByText(text)).toBeInTheDocument();
  };

  it("Renders the Logo", () => {
    getText("Hell Week");
  });
  it("Renders the Food Tab", () => {
    getText("Foods");
  });
  it("Renders the Movie Tab", () => {
    getText("Movies");
  });
});
