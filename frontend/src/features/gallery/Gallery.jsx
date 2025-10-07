import { RiArrowRightDoubleFill } from "react-icons/ri";

import Card from "../../ui/Card";

const Gallery = () => {
  const pieces = [
    "/images/hero.jpg",
    "/images/piece1.jpg",
    "/images/piece3.jpg",
    "/images/piece2.jpg",
    "/images/piece1.jpg",
    "/images/hero.jpg",
    "/images/piece3.jpg",
    "/images/piece2.jpg",
  ];
  return (
    <div className="px-[5%] py-8 text-center bg-white relative">
      <div
        className="h-[100px] bg-white absolute top-[15px] left-[-15px] z-[-100]
      w-full rotate-10"
      ></div>
      <h1
        className="mb-12 font-bold font-figtree text-2xl text-stone-800
      "
      >
        Collections
      </h1>
      <div className="flex flex-wrap [&>*]:w-[22%] gap-4 mb-12">
        {pieces.map((piece, index) => (
          <Card key={index}>
            <img
              src={piece}
              alt=""
              className={`h-[420px] rounded-xl w-full 
              `}
            />
          </Card>
        ))}
      </div>
      <div
        className="flex gap-4 items-center justify-center hover:bg-orange-500 hover:text-white
        hover:cursor-pointer py-2 px-4 rounded font-bold
      w-fit m-auto"
      >
        <p>See more</p>
        <RiArrowRightDoubleFill />
      </div>
    </div>
  );
};

export default Gallery;
