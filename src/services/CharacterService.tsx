import axios from "axios";
import React, { useState, ReactNode } from 'react';
import { CharacterContext } from "../contexts/CharacterContext";
import Character from "../types/Character";

interface CharacterServiceProps {
  children: React.ReactNode
}

interface CharacterContextData {
  characters: Character[];
  isLoading: boolean;
  error: null | Error;
  fetchCharacters: (page?: number) => Promise<void>;
}

export const CharacterService: React.FC<CharacterServiceProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const baseURL = 'https://swapi.dev/api/';

  const fetchCharacters = async (page?: number) => {
    setIsLoading(true);
    setError(null);
    console.log('fetching: ' + page);
    try {
      let url = baseURL + 'people';
      if (page) {
        url = baseURL + 'people?page=' + page;
      }
       

      const response = await axios.get(url);
      setCharacters(response.data.results);
      console.log(response.data);
      return response.data;
     
    } catch (error) {
      setError(error as Error | null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const characterContextData: CharacterContextData = {
    characters,
    isLoading,
    error,
    fetchCharacters
  };

  return (
    <CharacterContext.Provider value={characterContextData}>
      {children}
    </CharacterContext.Provider>
  );
}