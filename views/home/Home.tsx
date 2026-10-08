import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../../components/common/button/Button';
import { Card } from '../../components/common/card/Card';
import Form, { type HomeFormValues } from './components/Form';
import './home.css';

export default function Home() {
  const { username, setUsername, globalScore } = useUser();
  const navigate = useNavigate();

  const onSubmit = (data: HomeFormValues) => {
    setUsername(data.playerName.trim());
  };

  if (!username) {
    return (
      <div className="home-container">
        <h1>Bienvenido a GeoGuess 🌍</h1>
        <Form onSubmit={onSubmit} />
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>¡Hola, {username}! 👋</h1>
      <p>Puntaje global: <strong>{globalScore}</strong></p>

      <h2>¿A qué jugamos hoy?</h2>

      <div className="home-menu">
        <Button onClick={() => navigate('/play')} variant="success">
          Adivinar Banderas 🎌
        </Button>

        <Button disabled variant="success">
          Capitales (Próximamente) 🏛️
        </Button>
      </div>
    </div>
  );
}