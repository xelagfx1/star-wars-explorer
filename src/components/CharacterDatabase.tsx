import React, { useEffect, useContext, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { CharacterContext } from '../contexts/CharacterContext';
import CharacterCard from './CharacterCard';

export default function CharacterDatabase() {
    const { fetchCharacters, characters } = useContext(CharacterContext);
    const [page, setPage] = useState(1);
    useEffect(() => {
        
    }, []);

    const { isPending = false, error, data = [], isFetching, isPlaceholderData } = useQuery<any>({
        queryKey: ['fetchCharacters', page],
        queryFn: () => fetchCharacters(page),
        placeholderData: keepPreviousData,
    });
  

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
    <>
      {isPending ? (
        <p>Loading characters...</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {characters?.map((char: any) => (
              <CharacterCard key={char.name} character={char} />
            ))}
          </div>
            <p>{data?.next}</p>
          <span>Current Page: {page}</span>
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous Page
            </button>
            <button
            onClick={() => {
                if (!isPlaceholderData && data?.next) {
                handlePageChange(page + 1);
                }
            }}
            disabled={isPlaceholderData || !data?.next}
            >
            Next Page 
            </button>
        </>
      )}
    </>
  );
}