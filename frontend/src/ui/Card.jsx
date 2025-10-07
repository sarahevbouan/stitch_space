import { FaBookmark } from "react-icons/fa";

const Card = ({ children }) => {
  return (
    <div className="relative h-fit rounded-xl shadow-2xl">
      {children}
      <span className="absolute top-[10px] right-[10px] shadow-4xl">
        <FaBookmark fill="white" />
      </span>
    </div>
  );
};

export default Card;
