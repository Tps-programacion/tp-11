// src/views/GameBoard/components/GameHeader.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common/button/Button';

interface GameHeaderProps {
  username: string;
  score: number;
}

export const GameHeader = ({ username, score }: GameHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="gameboard-header">
      {/* Nuevo botón de volver */}
      <Button 
        variant="transparent" 
        onClick={() => navigate('/')}
        // Unos estilos rápidos para que el botón no desentone con la barra oscura
        style={{ color: '#ccc', textDecoration: 'none', padding: 0, fontWeight: 'normal' }}
      >
        ⬅️ Volver
      </Button>

      <span>👤 {username}</span>
      <span>Puntos: <strong>{score}</strong></span>
    </div>
  );
};