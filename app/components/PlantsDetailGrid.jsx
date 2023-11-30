import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function PlantDetailGrid({ data }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  return (
    <ul className="flex flex-wrap justify-start mb-4">
      {data.map((image) => {
        const supportImage = cld.image(image.public_id);
        supportImage.resize(fill().width(250).height(250));
        return (
          <li key={image.public_id} className="mx-1 my-1 w-36 sm:w-52 ">
            <AdvancedImage cldImg={supportImage} />
          </li>
        );
      })}
    </ul>
  );
}
