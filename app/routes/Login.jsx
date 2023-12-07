import { redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { useState } from "react";
import LoginBackground from "../components/LoginBackground";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { commitSession, getSession } from "../sessions";

// the form is intercepted by the action below and parses the data to set a session with the "token" received from the api.

export async function action({ request }) {
  const BASE = process.env.BASE_URL;
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();

  const { _action, email, username, password } = Object.fromEntries(form);

  if (_action === "Register") {
    const response = await fetch(`${BASE}/api/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username: username.toLowerCase(),
        password,
      }),
    });
    console.log("REGISTER RESPONSE ++++++++++++++++", response);
    return response;
  }

  if (_action === "log in") {
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
    return redirect("/plants", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}
export default function Login() {
  const [login, setLogin] = useState(true);

  const handleClick = () => {
    setLogin(!login);
    console.log("this login: ", login);
  };
  return (
    <div className="bg-slate-800 flex flex-col w-full  sm:flex-row sm:h-screen">
      <div>
        <LoginBackground />
      </div>
      <div className="login flex flex-col items-center sm:min-w-max">
        {login ? <LoginForm /> : <RegisterForm />}
        <button
          className="text-white hover:bg-white hover:text-slate-900 border-none"
          onClick={handleClick}
          name="_action"
          value="toggle"
        >
          {login ? "or Register" : "or Log In"}
        </button>
      </div>
    </div>
  );
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
