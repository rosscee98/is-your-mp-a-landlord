import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockName } from "../mocks/data";
import { rest, server } from "../mocks/server";

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
  await user.keyboard("postcode");
  await user.click(submitButton);
  expect(
    await screen.findByRole("heading", {
      name: new RegExp(mockName, "i"),
    })
  ).toBeVisible();
});

it("Enter event on input renders name on screen", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", {
      name: new RegExp(mockName, "i"),
    })
  ).toBeVisible();
});

it("Invalid postcode value renders error message on screen", async () => {
  const { user, input } = setup();
  server.use(
    rest.get(
      "https://members-api.parliament.uk/api/Location/Constituency/Search",
      async (_, res, ctx) => res(ctx.status(500))
    )
  );

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", { name: /invalid postcode/i })
  ).toBeVisible();
});

it("submitting postcode for constituency with landlord member renders landlord message", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", { name: /Invalid postcode/i })
  ).toBeVisible();
});
