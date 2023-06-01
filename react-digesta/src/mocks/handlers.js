import { rest } from "msw";

export const handlers = [
  rest.get(
    process.env.REACT_APP_BASE_API_URL + "api/authors",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: 1660, name: "ABURNIUS VALENS" },
          { id: 1664, name: "ABURNIUS VoLENS" },
        ])
      );
    }
  ),
];
