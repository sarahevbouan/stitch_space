import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendData } from "../../services/apiServer";
import { handleInputFieldChange } from "../../helpers/utils";
import Form from "./Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email_and_pass, setEmail_and_pass] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isInputFilled = email_and_pass.email && email_and_pass.password;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userDetail = await sendData("/auth/login", email_and_pass);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Logged in");
      userDetail.user.role === "designer"
        ? navigate("/designs")
        : navigate("/collections");
    } catch (error) {
      if (error.message === "Incorrect email or password") {
        toast.error(error.message);
      } else {
        toast.error("An error occured. Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      handleSubmit={handleLogin}
      isLoading={isLoading}
      submitBtnText="Login"
      isSubmitBtnEnabled={isInputFilled}
    >
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email_and_pass.email}
        onChange={(e) => handleInputFieldChange(e, setEmail_and_pass)}
      />
      <label htmlFor="password">Password</label>
      <div className="relative">
        <input
          className="w-full"
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          value={email_and_pass.password}
          onChange={(e) => handleInputFieldChange(e, setEmail_and_pass)}
        />
        {!isPasswordVisible && (
          <FaEyeSlash
            className="absolute top-[30%] right-[10px] cursor-pointer"
            onClick={() => setIsPasswordVisible(true)}
          />
        )}
        {isPasswordVisible && (
          <FaEye
            className="absolute top-[30%] right-[10px] cursor-pointer"
            onClick={() => setIsPasswordVisible(false)}
          />
        )}
      </div>
    </Form>
  );
};

export default LoginForm;
