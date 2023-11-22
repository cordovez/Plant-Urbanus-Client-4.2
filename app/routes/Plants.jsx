import { redirect } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { getSession } from "../sessions";
// import PlantGrid from "../components/PlantGrid";
// const BASE = process.env.BASE_URL;

export const meta = () => {
  return [{ title: "Plants" }];
};

// export async function loader({ request }) {
//   const cookieHeader = await getSession(request.headers.get("Cookie"));

//   // const cookieHeader = request.headers.get("Cookie");
//   const token = cookieHeader.data.token;

//   if (!token) {
//     return redirect("/");
//   }

//   const response = fetch(`${BASE}/api/users/me/plants`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = (await response).json();
//   return data;
// }

export default function Plants() {
  // const data = useLoaderData();
  return (
    <main>
      <Outlet />
      {/* <PlantGrid data={data} /> */}
    </main>
  );
}
