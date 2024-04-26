import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    useQuery,
    QueryClient
  } from '@tanstack/react-query'
import CharacterService from "../services/CharacterService";
import Character from "../types/Character";
import CharacterCard from "./CharacterCard";


export default function CharacterDatabase() {
    const [characters, setCharacters] = useState([]);
    const baseURL = "https://swapi.dev/api/";
    const { isPending = false, error, data = [], isFetching } = useQuery<any>({
        queryKey: ['fetchCharacters'],
        queryFn: () =>
            axios
            .get<Character[]>(baseURL + 'people')
            .then((res) => res.data),
            
        
    })
    console.log(data);
    
    return isPending ? (
        <p>Loading characters...</p>
      ) : (
        // Rest of your code rendering characters
        <div className="characterTable">
                {isPending && <p>Loading characters...</p>}
                {error && <p>Error: {error?.message}</p>}
                
                <div style={{ display: 'flex', flexWrap: 'wrap', } }>
                    {data?.results?.map((char: any) => (
                        <CharacterCard key={char.name} character={char} />
                    ))}
                </div>
                   
                
            </div>
      );
      
}