import { redirect } from "@remix-run/node";
import { getSession } from "../sessions";

export default async function getToken({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/");
  }
  return token;
}
