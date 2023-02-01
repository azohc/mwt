import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("displays no textinput on render", () => {
  const { getByTestId } = render(<App />);
  const searchField = getByTestId("search-field");
  expect(searchField).not.toBeInTheDocument();
});

test("displays textinput when spacebar is pressed", () => {
  const { getByTestId } = render(<App />);
  fireEvent.keyPress(document, { key: "Space" });
  const searchField = getByTestId("search-field");
  expect(searchField).toBeInTheDocument();
});
