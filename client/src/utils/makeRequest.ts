import axios from "axios";

export const makeRequest = (token?: string) =>
  axios.create({
    baseURL: "http://localhost:3012/api",
    headers: { Authorization: token }
  });
