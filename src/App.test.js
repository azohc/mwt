import { screen, fireEvent, render } from "@testing-library/react";
import App from "./App";

test("displays no textinput on render", () => {
  render(<App />);
  const searchField = screen.queryByTestId("search-field");
  expect(searchField).toBeFalsy();
});

test("displays textinput when spacebar is pressed", async () => {
  render(<App />);
  fireEvent.keyUp(document, { code: "Space" });

  const searchField = screen.queryByTestId("search-field");
  expect(searchField).toBeInTheDocument();
});
