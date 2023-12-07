import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PlantDetails from "../components/PlantDetails";
import PlantDetailGrid from "../components/PlantsDetailGrid";
import BasicButton from "../components/basicButton";
import convertDatetime from "../utils/convertDatetime";
import getToken from "../utils/getToken";

export const loader = async ({ request, params }) => {
  invariant(params.plantId, "Missing plantId param");
  const BASE = process.env.BASE_URL;
  const plantId = params.plantId;
  const token = await getToken({ request });

  if (!token) {
    return redirect("/Login");
  }
  const response = fetch(`${BASE}/api/plants/${plantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();
  return data;
};

export const action = async ({ request, params }) => {
  const BASE = process.env.BASE_URL;
  const plantId = params.plantId;
  const token = await getToken({ request });
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  if (_action === "upload") {
    const newPhotoName = "update photo";
    formData.append("file", formData.get("file"), newPhotoName);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };

    const response = await fetch(
      `${BASE}/api/plants/${plantId}/add-image/`,
      requestOptions
    );
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));
    if (!response.ok) {
      if (response.status === 413) {
        console.log(
          "File size exceeds the limit. Please choose a smaller file."
        );
      } else {
        console.log("An error occurred:", response.statusText);
        console.log("Error Status:", response.status);
      }
    } else {
      const result = await response.text();
      console.log(result);
    }
    return redirect(`.`);
  }

  if (_action === "delete") {
    const dbResponse = await fetch(`${BASE}/api/plants/delete/${plantId}`, {
      method: "DELETE",
      headers: myHeaders,
    });
    if (dbResponse) {
      return redirect("/plants");
    }
  }

  if (_action === "edit") {
    return redirect(`./edit`);
  }
};

export default function Plant() {
  const data = useLoaderData();
  const actionResponse = useActionData();
  const plantPhotos = data.images;
  const dateOfPurchase = convertDatetime(data.created_at);
  const actionData = useActionData();
  return (
    <>
      <div className="flex flex-col justify-start  p-1 overflow-y-auto sm:gap-4 sm:flex-row sm:mt-5 ">
        <PlantDetailGrid data={plantPhotos} />
        <div className="flex flex-col  border-solid border  border-black p-2  rounded-md h-full sm:max-w-sm ">
          {/* //////////////// Plant Details */}
          <PlantDetails data={data} dateOfPurchase={dateOfPurchase} />
          <Form method="post">
            <BasicButton label="Edit" name="_action" value="edit" />
          </Form>
          <div className="flex">
            <Form method="post" encType="multipart/form-data" reloadDocument>
              {/* //////////////// Add image */}
              <h2>Add update image</h2>
              <div className="flex flex-col">
                <label htmlFor="add" className="block">
                  <input
                    type="file"
                    id="add"
                    name="file"
                    accept="image/*"
                    className=" block  text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100 bg-white border-none "
                  />
                </label>
                <BasicButton
                  label="Upload"
                  name="_action"
                  value="upload"
                  type="submit"
                />
              </div>
            </Form>
          </div>
          <div className="flex flex-col mt-4 ">
            <hr />
            <p>
              Warning: hitting the delete button will erase all photos and
              information regarding this plant. This is irreversible.
            </p>
            <Form method="delete">
              {/* uderscore in "_action" is important otherwise a different name also works */}
              <BasicButton
                label="Delete Plant"
                name="_action"
                value="delete"
                alert={true}
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
