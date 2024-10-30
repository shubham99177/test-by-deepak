// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Import login action from authSlice
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; // Import toast


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields"); // Use toast instead of alert
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/login",
        { email, password },
        config
      );

      // Log in successfully, save token to localStorage and Redux
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.userid);
      dispatch(login(data.token)); // Update Redux state with the token

      // Redirect to protected /shop route
      navigate("/shop");
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message); // Display specific backend error (e.g., "User already exists")
      } else {
        toast.error("Something went wrong."); // Use toast instead of alert
    }
  };
  };
  return (
    <div className="w-full max-w-md mx-auto lg:w-1/2 flex items-center justify-center h-screen p-4">
      <ToastContainer />
      <div className="w-full px-6 lg:px-12">
        <h3 className="block md:hidden text-3xl lg:text-4xl font-bold text-center mb-2">
          Welcome Back to <span className="text-cyan-400 shadow-cyan-500/50 hover:text-cyan-600">Scatch</span>
        </h3>

        <h4 className="text-xl lg:text-2xl mb-5 text-center">
          Login to your Account
        </h4>
        <form autoComplete="off" onSubmit={submitHandler}>
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border rounded-md mb-3"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border rounded-md mb-3"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full py-2 mt-2 bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white font-semibold rounded-full cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

