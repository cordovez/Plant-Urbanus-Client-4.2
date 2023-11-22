import { redirect } from "@remix-run/node";
import { getSession } from "../sessions";

export const meta = () => {
  return [{ title: "PlantUrbanus: User" }];
};

export async function loader({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));

  // const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/Login");
  }
  return redirect("/plants/photos");
}

export default function Index() {
  return "Index";
}
