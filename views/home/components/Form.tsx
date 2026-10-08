import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '../../../components/common/button/Button';
import { Card } from '../../../components/common/card/Card';
import { Input } from '../../../components/common/input/Input';
import '../home.css';

export interface HomeFormValues {
  playerName: string;
}

interface FormProps {
  onSubmit: (data: HomeFormValues) => void;
}

export function Form({ onSubmit }: FormProps) {
  const { control, handleSubmit } = useForm<HomeFormValues>({
    defaultValues: {
      playerName: '',
    },
    mode: 'onSubmit',
  });

  const submitHandler: SubmitHandler<HomeFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <Card className="home-form-container">
      <form onSubmit={handleSubmit(submitHandler)} className="home-form">
        <Controller
          name="playerName"
          control={control}
          rules={{
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'Mínimo 2 caracteres',
            },
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
  );
}

export default Form;