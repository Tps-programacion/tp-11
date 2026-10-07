// context/GameContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Country, GameContextProps } from '../types/gameTypes';
import { set } from 'react-hook-form';

// 1. Creamos el contexto (arranca vacío, por eso el undefined)
const GameContext = createContext<GameContextProps | undefined>(undefined);

// 2. Creamos el Provider (el componente que envuelve a los demás)
export const GameProvider = ({ children }: { children: ReactNode }) => {
  // --- ESTADOS DEL JUEGO ---
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  
  // Estados listos para cuando implementemos más funciones
  const [players] = useState<string[]>([]);
  const [timer] = useState<number>(60);
  const [hints] = useState<number>(3);

  const INITIAL_TIME = 15;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);

  // --- EFECTO INICIAL (Llamada a la API) ---
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const result = await response.json();
        
        if (!result.error) {
          const fetchedCountries: Country[] = result.data;
          setCountries(fetchedCountries);
          
          // Elegimos el primer país al azar una vez que cargan
          pickRandomCountry(fetchedCountries);
        }
      } catch (error) {
        console.error("Error cargando los países:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []); // El array vacío asegura que esto solo se ejecute UNA vez al montar la app.

  // --- LÓGICA DEL JUEGO ---

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
  };

  useEffect(() => {
    if (isLoading || !currentCountry || !isTimerActive) return;

    if (timeLeft <= 0) {
      setScore((prev) => prev - 1);
      nextCountry();
      return; 
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentCountry, isLoading, isTimerActive]);

  // Función interna para elegir un país al azar
  const pickRandomCountry = (countryList: Country[]) => {
    if (countryList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * countryList.length);
    setCurrentCountry(countryList[randomIndex]);
  };

  // Función expuesta para pasar al siguiente país manualmente
  const nextCountry = () => {
    pickRandomCountry(countries);
    setTimeLeft(INITIAL_TIME); // Reinicia el temporizador
    setIsTimerActive(true);
  };

  

  // Función principal: Evaluar la respuesta del usuario
  const guess = (countryName: string) => {
    if (!currentCountry) return;

    // Normalizamos el texto (a minúsculas y sin espacios extra) para comparar bien
    const userGuess = countryName.trim().toLowerCase();
    const actualName = currentCountry.name.trim().toLowerCase();

   if (userGuess === actualName) {
      setScore((prev) => prev + 10);
      nextCountry();
      return true; // <-- Agregamos el return
    } else {
      setScore((prev) => prev - 1);
      return false; // <-- Agregamos el return
    }
  };

  // Resetear el juego
  const resetScore = () => {
    setScore(0);
    nextCountry();
  };

  const skip = () => {
    setScore((prev) => prev - 1); // Resta el punto
    nextCountry(); // Pasa de bandera
    
  };

  const value: GameContextProps = {
    countries,
    currentCountry,
    score,
    isLoading,
    players,
    timer,
    hints,
    guess,
    timeLeft,
    skip,
    nextCountry,
    resetScore,
  };

  // 3. Retornamos el Provider pasándole todos los estados y funciones en la prop "value"
  return React.createElement(
    GameContext.Provider,
    { value },
    children,
  );
};

// 4. Custom Hook (¡Buena práctica!)
// En lugar de usar useContext(GameContext) en cada archivo, creamos este hook.
export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};