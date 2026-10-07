import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useUser } from '../../context/UserContext';

// Tus subcomponentes
import { GameHeader } from './components/GameHeader';
import { FlagDisplay } from './components/FlagDisplay';
import { GuessForm } from './components/GuessForm';
import { GameTimer } from './components/GameTimer'; // <-- Importamos el Timer

import './gameboard.css';

export default function GameBoard() {
  const navigate = useNavigate();
  const { username } = useUser();
  const { currentCountry, score, isLoading, guess, nextCountry, timeLeft, skip } = useGame();
  
  // SOLUCIÓN: La redirección automática DEBE ir dentro de un useEffect
  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  // Si no hay usuario, retornamos null para no intentar dibujar el juego
  if (!username) {
    return null;
  }

  if (isLoading) {
    return <div className="gameboard-loading">Cargando banderas... 🌍</div>;
  }

  if (!currentCountry) {
    return <div className="gameboard-loading">Hubo un error cargando el país.</div>;
  }

  return (
    <div className="gameboard-container">
      
      <GameHeader 
        username={username} 
        score={score} 
      />

      <FlagDisplay 
        flagUrl={currentCountry.flag} 
      />
    
        <GameTimer timeLeft={timeLeft} />

      <GuessForm 
        onGuess={guess} 
        onSkip={skip}
      />

    </div>
  );
}