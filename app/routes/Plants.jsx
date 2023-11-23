import { Outlet } from "@remix-run/react";

export default function Plants() {
  return (
    <main>
      <div className="flex flex-col items-center justify-start mt-10">
        <h1>My Plants</h1>
        <Outlet />
      </div>
    </main>
  );
}
