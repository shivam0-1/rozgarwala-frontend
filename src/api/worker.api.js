import axiosInstance from "./axiosInstance";

/**
 * GET all workers (public API)
 * URL → GET /api/workers
 */
export const getAllWorkers = async () => {
  const response = await axiosInstance.get("/workers");
  return response.data;
};
