import { useForm, Controller } from 'react-hook-form';
import { Button } from '../../../components/common/button/Button';
import { Input } from '../../../components/common/input/Input';
import { useGame } from '../../../context/GameContext';

interface GuessFormProps {
  onGuess: (countryName: string) => boolean;
  onSkip: () => void;
}

interface FormValues {
  countryGuess: string;
}

export const GuessForm = ({ onGuess, onSkip }: GuessFormProps) => {
  const { puntajeResta } = useGame(); // <-- Leemos los puntos de resta de la dificultad activa
  const { control, handleSubmit, reset, setError, clearErrors, setValue } = useForm<FormValues>({
    defaultValues: { countryGuess: '' }
  });

  // Helper gramatical para plural / singular
  const textoPuntos = puntajeResta === 1 ? 'punto' : 'puntos';

  const onSubmit = (data: FormValues) => {
    const isCorrect = onGuess(data.countryGuess);

    if (isCorrect) {
      reset();
    } else {
      setError('countryGuess', {
        type: 'manual',
        message: `¡Incorrecto! Restas ${puntajeResta} ${textoPuntos}. Intenta de nuevo.`
      });
      setValue('countryGuess', '');
    }
  };

  const handleSkip = () => {
    onSkip();
    setValue('countryGuess', '');
    setError('countryGuess', {
      type: 'manual',
      message: `Saltaste la bandera. Perdiste ${puntajeResta} ${textoPuntos}.`
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="gameboard-form">
        <Controller
          name="countryGuess"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (error) clearErrors('countryGuess');
              }}
              placeholder="¿Qué país es?"
              autoFocus
              autoComplete="off"
              error={error?.message}
            />
          )}
        />
        <Button type="submit" variant="primary">
          Adivinar
        </Button>
      </form>
      <Button
        type="button"
        onClick={handleSkip}
        variant="transparent"
        className="gameboard-skip-btn"
      >
        No lo sé, saltar bandera
      </Button>
    </>
  );
};