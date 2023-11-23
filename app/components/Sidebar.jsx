import { NavLink } from "@remix-run/react";
export default function Sidebar() {
  return (
    <div className="flex flex-col w-16  h-screen justify-start sm:w-60 ">
      <div className="flex items-center justify-center h-full bg-slate-700">
        <ul className="text-slate-500 space-y-10">
          <li className={listItemStyles}>
            <NavItem
              icon={userIcon}
              label="Profile"
              activeLink={activeLink}
              destination="user"
            />
          </li>
          <li className={listItemStyles}>
            <NavItem
              icon={photoIcon}
              label="Plants"
              activeLink={activeLink}
              destination="./plants"
            />
          </li>
          <li className={listItemStyles}>
            <NavItem
              icon={logoutIcon}
              label="Log out"
              activeLink={activeLink}
              destination="logout"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export function NavItem({ icon, label, activeLink, destination }) {
  return (
    <div className="flex  justify-center">
      <NavLink
        className={({ isActive, isPending }) =>
          isActive ? activeLink : isPending ? "pending " : ""
        }
        to={destination}
      >
        <div>{icon}</div>
        <p className="invisible sm:visible sm:ml-4"> {label} </p>
      </NavLink>
    </div>
  );
}
const listItemStyles = "flex flex-row   hover:text-white  hover:bg-slate-800";
const activeLink = "bg-slate-600";

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const photoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
);
const logoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
    />
  </svg>
);
