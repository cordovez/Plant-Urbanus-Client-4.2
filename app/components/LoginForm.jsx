import { useState } from "react";
export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  // const data = useLoaderData();
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className=" justify-center items-center flex flex-col gap-y-5  ">
      <form method="POST" className=" p-10 max-w-sm sm:max-w-lg">
        <h2 className="text-xl font-extrabold text-white mb-5">Login</h2>
        <label htmlFor="username" className="text-slate-300 ">
          User name
          <input
            type="text"
            name="username"
            className="w-full p-2 rounded-xl my-2 border border-gray-300 text-slate-700"
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </label>
        <label htmlFor="password" className="text-slate-300 ">
          Password
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded-xl my-2 border border-gray-300"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </label>
        <button
          type="submit"
          name="_action"
          value="Sign In"
          className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
        >
          login
        </button>
      </form>
    </div>
  );
}
