import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import BasicButton from "../components/basicButton";
import getToken from "../utils/getToken";

export const loader = async ({ params, request }) => {
  const BASE = process.env.BASE_URL;
  invariant(params.plantId, "Missing plantId param");
  const plantId = params.plantId;
  const token = await getToken({ request });

  const response = fetch(`${BASE}/api/plants/${plantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();

  return data;
};

export const action = async ({ params, request }) => {
  const token = await getToken({ request });
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
  if (data) {
    return redirect(`/plants/${plantId}`);
  }
};

export default function UserEdit() {
  const plant = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form
      id="contact-form"
      method="post"
      className=" mx-auto mt-20 p-6  bg-green-50 sm:w-full"
    >
      <div className="flex   gap-2">
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
      </div>

      <div className="flex flex-wrap gap-2">
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
      </div>
      <div className="flex gap-2">
        <PlantField
          label="price_paid"
          aria="Price paid"
          defaultValue="0.0"
          id="price_paid"
          placeholder={plant.price_paid ? plant.price_paid : 0}
          type="number"
          name="price_paid"
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
      </div>
      <textarea name="notes" id="notes" cols="30" rows="10"></textarea>
      <p>
        <BasicButton label="Save" name="_action" />

        <BasicButton label="Cancel" onClick={() => navigate(-1)} />
      </p>
    </Form>
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
