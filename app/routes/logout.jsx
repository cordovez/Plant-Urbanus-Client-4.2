import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { destroySession, getSession } from "../sessions";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button>Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}
