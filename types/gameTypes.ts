export type Difficulty = 'facil' | 'media' | 'dificil';

export interface Country {
  nameEs: string;
  nameEn: string;
  flag: string;
  difficulty: Difficulty;
}

export interface GameState {
  countries: Country[];
  currentCountry: Country | null;
  score: number;
  isLoading: boolean;
  players: string[];
  timer: number;
  hints: number;
  timeLeft: number;
  difficulty: Difficulty;
  puntajeResta: number; // <-- Exponemos la cantidad de puntos que se restan
  skip: () => void;
}

export interface GameContextProps extends GameState {
  setDifficulty: (diff: Difficulty) => void;
  startNewGame: () => void;
  guess: (countryName: string) => boolean;
  nextCountry: () => void;
  resetScore: () => void;
}