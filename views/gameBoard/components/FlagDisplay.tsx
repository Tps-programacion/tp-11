interface FlagDisplayProps {
  flagUrl: string;
}

export const FlagDisplay = ({ flagUrl }: FlagDisplayProps) => {
  return (
    <img 
      src={flagUrl} 
      alt="Adivina esta bandera" 
      className="gameboard-flag"
    />
  );
};