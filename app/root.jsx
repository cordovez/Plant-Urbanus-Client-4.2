import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import Sidebar from "./components/Sidebar";
import Hero from "./components/hero";
import styles from "./tailwind.css";
export const links = () => [{ rel: "stylesheet", href: styles }];

export const meta = () => {
  return [{ title: "PlantUrbanus" }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Hero />
        <div className="flex">
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </div>

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
