import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/check-user`, { username, password });
      if (response.data.exist) {
        setShowError(false);
        navigate("/todo");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setShowError(true);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-pink-600 to-pink-300">
      {/* Main Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-900">lee heeseung</h1>

        {/* Error Message */}
        {showError && (
          <div className="bg-red-100 text-pink-500 p-3 rounded-lg text-center font-medium">
            Invalid username or password
          </div>
        )}

        {/* Username Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-gray-700 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            aria-label="Username"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            aria-label="Password"
          />
        </div>

        {/* Login Button */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default App;