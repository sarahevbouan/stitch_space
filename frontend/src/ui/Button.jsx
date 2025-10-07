const Button = ({ children, classType }) => {
  return (
    <button
      className={`${classType} py-2 px-8 rounded-bl-xl font-bold hover:cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
