import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Sidebar from "./components/Sidebar";
import styles from "./tailwind.css";

import { getSession } from "./sessions";

export const meta = () => {
  return [{ title: "PlantUrbanus" }];
};

export async function loader({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

  if (!token) {
    return null;
  }
  return token;
}

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const token = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen">
        {token ? (
          <>
            <Sidebar /> <Outlet />
          </>
        ) : (
          <>
            <Outlet />
          </>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <p>{error.message}</p>
        <Scripts />
      </body>
    </html>
  );
}
