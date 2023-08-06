import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockName, mockValidPostcode } from "../mocks/data";

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

it("Submit button click renders name on screen", async () => {
  const { user, input, submitButton } = setup();

  await user.click(input);
  await user.keyboard(mockValidPostcode);
  await user.click(submitButton);
  await screen.findByRole("heading", {
    name: new RegExp(`^${mockName}$`, "i"),
  });
});

it("Enter event on input renders name on screen", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard(`${mockValidPostcode}{Enter}`);
  await screen.findByRole("heading", {
    name: new RegExp(`^${mockName}$`, "i"),
  });
});

it("Invalid postcode value renders error message on screen", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("Invalid input{Enter}");
  await screen.findByRole("heading", { name: /Invalid postcode/i });
});
