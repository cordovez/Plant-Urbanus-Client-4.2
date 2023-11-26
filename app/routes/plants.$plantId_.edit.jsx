import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getSession } from "../sessions";

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

export const action = async ({ params, request }) => {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;
  const plantId = params.plantId;

  let formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const fetchConfig = {
    method: "POST",
    body: JSON.stringify(updates),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = fetch(
    `${process.env.BASE_URL}/api/plants/update/${plantId}`,
    fetchConfig
  );
  const data = (await response).json;
  console.log("******************************");
  console.log(plantId);
  console.log(updates);
  console.log("*****************************");
  if (data) {
    return redirect(`/plants/${plantId}`);
  }
};

export default function UserEdit() {
  const plant = useLoaderData();
  const navigate = useNavigate();
  return (
    <main className="justify-center ">
      <Form id="contact-form" method="post" className="max-w-sm mx-auto">
        <PlantField
          label="common_name"
          aria="common name"
          defaultValue={plant.common_name}
          id="common_name"
          placeholder={plant.common_name}
          type="text"
          name="common_nam"
        />
        <PlantField
          label="scientific_name"
          aria="Scientific Name"
          defaultValue={plant.scientific_name}
          id="scientific_name"
          placeholder={plant.scientific_name}
          type="text"
          name="scientific_name"
        />

        <PlantField
          label="pest_treatment"
          aria="Pest Treatment"
          defaultValue={plant.pest_treatment}
          id="pest_treatment"
          placeholder={plant.pest_treatment}
          type="text"
          name="pest_treatment"
        />
        <PlantField
          label="substrate"
          aria="substrate"
          defaultValue={plant.substrate}
          id="substrate"
          placeholder={plant.substrate}
          type="text"
          name="substrate"
        />
        <PlantField
          label="nutrients"
          aria="Nutrients"
          defaultValue={plant.nutrients}
          id="nutrients"
          placeholder={plant.nutrients}
          type="text"
          name="nutrients"
        />
        <PlantField
          label="notes"
          aria="Notes"
          defaultValue={plant.notes}
          id="notes"
          placeholder={plant.notes}
          type="text"
          name="notes"
        />
        <PlantField
          label="purchased_at"
          aria="Place of purchase"
          defaultValue={plant.purchased_at}
          id="purchased_at"
          placeholder={plant.purchased_at}
          type="text"
          name="purchased_at"
        />
        <PlantField
          label="price_paid"
          aria="Price paid"
          defaultValue={plant.price_paid}
          id="price_paid"
          placeholder={plant.price_paid ? plant.price_paid : 0}
          type="number"
          name="price_paid"
        />
        <p>
          <button type="submit">Save</button>
          <button onClick={() => navigate(-1)} type="button">
            Cancel
          </button>
        </p>
      </Form>
    </main>
  );
}

export function PlantField({
  label,
  aria,
  defaultValue,
  id,
  placeholder,
  type,
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        aria-label={aria}
        defaultValue={defaultValue}
        name={id}
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}
