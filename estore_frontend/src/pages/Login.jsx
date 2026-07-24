import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const submit = async (data) => {
    await handleLogin(data);
    navigate("/home");
  };

  return <LoginForm onSubmit={submit} />;
};

export default Login;