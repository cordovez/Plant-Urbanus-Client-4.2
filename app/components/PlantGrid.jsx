import { NavLink } from "@remix-run/react";

export default function PlantGrid({ data }) {
  return (
    <main className="flex mx-10">
      <ul className="grid gap-4 grid-cols-3 ">
        {data.map((plant) => {
          // console.log(plant);
          return (
            <NavLink to={`${plant._id}`} key={plant._id}>
              {/* <NavLink to={`${plant._id}`} key={plant._id}> */}
              <li>
                {plant.common_name} <span>{plant.images.length}</span>
                <img src={plant.images[0].url} alt="plant"></img>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </main>
  );
}
