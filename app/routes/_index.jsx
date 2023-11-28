import { redirect } from "@remix-run/node";
import { getSession } from "../sessions";
import styles from "../tailwind.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const meta = () => {
  return [{ title: "PlantUrbanus" }];
};

export async function loader({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));

  // const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/Login");
  }
  return "";
}
export default function Index() {
  <main>
    <h1 className="text-xl">Hello world</h1>
    {/* <div className="flex flex-col ">
        <Hero />
        <div className="flex ">
          <Sidebar />
          <Plants />
        </div>
      </div> */}
  </main>;
}
