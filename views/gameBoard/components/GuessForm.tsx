import { useForm, Controller } from 'react-hook-form';
import { Button } from '../../../components/common/button/Button';
import { Input } from '../../../components/common/input/Input';

interface GuessFormProps {
  onGuess: (countryName: string) => boolean;
  onSkip: () => void;
}

interface FormValues {
  countryGuess: string;
}

export const GuessForm = ({ onGuess, onSkip }: GuessFormProps) => {
  const { control, handleSubmit, reset, setError, clearErrors, setValue } = useForm<FormValues>({
    defaultValues: { countryGuess: '' }
  });

  const onSubmit = (data: FormValues) => {
    const isCorrect = onGuess(data.countryGuess);
    
    if (isCorrect) {
      reset(); 
    } else {
      setError('countryGuess', { 
        type: 'manual', 
        message: '¡Incorrecto! Restas 1 punto. Intenta de nuevo.' 
      });
      setValue('countryGuess', ''); 
    }
  };

  // NUEVA FUNCIÓN: Maneja el clic de saltar
  const handleSkip = () => {
    onSkip(); // Cambia la bandera y resta el punto en el Contexto
    setValue('countryGuess', ''); // Limpia lo que haya escrito
    setError('countryGuess', { 
      type: 'manual', 
      message: 'Saltaste la bandera. Perdiste 1 punto.' 
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

      {/* Actualizamos el botón para que llame a handleSkip */}
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