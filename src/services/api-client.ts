import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "492d6fdc01d443498620ca48f31d6258",
  },
});
