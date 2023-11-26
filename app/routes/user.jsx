import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import convertDatetime from "../utils/convertDatetime";

export const action = async ({ params, request }) => {
  return redirect(`./edit`);
};

export const loader = async ({ request }) => {
  const BASE = process.env.BASE_URL;

  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

  if (!token) {
    return redirect("/");
  }
  const response = fetch(`${BASE}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response).json();
  return data;
};

export default function User() {
  const userData = useLoaderData();
  const memberDate = convertDatetime(userData.created_at);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  const avatar = cld.image(userData.avatar.public_id);
  avatar
    .resize(thumbnail().width(100).height(100).gravity(focusOn(face())))
    .roundCorners(max())
    .delivery(dpr("2.0"));

  return (
    <main className="justify-center">
      <h1>{userData.username}</h1>
      <div className="mt-10 w-40">
        <AdvancedImage cldImg={avatar} />
      </div>
      <div className="flex flex-col items-start ml-10 mt-20">
        <p>name: {userData.first_name}</p>
        <p>last name: {userData.last_name}</p>
        <p>member since: {memberDate}</p>
        <p>number of plants: {userData.plants.length}</p>
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
