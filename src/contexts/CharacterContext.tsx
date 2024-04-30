import React, { Provider, createContext, useContext } from 'react';
import Character from "../types/Character";

interface CharacterContextProps {
  characters: Character[];
  isLoading: boolean;
  error: null | Error;
  fetchCharacters: (page?: number) => Promise<void>;
}

const initialState = {
  characters: [],
  isLoading: false,
  error: null,
  fetchCharacters: async () => {}
};

export const CharacterContext = React.createContext<CharacterContextProps>(
  initialState
);

// (Optional) Custom Hook to fetch characters
export const useFetchCharacters = () => {
  const { characters, isLoading, error, fetchCharacters } = useContext(
    CharacterContext
  );

  return { characters, isLoading, error, fetchCharacters };
};