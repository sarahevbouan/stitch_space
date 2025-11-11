import { useState, useContext } from "react";
import { SketchPicker } from "react-color";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../store/UserContext";
import { sendData } from "../../services/apiServer";
import { arrayToFileList, handleInputFieldChange } from "../../helpers/utils";
import Form from "./Form";
import ImageCarouselPreview from "./ImageCarouselPreview";

const AddPieceForm = () => {
  const { userDetails } = useContext(UserContext);
  const id = userDetails?.user?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [pieceData, setPieceData] = useState({
    designer: id,
    pieceName: "",
    description: "",
    material: "",
    color: "#4decba",
    price: "",
    category: "Dinner",
    imageUrl: "",
    imageCarousel: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [coverPreview, setCoverPreview] = useState();
  const [errorObj, setErrorObj] = useState({});

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    pieceName,
    description,
    material,
    color,
    price,
    category,
    imageUrl,
    imageCarousel,
  } = pieceData;

  const validateInputs = (data) => {
    const error = {};
    Object.keys(data).forEach((key) => {
      if (!data[key] || !data[key].length) {
        error[key] = "Required";
      }
    });
    if (data.description && data.description.length < 20) {
      error.description = "The description is too short";
    }
    if (data.imageCarousel.length && data.imageCarousel.length < 4) {
      error.imageCarousel = "Upload four (4) images";
    }
    return error;
  };

  const onCurrencyChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const forrmattedValue = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    setPieceData((prev) => ({ ...prev, price: forrmattedValue }));
  };

  const onImageUrlChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(reader.result);
    reader.onerror = () => {
      console.log("File reading failed");
    };
    reader.readAsDataURL(e.target.files[0]);
    handleInputFieldChange(e, setPieceData, true);
  };

  const onImageCarouselChange = async (e) => {
    let imageArray = [
      ...Array.from(pieceData.imageCarousel),
      ...Array.from(e.target.files),
    ];
    if (imageArray.length > 4) {
      imageArray = imageArray.slice(0, 4);
    }
    setPieceData((prev) => ({
      ...prev,
      imageCarousel: arrayToFileList(imageArray),
    }));
    const previewImages = imageArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ url: reader.result, name: file.name });
        };
        reader.onerror = () => {
          console.log("File reading failed");
        };
        reader.readAsDataURL(file);
      });
    });
    const images = await Promise.all(previewImages);
    setImagePreviews(images);
  };

  const handleAddPiece = async (e) => {
    e.preventDefault();
    const error = validateInputs(pieceData);
    setErrorObj(error);
    if (Object.keys(error).length) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    for (const key in pieceData) {
      const value = pieceData[key];
      if (value instanceof FileList) {
        for (const file of value) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, value);
      }
    }

    try {
      const data = await sendData("/pieces", formData);
      toast.success("Your design has been successfully added");
      await queryClient.refetchQueries({ queryKey: ["pieces"] });
      navigate(`/product/${data.pieceData._id}`);
    } catch {
      toast.error("Action failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      handleSubmit={handleAddPiece}
      submitBtnText="Add design"
      isLoading={isLoading}
    >
      <>
        <label htmlFor="pieceName">Piece Name</label>
        <input
          type="text"
          name="pieceName"
          value={pieceName}
          onChange={(e) => handleInputFieldChange(e, setPieceData)}
        />
        {errorObj.pieceName && (
          <p className="text-red-700 text-xs">{errorObj.pieceName}</p>
        )}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => handleInputFieldChange(e, setPieceData)}
        />
        {errorObj.description && (
          <p className="text-red-700 text-xs">{errorObj.description}</p>
        )}
        <label htmlFor="material">Material</label>
        <input
          type="text"
          name="material"
          value={material}
          onChange={(e) => handleInputFieldChange(e, setPieceData)}
        />
        {errorObj.material && (
          <p className="text-red-700 text-xs">{errorObj.material}</p>
        )}
        <div className="flex gap-2 items-center my-2 relative">
          <label>Select design color </label>
          <input
            type="text"
            readOnly
            value={color}
            onClick={() => setIsColorPickerOpen((prev) => !prev)}
            className={`h-5 w-10 hover:cursor-pointer border-4 border-white`}
            style={{
              backgroundColor: color,
              color: color,
            }}
          />
          <div className="absolute -left-75">
            {isColorPickerOpen && (
              <div className="w-fit flex bg-white pr-2 gap-2">
                <SketchPicker
                  color={color}
                  onChange={(newColor) =>
                    setPieceData((prev) => ({ ...prev, color: newColor.hex }))
                  }
                />
                <span
                  className="text-stone-900 cursor-pointer"
                  onClick={() => setIsColorPickerOpen(false)}
                >
                  x
                </span>
              </div>
            )}
          </div>
        </div>

        <label htmlFor="price">Price (₦)</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={onCurrencyChange}
        />
        {errorObj.price && (
          <p className="text-red-700 text-xs">{errorObj.price}</p>
        )}
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={category}
          onChange={(e) => handleInputFieldChange(e, setPieceData)}
          className="bg-white/30 p-2 rounded"
        >
          <option value="Dinner">Dinner</option>
          <option value="Office">Office</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Weddings">Weddings</option>
          <option value="Casual">Casual</option>
        </select>
        <label htmlFor="imageUrl">Upload cover photo</label>
        <input
          type="file"
          accept="image/*"
          name="imageUrl"
          files={imageUrl}
          onChange={onImageUrlChange}
        />
        {errorObj.imageUrl && (
          <p className="text-red-700 text-xs">{errorObj.imageUrl}</p>
        )}
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Cover photo"
            className="h-[90px] w-[90px] rounded"
          />
        )}
        <label htmlFor="imageCarousel">More design photos</label>
        <p className="text-sm">
          {imagePreviews.length === 4 ? (
            <span>✅</span>
          ) : (
            <span className="text-sm">
              Upload four more images for the design
            </span>
          )}
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          name="imageCarousel"
          files={imageCarousel}
          onChange={onImageCarouselChange}
          disabled={imagePreviews.length >= 4}
        />
        {errorObj.imageCarousel && (
          <p className="text-red-700 text-xs">{errorObj.imageCarousel}</p>
        )}

        <ImageCarouselPreview
          setPieceData={setPieceData}
          setImagePreviews={setImagePreviews}
          imagePreviews={imagePreviews}
        />
      </>
    </Form>
  );
};

export default AddPieceForm;
