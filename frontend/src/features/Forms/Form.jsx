import SubmitBtn from "../../ui/SubmitBtn";
const Form = ({
  submitBtnText,
  isSubmitBtnEnabled = true,
  handleSubmit,
  isLoading,
  children,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="[&_input]:bg-white/30 [&_input]:p-2 [&_input]:rounded
               flex flex-col **:mb-0.5 [&_label]:mt-2 text-black/70"
    >
      {children}
      <SubmitBtn
        isLoading={isLoading}
        submitBtnText={submitBtnText}
        isSubmitBtnEnabled={isSubmitBtnEnabled}
      />
    </form>
  );
};

export default Form;
