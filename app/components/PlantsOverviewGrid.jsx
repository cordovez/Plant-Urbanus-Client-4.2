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
    <ul className="flex flex-wrap justify-center gap-2 space-x-2 mx-auto">
      {data.map((plant) => {
        const coverImage = cld.image(plant.images[0].public_id);
        coverImage.resize(fill().width(200).height(200));
        return (
          <NavLink to={`./${plant._id}`} key={plant._id}>
            <li className="w-40 h-40 my-6">
              {plant.common_name}{" "}
              <div
                className={
                  plant.images.length > 1 ? "visible relative" : "invisible"
                }
              >
                <div className="absolute  inline-flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 sm:w-6 sm:h-6 sm:text-xs">
                  {plant.images.length}
                </div>
              </div>
              <div className="">
                <AdvancedImage cldImg={coverImage} />
              </div>
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
}
