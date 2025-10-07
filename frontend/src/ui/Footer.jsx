import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import Button from "./Button";

const Footer = () => {
  return (
    <div
      className="border-t-2 border-orange-300 min-h-[100px] pt-2
    "
    >
      <div
        className="bg-stone-800 h-[250px] text-stone-400 text-center
      flex flex-col justify-center items-center gap-8"
      >
        <p className="text-5xl font-extrabold tracking-widest">
          Want to showcase <br /> your designs?
        </p>
        <Button classType="bg-orange-500 text-white w-fit">JOIN NOW!</Button>
      </div>
      <div className="flex justify-around items-center pt-16">
        <ul className="space-y-4">
          <li>Support</li>
          <li>Contact</li>
          <li>Privacy policy</li>
          <li>Terms and conditions</li>
          <li>&copy; Stitch 2025</li>
        </ul>
        <ul className="flex gap-8">
          <li className="inline-block p-2 bg-stone-700 text-stone-100 rounded-[50%]">
            <FaFacebook />
          </li>
          <li className="inline-block p-2 bg-stone-700 text-stone-100 rounded-[50%]">
            <FaInstagram />
          </li>
          <li className="inline-block p-2 bg-stone-700 text-stone-100 rounded-[50%]">
            <FaYoutube />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
