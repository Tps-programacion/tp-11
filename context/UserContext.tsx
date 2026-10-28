import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface UserContextProps {
  username: string;
  setUsername: (name: string) => void;
  globalScore: number;
  addGlobalScore: (points: number) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');
  const [globalScore, setGlobalScore] = useState<number>(0);

  const addGlobalScore = (points: number) => {
    setGlobalScore((prev) => prev + points);
  };

  const value: UserContextProps = {
    username,
    setUsername,
    globalScore,
    addGlobalScore,
  };

  return React.createElement(
    UserContext.Provider,
    { value },
    children,
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};