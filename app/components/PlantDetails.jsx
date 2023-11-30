export default function PlantDetails({ data, dateOfPurchase }) {
  const plantName = data.common_name.toUpperCase();
  return (
    <div>
      <h1 className="p-8">{plantName ? plantName : ""}</h1>

      <p>
        <span className="font-bold">date of purchase:</span>{" "}
        {dateOfPurchase ? dateOfPurchase : ""}
      </p>
      <p>
        <span className="font-bold">scientific name:</span>{" "}
        {data.scientific_name ? data.scientific_name : ""}
      </p>
      <p>
        <span className="font-bold">substrate:</span>{" "}
        {data.substrate ? data.substrate : ""}
      </p>
      <p>
        <span className="font-bold">pest treatment:</span>{" "}
        {data.pest_treatment ? data.pest_treatment : ""}
      </p>
      <p>
        <span className="font-bold">nutrients:</span>{" "}
        {data.nutrients ? data.nutrients : ""}
      </p>
      <p>
        <span className="font-bold">notes:</span> {data.notes ? data.notes : ""}
      </p>
      <p>
        <span className="font-bold">price:</span> €
        {data.price_paid ? data.price_paid : ""}
      </p>
    </div>
  );
}
