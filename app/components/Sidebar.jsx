import { Link } from "@remix-run/react";
export default function Sidebar() {
  return (
    <div className=" w-1/4 bg-gray-100 flex-col h-vh p-4">
      <ul>
        <li>User profile</li>
        <li>Plant List</li>
      </ul>
      <Link to="/logout">logout</Link>
    </div>
  );
}
