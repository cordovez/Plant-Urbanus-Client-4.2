import { redirect } from "@remix-run/node";
import { Form, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import BasicButton from "../components/basicButton";
import getToken from "../utils/getToken";

export const action = async ({ request }) => {
  const BASEURL = process.env.BASE_URL;
  const token = await getToken({ request });
  const myHeaders = new Headers();
  let formData = await request.formData();

  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };
  const newPlantName = formData.get("new-plant-name");
  formData.append("file", formData.get("file"), newPlantName);

  const response = await fetch(
    `${BASEURL}/api/users/me/add-plant?plant_name=${newPlantName}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  if (response) {
    return redirect("/plants");
  }
};

export default function NewPlant() {
  return (
    <main>
      <h1>Add a New Plant</h1>
      <Form method="post" encType="multipart/form-data">
        <div className="flex flex-col mt-20">
          <label htmlFor="img">Choose a File:</label>
          {/* ATTENTION: name in the file input *must* be 'file' */}
          <input type="file" id="img" name="file" accept="image/*" />
        </div>

        <div className="flex flex-col mt-20">
          <label htmlFor="new-plant-name">New Plant Name</label>
          <input
            type="text"
            placeholder="Name"
            id="new-plant-name"
            name="new-plant-name"
          />
        </div>
        <BasicButton label="Upload Photo" type="submit" />
      </Form>
    </main>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
