import axios from "axios";

export const sendEmailFunc = async (param) => {
  const response = await axios.post("/api/send-email", param);
  return response;
};
export default {
  sendEmailFunc
};
