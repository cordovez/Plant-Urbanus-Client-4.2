// import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import BasicButton from "../components/basicButton";
import { getSession } from "../sessions";
// import getToken from "../utils/getToken";

export const action = async ({ request }) => {
  const BASEURL = process.env.BASE_URL;
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var formdata = new FormData();
  formdata.append("file", request.files, "IMG_9700.jpeg");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "http://localhost:8000/api/users/me/add-plant?plant_name=test plant",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  return "";
};

export default function NewPlant() {
  return (
    <main>
      <h1>Add a New Plant</h1>
      <Form method="post" encType="multipart/form-data">
        {/* <div className="flex flex-col mt-20">
          <label htmlFor="plant-name"> common name</label>
          <input
            type="text"
            placeholder="plant name"
            id="plant-name"
            name="plant-name"
          />
        </div> */}
        <label htmlFor="img">Choose a file:</label>

        <input type="file" id="img" name="img" accept="image/*" />
        {/* <button> upload</button> */}
        <BasicButton label="upload photo" />
      </Form>
    </main>
  );
}
