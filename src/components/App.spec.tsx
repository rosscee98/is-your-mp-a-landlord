import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockName, mockNonLandlordInterestsResponse } from "../mocks/data";
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

it.skip("submit button click renders name on screen", async () => {
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

it.skip("enter event on input renders name on screen", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", {
      name: new RegExp(mockName, "i"),
    })
  ).toBeVisible();
});

it.skip("invalid postcode value renders error message on screen", async () => {
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
    await screen.findByRole("heading", { name: /^landlord$/i })
  ).toBeVisible();
});

// passes in isolation. failing due to some side effect, conflicting with test above
it("submitting postcode for constituency with non-landlord member renders non-landlord message", async () => {
  const { user, input } = setup();
  server.use(
    rest.get(
      "https://members-api.parliament.uk/api/Members/id/RegisteredInterests",
      async (_, res, ctx) => res(ctx.json(mockNonLandlordInterestsResponse))
    )
  );

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", { name: /^not a landlord$/i })
  ).toBeVisible();
});
