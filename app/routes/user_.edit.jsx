import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { getSession } from "../sessions";
import getCurrentUser from "../utils/getCurrentUser";

import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;
  const currentUser = getCurrentUser(request, token);
  return currentUser;
};

export const action = async ({ request }) => {
  const cookieHeader = await getSession(request.headers.get("Cookie"));
  const token = cookieHeader.data.token;

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
    `${process.env.BASE_URL}/api/users/me/update`,
    fetchConfig
  );
  const data = (await response).json;
  if (data) {
    return redirect(`/user`);
  }
};

export default function UserEdit() {
  const navigate = useNavigate();
  const user = useLoaderData();
  const contact = { ...user };
  return (
    <main className="justify-center">
      <Form id="contact-form" method="post" className="max-w-sm mx-auto">
        <div className="mb-5">
          <div className="flex flex-col ">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              First Name
            </label>
            <input
              defaultValue={contact.first_name}
              aria-label="First name"
              name="first_name"
              id="first_name"
              type="text"
              placeholder={
                contact.first_name ? contact.first_name : "first name"
              }
            />
          </div>
          <div className="flex flex-col ">
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Last Name
            </label>
            <input
              aria-label="Last name"
              defaultValue={contact.last_name}
              name="last_name"
              placeholder={contact.last_name ? contact.last_name : "last name"}
              type="text"
              id="last_name"
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            defaultValue={contact.email}
            name="email"
            id="email"
            placeholder={contact.email}
            type="text"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            User Name
          </label>
          <input
            aria-label="user name"
            defaultValue={contact.username}
            name="username"
            id="username"
            placeholder={contact.username}
            type="text"
          />
        </div>
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
