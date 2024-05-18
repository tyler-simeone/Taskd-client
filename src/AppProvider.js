import React, { useState, createContext } from 'react';

// Step 1: Create a context
export const AppContext = createContext();

// Step 2: Create a provider component
export const AppProvider = ({ children }) => {
  
    const [rerender, setRerender] = useState(false);
    const handleRerender = () => setRerender(!rerender);

    const ctx = {
        rerender,
        handleRerender
    }

  return (
    <AppContext.Provider value={ctx}>
      {children}
    </AppContext.Provider>
  );
};