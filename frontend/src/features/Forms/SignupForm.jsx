import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleInputFieldChange } from "../../helpers/utils";
import { sendData } from "../../services/apiServer";
import Form from "./Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = ({ role }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorObj, setErrorObj] = useState({});
  const [userData, setUserData] = useState(() => {
    const data = {
      role: role,
      name: "",
      email: "",
      password: "",
      location: "",
    };
    if (role === "designer") {
      data.bio = "";
    }
    return data;
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const validateInputs = (data) => {
    const error = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        error[key] = "Required";
      }
    });
    const email_regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    if (data.email && !email_regEx.test(data.email)) {
      error.email = "Enter a valid email address";
    }
    if (data.password && data.password.length < 6) {
      error.password = "Password must be at least 6 characters long";
    }
    return error;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const error = validateInputs(userData);
    setErrorObj(error);
    if (Object.keys(error).length) {
      return;
    }
    setIsLoading(true);

    try {
      await sendData("/auth/signup", userData);
      toast.success("Your account has been created. Log in to continue");
      navigate("/login");
    } catch (error) {
      if (error.message === "User already exists") {
        toast.error(error.message);
      } else {
        toast.error("An error occured, try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form
      handleSubmit={handleSignup}
      submitBtnText="Sign up"
      isLoading={isLoading}
    >
      <>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        {errorObj.name && (
          <p className="text-red-700 text-sm">{errorObj.name}</p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        {errorObj.email && (
          <p className="text-red-700 text-sm">{errorObj.email}</p>
        )}
        <label htmlFor="password">Password</label>

        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            onChange={(e) => handleInputFieldChange(e, setUserData)}
            className="w-full"
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
        {errorObj.password && (
          <p className="text-red-700 text-sm">{errorObj.password}</p>
        )}
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        {errorObj.location && (
          <p className="text-red-700 text-sm">{errorObj.location}</p>
        )}
        {role === "designer" && (
          <div className="flex flex-col">
            <label htmlFor="bio">Profile</label>
            <textarea
              name="bio"
              rows={5}
              className="bg-white/30 rounded"
              onChange={(e) => handleInputFieldChange(e, setUserData)}
            ></textarea>
            {errorObj.bio && (
              <p className="text-red-700 text-sm">{errorObj.bio}</p>
            )}
          </div>
        )}
      </>
    </Form>
  );
};

export default SignupForm;
