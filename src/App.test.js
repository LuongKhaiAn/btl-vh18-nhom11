import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders TravelGo on home page", () => {
  render(<App />);
  expect(screen.getByText("TravelGo")).toBeInTheDocument();
});
