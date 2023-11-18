// import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import LogoutButton from "../components/logout";
import { userToken } from "../cookies.server";
const BASE = process.env.BASE_URL;

export const meta = () => {
  return [{ title: "PlantUrbanus: User" }];
};

export async function loader({ request }) {
  // const session = await getSession(request.headers.get("Cookie"));
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await userToken.parse(cookieHeader);
  const token = cookie.token;

  if (token) {
    const response = fetch(`${BASE}/api/users/me/plants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = (await response).json();
    console.log(await data);
    return data;
  }
}

export default function Index() {
  const data = useLoaderData();
  return (
    <div>
      <h1>PlantUrbanus</h1>

      <ul>
        {data.map((plant) => {
          return (
            <li key={plant.common_name}>
              {plant.common_name} <span>{plant.images.length}</span>
              <img src={plant.images[0].url} alt="plant"></img>
            </li>
          );
        })}
      </ul>
      <LogoutButton />
    </div>
  );
}
