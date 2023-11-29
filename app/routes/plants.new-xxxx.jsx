// // import { redirect } from "@remix-run/node";
// import {
//   unstable_createFileUploadHandler,
//   unstable_parseMultipartFormData,
// } from "@remix-run/node";
// import { Form } from "@remix-run/react";
// import BasicButton from "../components/basicButton";
// // import { getSession } from "../sessions";
// import getToken from "../utils/getToken";

// async function uploadToApi(BASEURL, token, plantName, data) {
//   const fetchConfig = {
//     method: "POST",
//     body: data,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   console.log(fetchConfig);

//   const imageUploaded = await fetch(
//     `${BASEURL}/api/users/me/add-plant?plant_name=${plantName}`,
//     fetchConfig
//   );
//   return imageUploaded;
// }
// export const loader = () => ({
//   title: "Remix Upload",
// });
// export const action = async ({ request }) => {
//   const BASEURL = process.env.BASE_URL;
//   const token = await getToken({ request });

//   const handler = unstable_createFileUploadHandler({
//     // file: ({ filename }) => filename,
//     maxFileSize: 50_000_000,
//   });

//   const formData = await unstable_parseMultipartFormData(request, handler);
//   // formData.set("file", formData.get("file"), "somenameFromForm"); // Use "file" as the field name
//   formData.append("file", formData.get("file"), "IMG_0260.HEIC");

//   const file = formData.get("file");

//   console.log("___________FORM DATA____________");
//   console.log(file);
//   const uploaded = uploadToApi(BASEURL, token, "testNameJc", file);

//   return uploaded;
// };

// export default function NewPlant() {
//   return (
//     <main>
//       <h1>Add a New Plant</h1>
//       <Form method="post" encType="multipart/form-data">
//         <div className="flex flex-col mt-20">
//           <label htmlFor="plant-name"> common name</label>
//           <input
//             type="text"
//             placeholder="plant name"
//             id="plant-name"
//             name="plant-name"
//           />
//         </div>
//         <label htmlFor="img">Choose a file:</label>

//         <input type="file" id="img" name="file" accept="image/*" />
//         {/* <button> upload</button> */}
//         <BasicButton label="upload photo" />
//       </Form>
//     </main>
//   );
// }
import { unstable_createFileUploadHandler } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import getToken from "../utils/getToken";

async function uploadToApi(BASEURL, token, plantName, data) {
  const fetchConfig = {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const imageUploaded = await fetch(
    `${BASEURL}/api/users/me/add-plant?plant_name=${plantName}`,
    fetchConfig
  );
  console.log(fetchConfig);

  return imageUploaded;
}

export const loader = () => ({
  title: "Remix Upload",
});

export const action = async ({ request }) => {
  const BASEURL = process.env.BASE_URL;
  const token = await getToken({ request });

  const handler = unstable_createFileUploadHandler({});

  // const formData = await unstable_parseMultipartFormData(request, handler);
  // formData.append("file", formData.get("file"), "IMG_0260.HEIC");

  const formData = await request.formData();
  const file = formData.get("file");

  formData.append("file", file, "IMG_0260.HEIC");

  const apiResponse = await uploadToApi(
    BASEURL,
    token,
    "myPlantyPlant",
    formData
  );

  // const entries = Object.fromEntries(formData);
  return apiResponse;
  // return {
  //   url: `/uploads/${file.name}`,
  //   size: file.size,
  //   name: file.name,
  // };
};
export default function NewPlant() {
  const { title } = useLoaderData();
  const actionData = useActionData();

  return (
    <div>
      <h1>{title}</h1>
      <Form method="post" encType="multipart/form-data">
        <label>
          Select file: <input type="file" name="file" />
        </label>
        <button type="submit">Upload</button>
      </Form>
      {actionData && (
        <div>
          <img
            src={actionData.url}
            style={{ maxWidth: "100vw" }}
            alt={actionData.name}
            className="w-400 h-400"
          />
          <p>File Name: {actionData.name}</p>
          <p>File size: {Math.round(actionData.size / 1024)} KB</p>
        </div>
      )}
    </div>
  );
}
