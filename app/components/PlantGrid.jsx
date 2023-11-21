export default function PlantGrid({ data }) {
  return (
    <ul className="grid gap-4 grid-cols-3 ">
      {data.map((plant) => {
        return (
          <li key={plant.common_name}>
            {plant.common_name} <span>{plant.images.length}</span>
            <img src={plant.images[0].url} alt="plant"></img>
          </li>
        );
      })}
    </ul>
  );
}
