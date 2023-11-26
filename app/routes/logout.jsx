import { redirect } from "@remix-run/node";
import { Form, NavLink } from "@remix-run/react";
import { destroySession, getSession } from "../sessions";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/Login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <main className="justify-center">
      <div className=" justify-center items-center flex flex-col gap-y-5 ">
        <h2 className="text-3xl font-extrabold text-black-600 mb-5">Log Out</h2>
        <p>Are you sure you want to log out?</p>
        <Form method="post">
          <button className="hover:bg-yellow-500">Logout</button>
        </Form>
        <NavLink to="/">Never mind</NavLink>
      </div>
    </main>
  );
}
