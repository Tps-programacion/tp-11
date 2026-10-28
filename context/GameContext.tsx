import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Country, GameContextProps, Difficulty } from '../types/gameTypes';
import { COUNTRIES_DATA } from '../types/countries';
import { useUser } from './UserContext';

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Configuración de tiempos y puntajes según dificultad
const getDifficultyConfig = (diff: Difficulty) => {
  switch (diff) {
    case 'media':
      return { initialTime: 10, puntajeSuma: 15, puntajeResta: 2 };
    case 'dificil':
      return { initialTime: 5, puntajeSuma: 20, puntajeResta: 5 };
    case 'facil':
    default:
      return { initialTime: 15, puntajeSuma: 10, puntajeResta: 1 };
  }
};

// FILTRO ACUMULATIVO: Las dificultades más altas incluyen los países de las más bajas
const getCountriesByDifficulty = (allCountries: Country[], diff: Difficulty): Country[] => {
  if (diff === 'facil') {
    return allCountries.filter(c => c.difficulty === 'facil');
  }
  if (diff === 'media') {
    return allCountries.filter(c => c.difficulty === 'facil' || c.difficulty === 'media');
  }
  // 'dificil': Retorna la totalidad de los países de la base de datos
  return allCountries;
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { addGlobalScore } = useUser();

  const [countries] = useState<Country[]>(COUNTRIES_DATA);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const [difficulty, setDifficultyState] = useState<Difficulty>('facil');
  const { initialTime, puntajeSuma, puntajeResta } = getDifficultyConfig(difficulty);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  const [players] = useState<string[]>([]);
  const [timer] = useState<number>(60);
  const [hints] = useState<number>(3);

  // Selecciona un país al azar usando el pozo acumulativo según la dificultad
  const pickRandomCountry = (allCountries: Country[], currentDiff: Difficulty) => {
    const pool = getCountriesByDifficulty(allCountries, currentDiff);
    if (pool.length === 0) return;

    const randomIndex = Math.floor(Math.random() * pool.length);
    setCurrentCountry(pool[randomIndex]);
  };

  // Inicialización
  useEffect(() => {
    if (countries.length > 0) {
      pickRandomCountry(countries, difficulty);
      setIsLoading(false);
      setIsTimerActive(true);
    }
  }, [countries]);

  // Función para iniciar una nueva ronda/partida desde 0
  const startNewGame = () => {
    setScore(0);
    setTimeLeft(initialTime);
    pickRandomCountry(countries, difficulty);
    setIsTimerActive(true);
  };

  const setDifficulty = (newDiff: Difficulty) => {
    setDifficultyState(newDiff);
    const newConfig = getDifficultyConfig(newDiff);
    setTimeLeft(newConfig.initialTime);
    pickRandomCountry(countries, newDiff);
  };

  // Temporizador: cuando llega a 0 penaliza en ambos contextos
  useEffect(() => {
    if (isLoading || !currentCountry || !isTimerActive) return;

    if (timeLeft <= 0) {
      setScore((prev) => prev - puntajeResta);
      addGlobalScore(-puntajeResta); // Sincroniza resta global por tiempo
      nextCountry();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, currentCountry, isLoading, isTimerActive, puntajeResta]);

  const nextCountry = () => {
    pickRandomCountry(countries, difficulty);
    setTimeLeft(initialTime);
    setIsTimerActive(true);
  };

  const guess = (countryName: string): boolean => {
    if (!currentCountry) return false;

    const userGuess = normalizeText(countryName);
    const actualEs = normalizeText(currentCountry.nameEs);
    const actualEn = normalizeText(currentCountry.nameEn);

    const isCorrect = userGuess === actualEs || userGuess === actualEn;

    if (isCorrect) {
      setScore((prev) => prev + puntajeSuma);
      addGlobalScore(puntajeSuma); // Suma global
      nextCountry();
      return true;
    } else {
      setScore((prev) => prev - puntajeResta);
      addGlobalScore(-puntajeResta); // Resta global por respuesta incorrecta
      return false;
    }
  };

  const resetScore = () => {
    setScore(0);
    nextCountry();
  };

  const skip = () => {
    setScore((prev) => prev - puntajeResta);
    addGlobalScore(-puntajeResta); // Resta global por saltear
    nextCountry();
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
    difficulty,
    setDifficulty,
    startNewGame,
    skip,
    nextCountry,
    resetScore,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }

  return context;
};