import React, { Provider, ReactNode, createContext, useContext } from 'react';
import Character from "../types/Character";
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';

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
interface Props {
  children?: ReactNode
  // any props that come into the component
};

export const CharacterContext = React.createContext<CharacterContextProps>(
  initialState
);

// (Optional) Custom Hook to fetch characters
export const CharacterProvider: React.FC<Props>  = ({children, ...props}) => {
  const { characters, isLoading, error, fetchCharacters } = useContext(
    CharacterContext
  );
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};