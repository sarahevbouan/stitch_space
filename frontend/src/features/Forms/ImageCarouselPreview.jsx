import { arrayToFileList } from "../../helpers/utils";

const ImageCarouselPreview = (
  setPieceData,
  setImagePreviews,
  imagePreviews
) => {
  const handleImageRemoval = (itemToDelete, pieceDataName) => {
    setPieceData((prev) => {
      const fileArray = Array.from(prev.imageCarousel).filter(
        (item) => item.name !== pieceDataName
      );
      return {
        ...prev,
        imageCarousel: arrayToFileList(fileArray),
      };
    });
    setImagePreviews((prev) =>
      prev.filter((preview) => preview.url !== itemToDelete)
    );
  };
  return (
    <div className="py-1 *:h-[100px] flex gap-2 flex-wrap">
      {imagePreviews &&
        imagePreviews.map((previewImage) => (
          <div
            key={previewImage.url}
            className="relative border border-stone-500/30 rounded-xl px-[10px] pt-[15px]"
          >
            <img
              src={previewImage.url}
              alt={previewImage.name}
              className="h-[95%]"
            />
            <span
              className="absolute -top-[5px] right-1 cursor-pointer text-sm text-stone-700/50"
              onClick={() =>
                handleImageRemoval(previewImage.url, previewImage.name)
              }
            >
              x
            </span>
          </div>
        ))}
    </div>
  );
};

export default ImageCarouselPreview;
