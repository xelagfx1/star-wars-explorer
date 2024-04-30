import logo from './logo.svg';
import './App.css';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { CharacterService } from './services/CharacterService'; 
import CharacterDatabase from './components/CharacterDatabase';

function App() {
  const queryClient = new QueryClient;
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CharacterService>
          <CharacterDatabase />
        </CharacterService>
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
