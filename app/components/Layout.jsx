import { Outlet } from "@remix-run/react";
import Sidebar from "../components/Sidebar";
import Hero from "../components/hero";

export default function Layout() {
  return (
    <>
      <Hero />
      <div className="flex">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
