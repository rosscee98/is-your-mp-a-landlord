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
    submitButton: screen.getByRole("button", { name: /search/i }),
  };

  return {
    user: userEvent.setup(),
    ...helpers,
  };
}

it("submitting postcode with landlord member renders landlord message", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  expect(
    await screen.findByRole("heading", { name: /^mike gapes is a landlord$/i })
  ).toBeVisible();
});

it("submitting postcode with non-landlord member renders non-landlord message", async () => {
  const { user, input } = setup();
  server.use(
    rest.get(
      "https://members-api.parliament.uk/api/Members/id/RegisteredInterests",
      async (_, res, ctx) => res(ctx.json(mockNonLandlordInterestsResponse))
    )
  );

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  expect(
    await screen.findByRole("heading", {
      name: /^mike gapes is not a landlord$/i,
    })
  ).toBeVisible();
});

it("member search error renders error message on screen", async () => {
  const { user, input } = setup();
  server.use(
    rest.get(
      "https://members-api.parliament.uk/api/Location/Constituency/Search",
      async (_, res, ctx) => res(ctx.status(500))
    )
  );

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  expect(
    await screen.findByRole("heading", { name: /something went wrong/i })
  ).toBeVisible();
});

it("interests search error renders error message on screen", async () => {
  const { user, input } = setup();
  server.use(
    rest.get(
      "https://members-api.parliament.uk/api/Members/id/RegisteredInterests",
      async (_, res, ctx) => res(ctx.status(500))
    )
  );

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  expect(
    await screen.findByRole("heading", { name: /something went wrong/i })
  ).toBeVisible();
});

it("submitting invalid postcode shows field error message", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("invalid postcode{Enter}");
  expect(screen.getByText(/invalid postcode/i)).toBeVisible();
  expect(
    screen.queryByRole("heading", { name: /^mike gapes is a landlord$/i })
  ).not.toBeInTheDocument();
});

it("submitting invalid postcode after a valid search hides old results", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  await user.clear(input);
  await user.click(input);
  await user.keyboard("invalid postcode{Enter}");
  expect(
    screen.queryByRole("heading", { name: /^mike gapes is a landlord$/i })
  ).not.toBeInTheDocument();
});

it("submitting valid postcode after an invalid search hides field error message", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("invalid postcode{Enter}");
  await user.clear(input);
  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  expect(screen.queryByText(/invalid postcode/i)).not.toBeInTheDocument();
});
