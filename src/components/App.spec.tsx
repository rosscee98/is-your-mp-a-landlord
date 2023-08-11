import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockNonLandlordInterestsResponse } from "../mocks/data";
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

it("submitting postcode for constituency with landlord member renders landlord message", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", { name: /^mike gapes is a landlord$/i })
  ).toBeVisible();
});

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
    await screen.findByRole("heading", {
      name: /^mike gapes is not a landlord$/i,
    })
  ).toBeVisible();
});

it("constituency search error response renders error message on screen", async () => {
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
    await screen.findByRole("heading", { name: /something went wrong/i })
  ).toBeVisible();
});

it("member interests search error response renders error message on screen", async () => {
  const { user, input } = setup();
  server.use(
    rest.get(
      "https://members-api.parliament.uk/api/Members/id/RegisteredInterests",
      async (_, res, ctx) => res(ctx.status(500))
    )
  );

  await user.click(input);
  await user.keyboard("postcode{Enter}");
  expect(
    await screen.findByRole("heading", { name: /something went wrong/i })
  ).toBeVisible();
});
