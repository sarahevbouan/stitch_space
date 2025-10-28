// import { useLocation } from "react-router-dom";

const FormUI = ({ children, role = "", isAddRoute = false }) => {
  return (
    <div
      className={` bg-[url('/images/signup_bg.jpg')] min-h-dvh ${
        role === "designer"
          ? "h-[700px]"
          : isAddRoute
          ? "h-[800px]"
          : "h-[500px]"
      }
    bg-contain relative`}
    >
      <div
        className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-[3px]
      flex  px-[10%] pt-4 gap-8 [&>*]:text-stone-100/70"
      >
        {children}
      </div>
    </div>
  );
};

const LeftPanel = ({ children }) => {
  return (
    <div
      className="flex-1/2 flex flex-col justify-center [&>div]:border-b space-y-4
        [&>div]:w-fit
      [&>div]:flex [&>div]:gap-2 [&>div]:items-center"
    >
      <h3 className="text-5xl">
        Explore and discover great pieces from designers
      </h3>
      {children}
    </div>
  );
};

const RightPanel = ({ children, role = "", isAddRoute = false }) => {
  return (
    <div
      className={` bg-white/50 backdrop-blur-lg flex-1/2 rounded-2xl
        py-4 px-[5%] ${
          role === "designer" || isAddRoute ? "h-[95%]" : "h-[80%]"
        }
         `}
    >
      {children}
    </div>
  );
};

FormUI.LeftPanel = LeftPanel;
FormUI.RightPanel = RightPanel;

export default FormUI;
