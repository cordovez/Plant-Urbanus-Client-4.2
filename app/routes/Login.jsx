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
  return redirect("/AppLayout", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  // const [formData, setFormData] = useState({ username: "", password: "" });
  // // const data = useLoaderData();
  // const handleInputChange = (name, value) => {
  //   setFormData({ ...formData, [name]: value });
  // };
  return (
    <div className="bg-slate-800 flex flex-col w-full sm:flex-row ">
      <LoginBackground />
      <LoginForm />
    </div>
    // <div className=" justify-center items-center flex flex-col gap-y-5 ">
    //   <form method="POST" className=" p-10">
    //     <h2 className="text-xl font-extrabold text-white mb-5">Login</h2>
    //     <label htmlFor="username" className="text-slate-300 ">
    //       User name
    //       <input
    //         type="text"
    //         name="username"
    //         className="w-full p-2 rounded-xl my-2 border border-gray-300 text-slate-700"
    //         onChange={(e) => handleInputChange("username", e.target.value)}
    //       />
    //     </label>
    //     <label htmlFor="password" className="text-slate-300 ">
    //       Password
    //       <input
    //         type="password"
    //         name="password"
    //         className="w-full p-2 rounded-xl my-2 border border-gray-300"
    //         onChange={(e) => handleInputChange("password", e.target.value)}
    //       />
    //     </label>
    //     <button
    //       type="submit"
    //       name="_action"
    //       value="Sign In"
    //       className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
    //     >
    //       login
    //     </button>
    //   </form>
    // </div>
  );
}
