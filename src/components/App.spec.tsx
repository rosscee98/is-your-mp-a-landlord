import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

vi.mock("../utils/getMember", () => ({
  default: vi.fn((value: string) => Promise.resolve(value)),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function setup() {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  const helpers = {
    input: screen.getByRole("textbox"),
    submitButton: screen.getByRole("button", { name: /submit/i }),
  };

  return {
    user: userEvent.setup(),
    ...helpers,
  };
}

it("Submit button click renders value on screen", async () => {
  const { user, input, submitButton } = setup();

  await user.click(input);
  await user.keyboard("Hello world");
  await user.click(submitButton);
  expect(screen.getByRole("heading", { name: /^hello world$/i })).toBeVisible();
});

it("Enter event on input renders value on screen", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("Hello world{Enter}");
  expect(screen.getByRole("heading", { name: /^hello world$/i })).toBeVisible();
});

it("Rendered value only changes on submit event", async () => {
  const { user, input, submitButton } = setup();

  await user.click(input);
  await user.keyboard("Hello world{Enter}");
  expect(screen.getByRole("heading", { name: /^hello world$/i })).toBeVisible();

  // No change on further input
  await user.click(input);
  await user.keyboard("123");
  expect(screen.getByRole("heading", { name: /^hello world$/i })).toBeVisible();

  // Change on submission
  await user.click(submitButton);
  expect(
    screen.getByRole("heading", { name: /^hello world123$/i })
  ).toBeVisible();
});
