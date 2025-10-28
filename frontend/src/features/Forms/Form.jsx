// import { useLocation, useNavigate } from "react-router-dom";
// import { SketchPicker } from "react-color";
// import { useContext, useState } from "react";
// import { sendData } from "../services/apiServer";
// import { useMutation } from "@tanstack/react-query";
// import { UserContext } from "../../store/UserContext";

const Form = ({
  submitBtnText,
  // encType = "",
  handleSubmit,
  error,
  isLoading,
  children,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      // encType={encType}
      className="[&_input]:bg-white/30 [&_input]:p-2 [&_input]:rounded
               flex flex-col **:mb-0.5 [&_label]:mt-2 text-black/70"
    >
      {children}
      {error && <p className="text-red-700">*{error}</p>}
      <input
        disabled={isLoading}
        type="submit"
        value={isLoading ? "Processing" : submitBtnText}
        className={`mt-4  text-white/60 bg-stone-800! hover:opacity-80 ${
          isLoading ? "cursor-not-allowed opacity-80" : "cursor-pointer "
        }`}
      />
    </form>
  );
};

export default Form;
