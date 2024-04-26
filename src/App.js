import logo from './logo.svg';
import './App.css';
import React from 'react';
import CharacterDatabase from './components/CharacterDatabase';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient;
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CharacterDatabase />
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
