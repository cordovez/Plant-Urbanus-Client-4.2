import { json, redirect } from "@remix-run/node";
import { useState } from "react";
import { commitSession, getSession } from "../sessions";

const BASE = process.env.BASE_URL;

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

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

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  session.set("token", accessInfo.access_token);
  return redirect("/", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  //   const response = useActionData();
  //   console.log(response);
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
          className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600"
        >
          login
        </button>
      </form>
    </div>
  );
}
