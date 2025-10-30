import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/apiServer";
// import { useContext } from "react";
import { UserContext } from "../store/UserContext";

const useUseCollectionQuery = (role, id) => {
  //   const { userDetails } = useContext(UserContext);
  //   const { id, role } = userDetails.user;
  const url = role === "designer" ? `/pieces/${id}` : `/collections/${id}`;
  const { data, status, error, isLoading } = useQuery({
    queryKey: [role === "designer" ? "user_piece" : "collections"],
    queryFn: () => fetchData(url),
  });
  let totalCollected, reOrderedData;
  if (data) {
    if (role === "designer") {
      totalCollected = data.total;
    } else {
      const totalCollections = data.collections.map(
        (collection) => collection.pieces?.length
      );
      totalCollected = totalCollections?.reduce(
        (total, item) => total + item,
        0
      );
      const orderedCollection = data.collections.map((collection) => ({
        ...collection,
        pieces: [...collection.pieces].reverse(),
      }));
      reOrderedData = { ...data, collections: [...orderedCollection] };
    }
  }
  const totalCollectionPieces = totalCollected ? totalCollected : 0;

  return {
    data,
    reOrderedData,
    totalCollectionPieces,
    status,
    error,
    isLoading,
  };
};

export default useUseCollectionQuery;
