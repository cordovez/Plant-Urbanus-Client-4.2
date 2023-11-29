// import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import BasicButton from "../components/basicButton";
import { getSession } from "../sessions";
// import getToken from "../utils/getToken";

export const action = async ({ request }) => {
  const BASEURL = process.env.BASE_URL;
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

  let formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // const plantName = updates["plant_name"]; // Use the correct form field name

  console.log(updates);
  formData.append("file", updates["img"], updates["plantName"]); // Adjust for your specific form field names

  const fetchConfig = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(
      `${BASEURL}/api/users/me/add-plant`,
      fetchConfig
    );

    if (response.ok) {
      // Handle successful response
      console.log("Plant added successfully!");
      // navigate("/plants"); // Redirect to the plants page or wherever you want
    } else {
      // Handle error response
      console.error("Error adding plant:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding plant:", error.message);
  }
  // console.log(inputs);

  // const uploadHandler = unstable_composeUploadHandlers(
  //   async ({ name, contentType, data, filename }) => {
  //     if (name !== "img") {
  //       return null;
  //     }
  //   },
  //   // fallback to memory for everything else
  //   unstable_createMemoryUploadHandler()
  // );

  // const formData = await unstable_parseMultipartFormData(
  //   request,
  //   uploadHandler
  // );
  // const fetchConfig = {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // };
  // let filename = "test 2";
  // const uploadedImage = await fetch(
  //   `${BASEURL}/api/users/me/add-plant?plant_name=${filename}`,
  //   fetchConfig
  // );
  // const uploadedImage = await uploadImageToCloudinary(data);
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

        <input type="file" id="img" name="img" accept="image/*" />
        {/* <button> upload</button> */}
        <BasicButton label="upload photo" />
      </Form>
    </main>
  );
}
