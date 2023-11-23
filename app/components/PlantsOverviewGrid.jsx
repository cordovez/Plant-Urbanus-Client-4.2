import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { NavLink } from "@remix-run/react";

export default function PlantGrid({ data }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  return (
    <div className="flex justify-center items-center">
      <ul className="grid gap-2 grid-cols-3 ">
        {data.map((plant) => {
          const coverImage = cld.image(plant.images[0].public_id);
          coverImage.resize(fill().width(200).height(200));
          return (
            <NavLink to={`./${plant._id}`} key={plant._id}>
              <li>
                {plant.common_name} <span>{plant.images.length}</span>
                <div className="">
                  <AdvancedImage cldImg={coverImage} />
                </div>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}
