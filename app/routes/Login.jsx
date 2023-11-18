import { redirect } from "@remix-run/node";
import { useState } from "react";
import { userToken } from "../cookies.server";

const BASE = process.env.BASE_URL;

// export async function loader({ request }) {
//   const cookieHeader = request.headers.get("Cookie");

//   if (!cookieHeader) {
//     return { message: "no cookie" };
//   }
//   return json({ token: cookieHeader });
// }
export async function action({ request }) {
  // const cookieHeader = request.headers.get("Cookie");
  // const cookie = (await userToken.parse(cookieHeader)) || {};

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
  console.log({ "action response": accessInfo.access_token });

  if (accessInfo.detail === "Incorrect username or password") {
    return redirect("/login");
  }

  const tokenCookie = await userToken.serialize({
    token: accessInfo.access_token,
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await userToken.serialize({
        token: accessInfo.access_token,
      }),
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
          className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600"
        >
          login
        </button>
        {/* <p>{JSON.stringify(data.message)}</p> */}
      </form>
    </div>
  );
}
