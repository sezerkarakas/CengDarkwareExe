import axios from "axios";
const url = "";
export const getItems = () => axios.get("http://localhost:3000/image");
export const createItem = (item) =>
  axios.post("http://localhost:3000/image", item);
