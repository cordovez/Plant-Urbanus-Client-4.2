export default function convertDatetime(datetimeString) {
  const datetime = new Date(datetimeString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = datetime.toLocaleDateString("en-GB", options);

  return formattedDate;
}
