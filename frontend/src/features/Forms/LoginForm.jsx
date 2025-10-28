import { useContext, useState } from "react";
import { sendData } from "../../services/apiServer";
import Form from "./Form";
import { UserContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";
import { handleInputFieldChange } from "../../helpers/utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email_and_pass, setEmail_and_pass] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const formData = new FormData();
    // formData.append("email", email_and_pass.email);
    // formData.append("password", email_and_pass.password);
    // console.log(formData);
    try {
      const userDetail = await sendData("/auth/login", email_and_pass);
      setUserDetails(userDetail);
      userDetail.user.role === "designer"
        ? navigate("/designs")
        : navigate("/collections");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      handleSubmit={handleLogin}
      error={error}
      isLoading={isLoading}
      submitBtnText="Login"
    >
      <label htmlFor="email">Email</label>
      <input
        required
        type="text"
        name="email"
        value={email_and_pass.email}
        onChange={(e) => handleInputFieldChange(e, setEmail_and_pass)}
      />
      <label htmlFor="password">Password</label>
      <input
        required
        type="password"
        name="password"
        value={email_and_pass.password}
        onChange={(e) => handleInputFieldChange(e, setEmail_and_pass)}
      />
    </Form>
  );
};

export default LoginForm;
