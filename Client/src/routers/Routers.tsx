import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";

import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";
import SignOut from "@/pages/auth/SignOut";

import Dashboard from "@/pages/User/Dashboard";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-out" element={<SignOut />} />
        <Route path="/users/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default Routers;
