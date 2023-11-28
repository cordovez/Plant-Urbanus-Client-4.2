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
    <ul className="flex flex-wrap justify-start mb-20">
      {data.map((image) => {
        const supportImage = cld.image(image.public_id);
        supportImage.resize(fill().width(200).height(200));
        return (
          <li key={image.public_id} className="mx-2 my-2 ">
            <AdvancedImage cldImg={supportImage} />
          </li>
        );
      })}
      <li className="flex flex-col justify-center items-center my-2 mx-2">
        <div className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5  text-center me-2  cursor-pointer w-48 h-48 flex justify-center items-center">
          <h1>Add photo</h1>
        </div>{" "}
      </li>
    </ul>
  );
}
