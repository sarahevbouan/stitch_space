import { useState } from "react";
// import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Form from "../features/Forms/Form";
import FormUI from "../ui/FormUI";
import SignupForm from "../features/Forms/SignupForm";

const Signup = () => {
  const [role, setRole] = useState(null);
  const handleRoleSet = (role) => {
    setRole(role);
  };
  return (
    <FormUI role={role}>
      <FormUI.LeftPanel>
        <div className="hover:cursor-pointer hover:border-b-2 hover:border-orange-500">
          <p onClick={() => handleRoleSet("designer")}>Sign up as a designer</p>
          <FaLongArrowAltRight />
        </div>
        <div className="hover:cursor-pointer hover:border-b-2 hover:border-orange-500">
          <p onClick={() => handleRoleSet("customer")}>Sign up as a customer</p>
          <FaLongArrowAltRight />
        </div>
      </FormUI.LeftPanel>
      <FormUI.RightPanel role={role}>
        {!role && (
          <div className="flex flex-col justify-center h-full text-black/80 font-cookie">
            <h3 className="text-4xl">Start Your Journey With Stitch</h3>
            <p className="text-3xl">
              A place for designers and fashion consumers
            </p>
          </div>
        )}

        {role && (
          <>
            <h3 className="text-3xl text-center">Create an account</h3>

            <SignupForm role={role} />
          </>
        )}
      </FormUI.RightPanel>
    </FormUI>
  );
};

export default Signup;
