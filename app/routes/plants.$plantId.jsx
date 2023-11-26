import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PlantDetailGrid from "../components/PlantsDetailGrid";
import { getSession } from "../sessions";
import convertDatetime from "../utils/convertDatetime";

export const action = async ({ params, request }) => {
  return redirect(`./edit`);
};

export const loader = async ({ params, request }) => {
  const BASE = process.env.BASE_URL;
  invariant(params.plantId, "Missing plantId param");
  const plantId = params.plantId;
  const cookieHeader = await getSession(request.headers.get("Cookie"));

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
  const dateOfPurchase = convertDatetime(data.created_at);

  return (
    <main className="">
      <h1>{data.common_name ? data.common_name : ""}</h1>

      <div className="flex mx-auto  bg-green-200  ">
        <PlantDetailGrid data={plantPhotos} />
      </div>

      <div>
        <p>date of purchase: {dateOfPurchase ? dateOfPurchase : ""}</p>
        <p>
          scientific name: {data.scientific_name ? data.scientific_name : ""}
        </p>
        <p>substrate: {data.substrate ? data.substrate : ""}</p>
        <p>pest treatment: {data.pest_treatment ? data.pest_treatment : ""}</p>
        <p>nutrients: {data.nutrients ? data.nutrients : ""}</p>
        <p>notes: {data.notes ? data.notes : ""}</p>
        <p>price: €{data.price_paid ? data.price_paid : ""}</p>
      </div>
      <Form method="post">
        <button type="submit" className={buttonStyle}>
          Edit
        </button>
      </Form>
    </main>
  );
}
const buttonStyle =
  "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800";
