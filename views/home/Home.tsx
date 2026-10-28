import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useGame } from '../../context/GameContext';
import { Button } from '../../components/common/button/Button';
import Form, { type HomeFormValues } from './components/Form';
import type { Difficulty } from '../../types/gameTypes';
import './home.css';

export default function Home() {
  const { username, setUsername, globalScore } = useUser();
  const { difficulty, setDifficulty, startNewGame } = useGame();
  const navigate = useNavigate();

  const onSubmit = (data: HomeFormValues) => {
    setUsername(data.playerName.trim());
  };

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    startNewGame(); // Arranca una partida limpia en 0 pero conservando globalScore
    navigate('/play');
  };

  if (!username) {
    return (
      <div className="home-container">
        <h1>Bienvenido a GeoGuess</h1>
        <Form onSubmit={onSubmit} />
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>Hola, {username}!</h1>
      <p>Puntaje global: <strong>{globalScore}</strong></p>
      
      <h2>Seleccioná la Dificultad:</h2>
      <div className="difficulty-menu" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button 
          onClick={() => setDifficulty('facil')} 
          variant={difficulty === 'facil' ? 'primary' : 'transparent'}
        >
          Fácil (15s | +10 / -1)
        </Button>
        <Button 
          onClick={() => setDifficulty('media')} 
          variant={difficulty === 'media' ? 'primary' : 'transparent'}
        >
          Media (10s | +15 / -2)
        </Button>
        <Button 
          onClick={() => setDifficulty('dificil')} 
          variant={difficulty === 'dificil' ? 'primary' : 'transparent'}
        >
          Difícil (5s | +20 / -5)
        </Button>
      </div>

      <div className="home-menu">
        <Button onClick={() => handleStartGame(difficulty)} variant="success">
          Jugar ({difficulty.toUpperCase()})
        </Button>
      </div>
    </div>
  );
}