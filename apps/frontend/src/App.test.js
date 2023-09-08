import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders list", () => {
  render(<App />);
  const linkElement = screen.getByText(/Users/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders add new user", () => {
  render(<App />);
  const linkElement = screen.getByText(/Add new user/i);
  expect(linkElement).toBeInTheDocument();
});
