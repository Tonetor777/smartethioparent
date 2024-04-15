import { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await login(email, password);
  };

  return (
    <section className="flex flex-col md:flex-row justify-center mt-20 bg-slate-100 w-[90%] p-5 mx-auto">
      <div className="flex flex-col rounded-lg w-full md:w-96 md:h-64 mb-8 md:mb-0 md:mr-8">
        <h2 className="text-black text-2xl font-bold mb-4 md:mb-9 pl-0">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-2 md:mt-4 w-full"
            />
          </div>
          <div className="mb-3 flex justify-between items-center">
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mt-1 w-full mb-8"
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 w-full flex justify-center font-bold"
            >
              LOGIN
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <div className="hidden md:block">
        <img
          src="/src/assets/kidStudying.png"
          alt="Kid studying with parent"
          className="w-[250px] h-[200px] md:w-[530px] md:h-[420px] mr-8"
        />
      </div>
    </section>
  );
}

export default Login;
