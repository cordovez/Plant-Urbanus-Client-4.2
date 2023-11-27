export default function BasicButton({ label, onClick }) {
  return (
    <button className={button_style} onClick={onClick}>
      {label}
    </button>
  );
}

const button_style =
  "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-10  cursor-pointer";
