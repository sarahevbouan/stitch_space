import { ImScissors } from "react-icons/im";
import { GiSewingMachine } from "react-icons/gi";
import { GiAmpleDress } from "react-icons/gi";
import { GiSkirt } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";

import Button from "../ui/Button";
import hero1 from "/images/hero1.jpg";
import Footer from "../ui/Footer";
import Gallery from "../features/gallery/Gallery";
import Card from "../ui/Card";

const Lobby = () => {
  return (
    <div className="pt-16 [&>*]:mb-36">
      <Hero />
      <Gallery />
      <Categories />
      <Footer />
    </div>
  );
};

const Hero = () => {
  return (
    <div
      className="flex flex-col gap-16 w-[100%] px-[10%]
    m-auto justify-center items-center text-center"
      // bg-gradient-to-br from-[#ececf8] to-[#272c44]
    >
      <div className="flex flex-col items-center w-[50%]">
        <h1 className="font-extrabold text-4xl mb-2 tracking-wider">
          Transform Your
          <span className="text-orange-500"> Style </span> with Stitch
        </h1>
        <p className="mb-4">
          Discover unique fashion pieces from world class designers
        </p>
        <div className="flex gap-4">
          <Button
            classType="bg-orange-500 text-white hover:bg-stone-700
          hover:text-white"
          >
            Sign up
          </Button>
          <Button
            classType="border border-orange-500 hover:bg-stone-700 hover:text-white
          hover:border-0"
          >
            Browse
          </Button>
        </div>
      </div>
      <div className="flex gap-18 items-center">
        <div className="space-y-24">
          <div className="space-y-2 flex flex-col items-center">
            <span
              className="inline-block p-2 backdrop-filter backdrop-blur-lg bg-white bg-opacity-20
            shadow-lg rounded-2xl"
            >
              <ImScissors fill="orange" />
            </span>
            <h3 className="font-bold">Showcase</h3>
            <p>
              lorem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem
              ipsum lorem ipsum lorems
            </p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <span
              className="inline-block p-2 backdrop-filter backdrop-blur-lg bg-white bg-opacity-20
            shadow-lg rounded-2xl"
            >
              <GiSewingMachine fill="orange" />
            </span>

            <h3 className="font-bold">Expand</h3>
            <p>
              orem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem
              ipsum lorem ipsum lorems
            </p>
          </div>
        </div>
        <img
          src={hero1}
          alt="Hero-image"
          className="w-[450px] h-[450px] rounded-bl-[4rem] rounded-tr-[6rem]"
        />
        <div className="space-y-24">
          <div className="space-y-2 flex flex-col items-center">
            <span
              className="inline-block p-2 backdrop-filter backdrop-blur-lg bg-white bg-opacity-20
            shadow-lg rounded-2xl"
            >
              <GiAmpleDress fill="orange" />
            </span>

            <h3 className="font-bold">Discover</h3>
            <p>
              orem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem
              ipsum lorem ipsum lorems
            </p>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <span
              className="inline-block p-2 backdrop-filter backdrop-blur-lg bg-white bg-opacity-20
            shadow-lg rounded-2xl"
            >
              <GiSkirt fill="orange" />
            </span>

            <h3 className="font-bold">Explore</h3>
            <p>
              orem ipsum lorem ipsum lorem lorem ipsum lorem ipsum lorem lorem
              ipsum lorem ipsum lorems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  const categories = [
    "Street",
    "Ankara",
    "Dinner",
    "Casual",
    "Street",
    "Ankara",
    "Dinner",
    "Casual",
  ];
  return (
    <div className="text-center bg-white p-8">
      <h3 className="font-bold">Categories</h3>
      <div className="flex h-[150px]  gap-4 items-center justify-center ">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-8 py-4 shadow-2xl rounded-2xl text-xs space-y-1"
          >
            <div className="">
              <img src="/images/casual 1.png" alt="" />
              <h3>{category}</h3>
            </div>
            <RiArrowRightSLine />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
