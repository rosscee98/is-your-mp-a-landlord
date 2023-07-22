import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

it("Submitting input renders input on screen", () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  fireEvent.change(input, { target: { value: "Hello world" } });
  fireEvent.click(submitButton);

  expect(screen.getByText("Hello world")).toBeInTheDocument();
});
