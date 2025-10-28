import { useState } from "react";
import Form from "./Form";
import { handleInputFieldChange } from "../../helpers/utils";
import { sendData } from "../../services/apiServer";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ role }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userDetail = await sendData("/auth/signup", userData);
      // setUserData(userDetail);
      // userDetail.user.role === "designer"
      //   ? navigate("/catalogue")
      //   : navigate("/collections");
      alert(userDetail.message);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form
      handleSubmit={handleSignup}
      submitBtnText="Sign up"
      error={error}
      isLoading={isLoading}
    >
      <>
        <label htmlFor="">Name</label>
        <input
          required
          name="name"
          // currently not working
          // pattern="[a-zA-Z'-]+ [a-zA-Z'-]+(?: [a-zA-Z'-]+)*$"
          type="text"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          name="password"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        <label htmlFor="">Location</label>
        <input
          type="text"
          name="location"
          onChange={(e) => handleInputFieldChange(e, setUserData)}
        />
        {role === "designer" && (
          <div className="flex flex-col">
            <label htmlFor="">Profile</label>
            <textarea
              name="bio"
              rows={5}
              className="bg-white/30 rounded"
              onChange={(e) => handleInputFieldChange(e, setUserData)}
            ></textarea>
          </div>
        )}
      </>
    </Form>
  );
};

export default SignupForm;
