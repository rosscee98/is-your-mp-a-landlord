import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  mockNonLandlordInterestsResponse,
  mockThumbnailUrl,
} from "../mocks/data";
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

it("submitting postcode with landlord member renders landlord details", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  expect(
    await screen.findByRole("heading", {
      name: /^landlord$/i,
    })
  ).toBeVisible();
  expect(
    screen.getByRole("heading", {
      name: /^mike gapes$/i,
    })
  ).toBeVisible();
  expect(screen.getByText(/^mp for ilford south$/i)).toBeVisible();
  // TODO: fix below
  // expect(screen.getByAltText(/headshot of mike gapes/i)).toHaveAttribute(
  //   "src",
  //   mockThumbnailUrl
  // );
  expect(screen.getByText(/landlord interest/i)).toBeVisible();
  expect(
    screen.queryByText(/general property interest/i)
  ).not.toBeInTheDocument();
  expect(screen.getByText(/combined interest/i)).toBeVisible();
});

it("submitting postcode with non-landlord member renders non-landlord details", async () => {
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
      name: /^not a landlord$/i,
    })
  ).toBeVisible();
  expect(
    screen.getByRole("heading", {
      name: /^mike gapes$/i,
    })
  ).toBeVisible();
  expect(screen.getByText(/^mp for ilford south$/i)).toBeVisible();
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

  const fieldError = screen.getByText(/invalid postcode/i);
  expect(fieldError).toBeVisible();
  expect(
    screen.queryByRole("heading", { name: /^mike gapes$/i })
  ).not.toBeInTheDocument();

  // disappears on input change
  await user.click(input);
  await user.keyboard("x");
  expect(fieldError).not.toBeInTheDocument();
});

it("submitting invalid postcode after a valid search hides old results", async () => {
  const { user, input } = setup();

  await user.click(input);
  await user.keyboard("SW1A1AA{Enter}");
  await user.clear(input);
  await user.click(input);
  await user.keyboard("invalid postcode{Enter}");
  expect(
    screen.queryByRole("heading", { name: /^mike gapes$/i })
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
