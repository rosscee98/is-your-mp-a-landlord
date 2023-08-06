import { rest } from "msw";
import { mockMemberResponse, mockValidPostcode } from "./data";

export const handlers = [
  rest.get(
    "https://members-api.parliament.uk/api/Location/Constituency/Search",
    (req, res, ctx) => {
      const postcode = req.url.searchParams.get("searchText");
      return postcode === mockValidPostcode
        ? res(ctx.json(mockMemberResponse))
        : res(ctx.status(500), ctx.json({ message: "Error" }));
    }
  ),
];
