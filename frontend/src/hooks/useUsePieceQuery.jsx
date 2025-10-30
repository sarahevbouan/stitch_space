import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/apiServer";
import { BiCategory } from "react-icons/bi";

export const useUsePieceQuery = (params = "") => {
  const categories = ["office", "Dinner", "Outdoor", "Weddings", "Casual"];
  const { data, isLoading, error } = useQuery({
    queryKey: ["pieces"],
    queryFn: () => fetchData(`/pieces/${params}`),
    select: (data) => {
      const pieceData = () => {
        if (!params) {
          return data;
        } else {
          const filteredPieces = data.pieces.filter(
            (datum) => datum.designer._id === params
          );
          return { ...data, pieces: filteredPieces };
        }
      };
      return pieceData();
    },
  });
  let lobbyData, reOrderedData, galleryData;

  if (data) {
    lobbyData = { ...data, pieces: [...data.pieces].reverse().slice(0, 8) };
    reOrderedData = { ...data, pieces: [...data.pieces].reverse() };
    galleryData = categories.map((category) => {
      const arr = reOrderedData.pieces.filter(
        (datum) => datum.category === category
      );

      return {
        id: category,
        categoryName: category,
        pieces: [...arr],
      };
    });
    console.log(galleryData);
  }
  return {
    data,
    reOrderedData,
    lobbyData,
    galleryData,
    categories,
    isLoading,
    error,
  };
};
