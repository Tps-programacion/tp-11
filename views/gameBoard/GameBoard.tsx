import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useUser } from '../../context/UserContext';
import { GameHeader } from './components/GameHeader';
import { FlagDisplay } from './components/FlagDisplay';
import { GuessForm } from './components/GuessForm';
import { GameTimer } from './components/GameTimer';
import './gameboard.css';

export default function GameBoard() {
  const navigate = useNavigate();
  const { username } = useUser();
  const { currentCountry, score, isLoading, guess, timeLeft, skip } = useGame();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  if (!username) {
    return null;
  }

  if (isLoading) {
    return <div className="gameboard-loading">Cargando banderas...</div>;
  }

  if (!currentCountry) {
    return <div className="gameboard-loading">Hubo un error cargando el país.</div>;
  }

  return (
    <div className="gameboard-container">
      <GameHeader username={username} score={score} />
      <FlagDisplay flagUrl={currentCountry.flag} />
      <GameTimer timeLeft={timeLeft} />
      <GuessForm onGuess={guess} onSkip={skip} />
    </div>
  );
}