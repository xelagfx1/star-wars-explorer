import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
    useQuery,
    QueryClient,
    keepPreviousData,
  } from '@tanstack/react-query';
import Character from "../types/Character";
import CharacterCard from "./CharacterCard";
import { CharacterContext } from "../contexts/CharacterContext";

export default function CharacterDatabase() {
    const [page, setPage] = useState(1);
    const { fetchCharacters, characters } = useContext(CharacterContext);

    const { isPending = false, error, data = [], isFetching, isPlaceholderData } = useQuery<any>({
        queryKey: ['fetchCharacters', page],
        queryFn: () => fetchCharacters(),
        placeholderData: keepPreviousData,
    });

   

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);
    
    return isPending ? (
        <p>Loading characters...</p>
      ) : (
        <>
        <div className="characterTable">
            {isPending && <p>Loading characters...</p>}
            {error && <p>Error: {error?.message}</p>}
            
            <div style={{ display: 'flex', flexWrap: 'wrap', } }>
                {characters?.map((char: any) => (
                    <CharacterCard key={char.name} character={char} />
                ))}
            </div>
            
            <span>Current Page: {page}</span>
            <button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 1}
            >
                Previous Page
            </button>{' '}
            <button
                onClick={() => {
                if (!isPlaceholderData && data.next) {
                    setPage((old) => old + 1)
                }
                }}
                // Disable the Next Page button until we know a next page is available
                disabled={isPlaceholderData || !data?.next}
            >
                Next Page
            </button>
                
            </div>
        </>
      );
      
}