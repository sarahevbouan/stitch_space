import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../services/apiServer";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";

export const useUseRequestQuery = (role, id) => {
  const { data, status, error, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: () => fetchData(`/requests?role=${role}&id=${id}`),
  });

  let total,
    totalActive,
    totalPending,
    totalCompleted,
    totalRequested,
    orderedRequests;

  if (data) {
    total = data.total ? data.total : 0;
    totalActive = data?.requests?.filter(
      (request) => request.status === "active"
    ).length;

    totalPending = data.requests.filter(
      (request) => request.status === "pending"
    ).length;

    totalCompleted = data.requests.filter(
      (request) => request.status === "completed"
    ).length;

    totalRequested = data.requests.reduce(
      (accumulator, request) => accumulator + request.pieces.length,
      0
    );
    orderedRequests = [...data.requests].reverse();
  }

  const totalRequests = total ? total : 0;
  const totalActiveRequests = totalActive ? totalActive : 0;
  const totalPendingRequests = totalPending ? totalPending : 0;
  const totalCompletedRequests = totalCompleted ? totalCompleted : 0;
  const totalRequestedPieces = totalRequested ? totalRequested : 0;

  return {
    data,
    error,
    status,
    isLoading,
    totalRequests,
    totalActiveRequests,
    totalPendingRequests,
    totalCompletedRequests,
    totalRequestedPieces,
    orderedRequests,
  };
};
