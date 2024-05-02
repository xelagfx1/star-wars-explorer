import React, { useEffect, useContext, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { CharacterContext } from '../contexts/CharacterContext';
import CharacterCard from './CharacterCard';
import styles from './CharacterDatabase.module.css'; // Import stylesheet

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
        <h1>Star Wars Characters</h1>
        {isPending ? (
            <p>Loading characters...</p>
        ) : (
        <>
            <div className={styles.databaseWrap}>
                {characters?.map((char: any) => (
                <CharacterCard key={char.name} character={char} />
                ))}
            </div>
            
            <span>Current Page: {page} </span>
            <button 
                className={styles.pageBtn} 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1}>
                Previous Page
            </button>
            <button
                className={styles.pageBtn}
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