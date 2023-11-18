import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "_session",
      sameSite: "lax",
      path: "/",
      httpOnly: false,
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production", //bool
      maxAge: 60 * 60,
      // maxAge: 60 * 60 * 24 * 30,
    },
  });

export { commitSession, destroySession, getSession };
