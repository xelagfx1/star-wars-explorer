import axios from "axios";
import React, { useState, ReactNode } from 'react';
import { CharacterContext } from "../contexts/CharacterContext";
import Character from "../types/Character";

interface CharacterServiceProps {
  children: React.ReactNode;
  characters: Character[];
  isLoading: boolean;
  error?: null | Error
}

interface CharacterWithExtras extends Character {
  [key: string]: unknown; // Allows for unknown properties
}
interface Props {
  children?: ReactNode
  // any props that come into the component
};

interface CharacterContextData {
  characters: Character[];
  isLoading: boolean;
  error: null | Error;
  fetchCharacters: (page?: number) => Promise<void>;
}

export const CharacterService: React.FC<Props> = ({ children, ...props }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = 'https://swapi.dev/api/';

  const fetchCharacters = async (page: number | undefined) => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      let url = baseURL + 'people';
      if( page ) {
        url = baseURL + 'people?page=' + page;
      } 
      
      const response = await axios.get(url);
      setCharacters(response.data.results); // Update characters
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const characterContextData: CharacterContextData = {
    characters,
    isLoading,
    error,
    fetchCharacters,
  };


  return (
      <CharacterContext.Provider value={{ characters, isLoading, error, fetchCharacters }}>
        {children}
      </CharacterContext.Provider>
  );
};

