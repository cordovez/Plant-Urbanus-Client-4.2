import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlantGrid from "../components/PlantGrid";
import { getSession } from "../sessions";
const BASE = process.env.BASE_URL;

export async function loader({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/");
  }

  const response = fetch(`${BASE}/api/users/me/plants`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();
  return data;
}

export default function PlantPhotos() {
  const data = useLoaderData();
  return (
    <main className="flex mx-10">
      <PlantGrid data={data} />
    </main>
  );
}
