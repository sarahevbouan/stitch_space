import { FaCartShopping } from "react-icons/fa6";

import brand from "../assets/images/brand.png";
const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center h-[6rem] w-full px-[5%]
    bg-white fixed top-0 left-0 font-bold [&>*]:hover:cursor-pointer z-1000"
    >
      <div className="flex gap-24 items-center">
        <div className="flex gap-2 items-center">
          <img src={brand} alt="" className="w-[50px] h-[50px]" />
          <h1 className="font-extrabold text-2xl text-orange-500 tracking-widest font-figtree">
            Stitch
          </h1>
        </div>
        <ul className="flex gap-12 [&>*]:hover:text-orange-500">
          <li>Lobby</li>
          <li>Collections</li>
          <li>Designers</li>
          <li>Gallery</li>
          <li>About</li>
        </ul>
      </div>
      <ul className="flex gap-4 items-center">
        <li>Login</li>
        <li>
          <FaCartShopping />
        </li>
        <li>⏱️</li>
      </ul>
    </nav>
  );
};

export default Navbar;
