import axios from "@/utils/axiosInstance";

export const postStatus = async (data: { status: string }) => {
  const response = await axios.post("/status/post", data);
  return response.data;
};

export const getLatestStatus = async () => {
  const response = await axios.get("/status/get");
  return response.data;
};
