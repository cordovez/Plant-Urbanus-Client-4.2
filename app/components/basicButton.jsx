export default function BasicButton({ label, onClick, name, value, alert }) {
  return (
    <button
      type="submit"
      className={!alert ? button_style : alert_style}
      onClick={onClick}
      name={name}
      value={value}
    >
      {label}
    </button>
  );
}

const button_style =
  "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  cursor-pointer ";
const alert_style =
  "text-white hover:text-white border border-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  cursor-pointer bg-red-500 ";
