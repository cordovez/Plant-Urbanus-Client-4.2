import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PlantDetailGrid from "../components/PlantsDetailGrid";
import BasicButton from "../components/basicButton";
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
      <h1>Plant details</h1>
      <h2>{data.common_name ? data.common_name : ""}</h2>

      <div className="flex mx-auto  w-11/12 ">
        <PlantDetailGrid data={plantPhotos} />
      </div>

      <div>
        <p>
          <span className="font-bold">date of purchase:</span>{" "}
          {dateOfPurchase ? dateOfPurchase : ""}
        </p>
        <p>
          <span className="font-bold">scientific name:</span>{" "}
          {data.scientific_name ? data.scientific_name : ""}
        </p>
        <p>
          <span className="font-bold">substrate:</span>{" "}
          {data.substrate ? data.substrate : ""}
        </p>
        <p>
          <span className="font-bold">pest treatment:</span>{" "}
          {data.pest_treatment ? data.pest_treatment : ""}
        </p>
        <p>
          <span className="font-bold">nutrients:</span>{" "}
          {data.nutrients ? data.nutrients : ""}
        </p>
        <p>
          <span className="font-bold">notes:</span>{" "}
          {data.notes ? data.notes : ""}
        </p>
        <p>
          <span className="font-bold">price:</span> €
          {data.price_paid ? data.price_paid : ""}
        </p>
      </div>
      <Form method="post">
        <BasicButton label="Edit" />
      </Form>
    </main>
  );
}

export const handle = {
  // const data = useLoaderData()
  breadcrumb: () => {
    return <Link to={`/plant/detail`}>Child Route</Link>;
  },
};
