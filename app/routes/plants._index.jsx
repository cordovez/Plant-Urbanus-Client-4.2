import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlantsOverviewGrid from "../components/PlantsOverviewGrid";
import { getSession } from "../sessions";
import styles from "../tailwind.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;
  if (!token) {
    return redirect("/");
  }

  const response = fetch(`${process.env.BASE_URL}/api/users/me/plants`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();
  return data;
}
export default function PlantPhotos() {
  const plantData = useLoaderData();
  return (
    <main>
      <PlantsOverviewGrid data={plantData} />
    </main>
  );
}
