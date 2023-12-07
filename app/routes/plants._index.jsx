import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlantsOverviewGrid from "../components/PlantsOverviewGrid";
import styles from "../tailwind.css";
import getToken from "../utils/getToken";

export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }) {
  const token = await getToken({ request });
  if (!token) {
    return redirect("/Login");
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

  return <PlantsOverviewGrid data={plantData} />;
}
