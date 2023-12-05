import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

// import { redirect } from "@remix-run/node";

// import getToken from "../utils/getToken";

// export const loader = async ({ request }) => {
//   const token = getToken({ request });
//   console.log(token);
//   if (!token) {
//     return redirect("/Login");
//   }
//   return "";
// };
export default function Plants() {
  // const user = useLoaderData();

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
        <h1>Plant Grid Error</h1>
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
