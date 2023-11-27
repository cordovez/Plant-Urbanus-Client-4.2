import { Outlet } from "@remix-run/react";

export default function Plants() {
  return (
    <main className="">
      {/* <Breadcrumbs /> */}
      <Outlet />
    </main>
  );
}
