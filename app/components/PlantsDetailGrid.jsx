import { Cloudinary } from "@cloudinary/url-gen";

export default function PlantGrid({ data }) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });
  console.log(data);

  return (
    <div className="flex justify-center items-center">
      <ul className="grid gap-2 grid-cols-3 ">
        {data.map((image) => {
          // const coverImage = cld.image(image[0].public_id);
          // const supportImage = cld.image(image.public_id);
          // coverImage.resize(fill().width(400).height(400));
          // supportImage.resize(fill().width(200).height(200));
          return (
            <div className="mb-20" key={image.public_id}>
              <p>{data.length}</p>
              <p>{image.public_id}</p>
            </div>
            // <li key={supportImage.public_id}>
            //   <div className="">
            //     <AdvancedImage cldImg={coverImage} />
            //   </div>
            //   <div className="">
            //     <AdvancedImage cldImg={supportImage} />
            //   </div>
            // </li>
          );
        })}
      </ul>
    </div>
  );
}
