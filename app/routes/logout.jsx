import { redirect } from "@remix-run/node";
import { Form, NavLink } from "@remix-run/react";
import BasicButton from "../components/basicButton";
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
    <main>
      <div className=" justify-center items-center flex flex-col gap-y-5 mt-20">
        <h2 className="text-3xl font-extrabold text-black-600 mb-5">Log Out</h2>
        <p>Are you sure you want to log out?</p>
        <Form method="post">
          <BasicButton label={"Log out"} />
        </Form>
        <NavLink to="/">Never mind</NavLink>
      </div>
    </main>
  );
}
