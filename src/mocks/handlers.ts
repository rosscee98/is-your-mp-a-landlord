import { rest } from "msw";
import { mockMemberResponse } from "./data";

export const handlers = [
  rest.get(
    "https://members-api.parliament.uk/api/Location/Constituency/Search",
    (_, res, ctx) => res(ctx.json(mockMemberResponse))
  ),
];
