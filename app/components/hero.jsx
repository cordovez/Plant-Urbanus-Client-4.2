import logo from "../../public/PlantUrbanusLogo_white.svg";
import background from "../../public/teemu-paananen-OOE4xAnBhKo-unsplash2.jpg";

export default function Hero() {
  return (
    <div id="left" className="relative ">
      <div className="flex h-40 sm:h-80">
        <img src={background} alt="ferns" className="object-none w-full  " />
      </div>
      <div className="absolute bottom-0 right-0 w-3/4 sm:w-1/2">
        <img src={logo} alt="PlantUrbanus" />
      </div>
    </div>
  );
}
