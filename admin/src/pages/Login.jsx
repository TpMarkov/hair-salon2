import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Admin");

  const { setAdminToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
          toast.success("Login Successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-40 mb-4"
            src={"/images/logo.png"}
            alt="Admin Logo"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-primary">{state}</span> Login
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-gray-50/30"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-gray-50/30"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-gray-700 py-3.5 rounded-xl font-bold text-lg hover:bg-opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 mt-4 bg-yellow-600/60"
          >
            Login to Dashboard
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Hair Saloon © 2026 Admin Panel
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
