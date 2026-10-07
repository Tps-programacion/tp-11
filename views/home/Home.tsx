import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../../context/UserContext';
import { Button } from '../../components/common/button/Button';
import { Input } from '../../components/common/input/Input';
import { Card } from '../../components/common//card/Card';
import './home.css';

interface HomeFormValues {
  playerName: string;
}

export default function Home() {
  const { username, setUsername, globalScore } = useUser();
  const navigate = useNavigate();
  
  const { control, handleSubmit } = useForm<HomeFormValues>({
    defaultValues: { playerName: '' }
  });

  const onSubmit = (data: HomeFormValues) => {
    setUsername(data.playerName.trim());
  };

  if (!username) {
    return (
      <div className="home-container">
        <h1>Bienvenido a GeoGuess 🌍</h1>
        <Card className="home-form-container">
          
          <form onSubmit={handleSubmit(onSubmit)} className="home-form">
            <Controller
              name="playerName"
              control={control}
              rules={{ 
                required: 'El nombre es obligatorio',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Por favor, ingresa tu nombre:"
                  placeholder="Ej: Fede"
                  autoComplete="off"
                  error={error?.message}
                />
              )}
            />
            
            <Button type="submit" variant="primary">
              Ingresar
            </Button>
          </form>

        </Card>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>¡Hola, {username}! 👋</h1>
      <p>Puntaje global: <strong>{globalScore}</strong></p>
      
      <h2>¿A qué jugamos hoy?</h2>
      
      <div className="home-menu">
        {/* SOLUCIÓN: Aseguramos que el onClick sea una función de flecha */}
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