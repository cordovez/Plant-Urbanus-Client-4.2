import { redirect } from "@remix-run/node";
import { useState } from "react";
import { commitSession, getSession } from "../sessions";

const BASE = process.env.BASE_URL;

// the form is intercepted by the action below and parses the data to set a session with the "token" received from the api.
export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  // read the values sent in the form
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  // sign in at API
  const response = await fetch(`${BASE}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username,
      password,
    }),
  });

  const accessInfo = await response.json();

  if (accessInfo.detail === "Incorrect username or password") {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors and nullify the session by "committing" a blank session.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  // otherwise redefine the session with the token and redirect
  session.set("token", accessInfo.access_token);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  // const data = useLoaderData();
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="h-full justify-center bg-yellow-100 items-center flex flex-col gap-y-5">
      <form method="POST" className="rounded-2xl bg-white p-6 w-96">
        <h2 className="text-3xl font-extrabold text-black-600 mb-5">Login</h2>
        <label htmlFor="username" className="text-gray-600 font-semibold">
          User
          <input
            type="text"
            name="username"
            className="w-full p-2 rounded-xl my-2 border border-gray-300"
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </label>
        <label htmlFor="password" className="text-gray-600 font-semibold">
          Password
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded-xl my-2 border border-gray-300"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </label>
        <button
          type="submit"
          name="_action"
          value="Sign In"
          className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
        >
          login
        </button>
        {/* <p>{JSON.stringify(data.message)}</p> */}
      </form>
    </div>
  );
}
