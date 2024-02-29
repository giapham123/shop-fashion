import axios from "axios";
export const getUser = async () => {
  const response = await axios.get("/api/user-list/1");
  return response.data;
};
export const getUserIds = async () => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};

export const loginAuth = async (receiptData) => {
  // const response = await axios.post("/api/user-list/login-auth", receiptData);
  const response = await axios.post("/api/send-email", receiptData);
  return response;
};
export default {
  getUser,
  getUserIds,
  loginAuth
};
