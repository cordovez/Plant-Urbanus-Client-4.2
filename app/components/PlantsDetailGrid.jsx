import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
export default function PlantGrid({ data }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  return (
    <ul className="  space-y-2 gap-2  flex-wrap">
      {data.map((image) => {
        const supportImage = cld.image(image.public_id);
        supportImage.resize(fill().width(200).height(200));
        return (
          <li key={supportImage.public_id}>
            <AdvancedImage cldImg={supportImage} />
          </li>
        );
      })}
    </ul>
  );
}
