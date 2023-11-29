// import { redirect } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import BasicButton from "../components/basicButton";
// import { getSession } from "../sessions";
import getToken from "../utils/getToken";

async function uploadToApi(BASEURL, token, plantName, data) {
  const fetchConfig = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: data,
  };

  const imageUploaded = await fetch(
    `${BASEURL}/api/users/me/add-plant?plant_name=${plantName}`,
    fetchConfig
  );
  return imageUploaded;
}

export const action = async ({ request }) => {
  const BASEURL = process.env.BASE_URL;
  const token = await getToken({ request });
  // const cookieHeader = await getSession(request.headers.get("Cookie"));
  // const token = cookieHeader.data.token;

  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      if (name !== "file") {
        return null;
      }
      const uploadedImage = await uploadToApi(
        BASEURL,
        token,
        "test name",
        data
      );
      return uploadedImage;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const fields = Object.fromEntries(formData);
  console.log(fields);
  return "";
};

export default function NewPlant() {
  return (
    <main>
      <h1>Add a New Plant</h1>
      <Form method="post" encType="multipart/form-data">
        <div className="flex flex-col mt-20">
          <label htmlFor="plant-name"> common name</label>
          <input
            type="text"
            placeholder="plant name"
            id="plant-name"
            name="plant-name"
          />
        </div>
        <label htmlFor="img">Choose a file:</label>

        <input type="file" id="img" name="file" accept="image/*" />
        {/* <button> upload</button> */}
        <BasicButton label="upload photo" />
      </Form>
    </main>
  );
}
