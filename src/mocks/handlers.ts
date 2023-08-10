import { rest } from "msw";
import { mockMemberResponse, mockLandlordInterestsResponse } from "./data";

export const handlers = [
  rest.get(
    "https://members-api.parliament.uk/api/Location/Constituency/Search",
    (_, res, ctx) => res(ctx.json(mockMemberResponse))
  ),
  rest.get(
    "https://members-api.parliament.uk/api/Members/*/RegisteredInterests",
    (_, res, ctx) => res(ctx.json(mockLandlordInterestsResponse))
  ),
];
