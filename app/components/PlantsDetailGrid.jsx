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
export function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}
