import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
export default function Plants() {
  return <Outlet />;
}
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <div>
          <p>{error.stack}</p>
        </div>
      </main>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
