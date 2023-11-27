import { Outlet } from "@remix-run/react";
import Breadcrumbs from "../components/breadcrumbs";

export default function Plants() {
  return (
    <main className="">
      <Breadcrumbs />
      <Outlet />
    </main>
  );
}
