import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getSession } from "../sessions";

const BASE = process.env.BASE_URL;

export const loader = async ({ params, request }) => {
  invariant(params.plantId, "Missing plantId param");
  const plantId = params.plantId;
  const cookieHeader = await getSession(request.headers.get("Cookie"));

  // const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/");
  }

  const response = fetch(`${BASE}/api/plants/${plantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();
  return data;
};

export default function Plant() {
  const data = useLoaderData();
  const plantPhotos = data.images;
  console.log(data);
  return (
    <main>
      <div>
        {plantPhotos.map((photo) => {
          return (
            <div key={photo.public_id}>
              <img src={photo.url} alt="" />
              <small>{photo.photo_date}</small>
            </div>
          );
        })}
      </div>
      <div>
        <p>common name: {data.common_name ? data.common_name : ""}</p>
        <p>
          date of purchase: {data.date_of_purchase ? data.date_of_purchase : ""}
        </p>
        <p>
          scientific name: {data.scientific_name ? data.scientific_name : ""}
        </p>
        <p>substrate: {data.substrate ? data.substrate : ""}</p>
        <p>pest treatment: {data.pest_treatment ? data.pest_treatment : ""}</p>
        <p>nutrients: {data.nutrients ? data.nutrients : ""}</p>
        <p>notes: {data.notes ? data.notes : ""}</p>
      </div>
    </main>
  );
}
