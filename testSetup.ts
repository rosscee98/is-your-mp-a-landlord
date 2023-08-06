import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { server } from "./src/mocks/server";
import "whatwg-fetch";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  server.close();
  cleanup();
});
