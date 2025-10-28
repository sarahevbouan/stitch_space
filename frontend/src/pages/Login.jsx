import { FaLongArrowAltRight } from "react-icons/fa";
// import Form from "../ui/Form";
import FormUI from "../ui/FormUI";
import LoginForm from "../features/Forms/LoginForm";

const Login = () => {
  return (
    <FormUI>
      <FormUI.LeftPanel>
        <div>
          <p>Login to continue</p>
          <FaLongArrowAltRight />
        </div>
      </FormUI.LeftPanel>
      <FormUI.RightPanel>
        <h3 className="text-3xl text-center">Login</h3>
        <LoginForm />
      </FormUI.RightPanel>
    </FormUI>
  );
};

export default Login;
