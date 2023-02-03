import { fireEvent, render } from "@testing-library/react";
import App from "./App";

test("displays no textinput on render", () => {
  const { queryByTestId } = render(<App />);
  const searchField = queryByTestId("search-field");
  expect(searchField).toBeFalsy();
});

test("displays textinput when spacebar is pressed", async () => {
  const { queryByTestId } = render(<App />);
  fireEvent.keyUp(document, { code: "Space" });

  const searchField = queryByTestId("search-field");
  expect(searchField).toBeInTheDocument();
});
