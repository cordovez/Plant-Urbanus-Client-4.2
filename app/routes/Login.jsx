import { redirect } from "@remix-run/node";
import LoginBackground from "../components/LoginBackground";
import LoginForm from "../components/LoginForm";
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
  return redirect("/plants", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  return (
    <div className="bg-slate-800 flex flex-col w-full sm:flex-row ">
      <div>
        <LoginBackground />
      </div>
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
}
