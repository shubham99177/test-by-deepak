// Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";


import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Make sure to import the login action

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/register",
        { fullname, email, password },
        config
      );

      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.userid);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(login(data.token)); // Dispatch the login action

      console.log("Redirecting to /shop...");
      navigate("/shop");
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message); // Display specific backend error (e.g., "User already exists")
      } else {
        toast.error("Something went wrong.");
      }
    }
  };




  
  return (
    <div className="w-full max-w-md mx-auto lg:w-1/2 flex items-center justify-center h-screen p-4">
         <ToastContainer />
      <div className="w-full px-6 lg:px-12">
        <h3 className="text-3xl lg:text-4xl font-bold text-center mb-2">
          Welcome to <span className="text-cyan-400 shadow-cyan-500/50 hover:text-cyan-600">Scatch</span>
        </h3>
        <h4 className="text-xl lg:text-2xl mb-5 text-center">
          Create your account
        </h4>
        <form autoComplete="off" onSubmit={submitHandler}>
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border rounded-md mb-3"
            type="text"
            placeholder="Full Name"
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
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
            value="Create Account"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
