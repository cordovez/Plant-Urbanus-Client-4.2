import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
// import Sidebar from "./components/Sidebar";
// import Hero from "./components/hero";
import Layout from "./components/Layout";
import Login from "./routes/Login";
import { getSession } from "./sessions";
import styles from "./tailwind.css";
// import getToken from "./utils/getToken";
export const links = () => [{ rel: "stylesheet", href: styles }];

export const meta = () => {
  return [{ title: "PlantUrbanus" }];
};

export const loader = async ({ request }) => {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;
  if (token === undefined) {
    return null;
  }
  // return redirect("/plants");
  return token;
};

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
      <body>
        {token ? <Layout /> : <Login />}

        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
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
