import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const userToken = createCookie("JWT", {
  secure: false,
  maxAge: 60 * 60,
});
