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
export const links = () => [
  { rel: "stylesheet", href: styles },
  // { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  // {
  //   rel: "icon",
  //   type: "image/png",
  //   sizes: "32x32",
  //   href: "/favicon-32x32.png",
  // },
  // {
  //   rel: "icon",
  //   type: "image/png",
  //   sizes: "16x16",
  //   href: "/favicon-16x16.png",
  // },
];

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
