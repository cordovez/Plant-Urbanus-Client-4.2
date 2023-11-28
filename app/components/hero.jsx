export default function Hero() {
  const bgImage = "teemu-paananen-OOE4xAnBhKo-unsplash2.jpg";
  const logo = "PlantUrbanusLogo_white.svg";
  return (
    <div id="left" className="relative ">
      <div className="flex h-40 sm:h-80">
        <img src={bgImage} alt="ferns" className="object-none w-full  " />
      </div>
      <div className="absolute bottom-0 right-0 w-3/4 sm:w-1/2">
        <img src={logo} alt="PlantUrbanus" />
      </div>
    </div>
  );
}
