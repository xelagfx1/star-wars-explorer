import axios from "axios";
import Character from "../types/Character";

const apiClient = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    "Content-type": "application/json",
  },
});

const findAll = async () => {
  const response = await apiClient.get<Character[]>("/people/10");
  return response.data;
}

const CharacterService = {
    findAll,
}
  
export default CharacterService;