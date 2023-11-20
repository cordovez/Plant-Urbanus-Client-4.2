import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";

const BASE = process.env.BASE_URL;

export const meta = () => {
  return [{ title: "PlantUrbanus: User" }];
};

export async function loader({ request }) {
  const cookieHeader = await getSession(request.headers.get("Cookie"));

  // const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/login");
  }

  const response = fetch(`${BASE}/api/users/me/plants`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();
  return data;
}

export default function Index() {
  const data = useLoaderData();
  return (
    <div>
      <h1>PlantUrbanus</h1>
      <div>
        <ul>
          <li>User profile</li>
          <li>Plant List</li>
        </ul>
        <Link to="/logout">logout</Link>
      </div>

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
    </div>
  );
}
