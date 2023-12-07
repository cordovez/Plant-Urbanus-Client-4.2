import styles from "../tailwind.css";
export const links = () => [{ rel: "stylesheet", href: styles }];

const bgImage = "teemu-paananen-OOE4xAnBhKo-unsplash2.jpg";
const logo = "PlantUrbanusLogo_white.svg";

export default function LoginBackground() {
  return (
    // <div className="flex flex-col  w-full md:flex-row ">
    <div id="left" className="relative">
      <img
        src={bgImage}
        alt="ferns"
        className=" h-64  w-full  sm:h-screen sm:w-full object-none "
      />
      <div className="absolute bottom-0 left-0 sm:top-0 ">
        <img src={logo} alt="PlantUrbanus" className="w-3/4" />
      </div>
    </div>
  );
}
