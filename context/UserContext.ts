// context/UserContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Definimos los tipos para el contexto
export interface UserContextProps {
  username: string;
  setUsername: (name: string) => void;
  globalScore: number;
  addGlobalScore: (points: number) => void;
}

// 1. Creamos el contexto
const UserContext = createContext<UserContextProps | undefined>(undefined);

// 2. Creamos el Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');
  const [globalScore, setGlobalScore] = useState<number>(0);

  const addGlobalScore = (points: number) => {
    setGlobalScore((prev) => prev + points);
  };

  // Separamos el valor, respetando tu diseño
  const value: UserContextProps = {
    username,
    setUsername,
    globalScore,
    addGlobalScore,
  };

  // 3. Retornamos usando createElement
  return React.createElement(
    UserContext.Provider,
    { value },
    children,
  );
};

// 4. Custom Hook
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};