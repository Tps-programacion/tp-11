interface GameTimerProps {
  timeLeft: number;
}

export const GameTimer = ({ timeLeft }: GameTimerProps) => {
  
  const isDanger = timeLeft <= 5;

  return (
    <div style={{
      fontSize: '24px',
      fontWeight: 'bold',
      color: isDanger ? '#dc3545' : '#333',
      textAlign: 'center',
      margin: '15px 0',
      transition: 'color 0.3s ease'
    }}>
      ⏱️ 00:{timeLeft.toString().padStart(2, '0')}
    </div>
  );
};