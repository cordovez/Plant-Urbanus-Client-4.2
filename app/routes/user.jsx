import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import getToken from "../utils/getToken";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import BasicButton from "../components/basicButton";
import convertDatetime from "../utils/convertDatetime";

export const action = async ({ params, request }) => {
  return redirect(`./edit`);
};

export const loader = async ({ request }) => {
  const BASE = process.env.BASE_URL;
  const token = await getToken({ request });

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
    <>
      <div className="mt-10 w-40 flex flex-wrap justify-center">
        <AdvancedImage cldImg={avatar} />
        <h1 className="font-bold">{userData.username}</h1>
      </div>
      <div className="flex flex-col items-start ml-10 my-10">
        <p>
          <span className="font-bold">name:</span> {userData.first_name}
        </p>
        <p>
          <span className="font-bold">last name: </span>
          {userData.last_name}
        </p>
        <p>
          <span className="font-bold">member since:</span> {memberDate}
        </p>
        <p>
          <span className="font-bold">number of plants:</span>{" "}
          {userData.plants.length}
        </p>
      </div>
      <Form method="post">
        <BasicButton label="Edit" />
      </Form>
    </>
  );
}
