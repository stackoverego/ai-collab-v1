import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/usercontext";
import { useContext } from "react";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const SubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/auth/user/register", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-4xl border border-slate-800 bg-slate-900/95 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.75)]">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Welcome </p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-50">Create your account</h1>
          <p className="mt-3 text-slate-400">Enter your email and password to continue.</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_15px_30px_rgba(34,211,238,0.25)] transition hover:bg-cyan-400"
          >
            Sign up
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
