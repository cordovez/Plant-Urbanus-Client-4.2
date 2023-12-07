import { useState } from "react";
export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  // const data = useLoaderData();
  const handleInputChange = (name, value) => {
    const lowercasedValue = name === "username" ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: lowercasedValue });
  };
  return (
    <div className=" justify-center items-center flex flex-col gap-y-5  ">
      <form method="POST" className=" p-10 max-w-sm sm:max-w-lg">
        <h2 className="text-xl font-extrabold text-white mb-5">Register</h2>
        <p className="text-white mb-10">
          Although this is intended as a personal portfolio app, be aware that
          your registration details will be saved on database.
        </p>
        <p className="text-white mb-10">
          You will be redirected to log in after you register.
        </p>
        <label htmlFor="email" className="text-slate-300 ">
          email
          <input
            type="text"
            name="email"
            className="w-full p-2 rounded-xl my-2 border border-gray-300 text-slate-700"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </label>
        <label htmlFor="username" className="text-slate-300 ">
          User name
          <input
            type="text"
            name="username"
            value={formData.username}
            className="w-full p-2 rounded-xl my-2 border border-gray-300 text-slate-700"
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </label>
        <label htmlFor="password" className="text-slate-300 ">
          Password
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded-xl my-2 border border-gray-300 text-slate-700"
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </label>
        <button
          type="submit"
          name="_action"
          value="Register"
          className="w-full rounded-xl mt-2 bg-green-900 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
