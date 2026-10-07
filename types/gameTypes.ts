
export interface Country {
  name: string;
  flag: string;
}

// Este es el estado global de nuestro juego
export interface GameState {
  countries: Country[];
  currentCountry: Country | null;
  score: number;
  isLoading: boolean;
  // Agregamos los que mencionaste para el futuro
  players: string[]; 
  timer: number;
  hints: number;
  timeLeft: number;
  skip: () => void;
}

// Estas son las funciones que el Contexto le va a "prestar" a los componentes
export interface GameContextProps extends GameState {
  guess: (countryName: string) => boolean;
  nextCountry: () => void;
  resetScore: () => void;
}