
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface GameCompleteProps {
  score: number;
  onRestart: () => void;
}

const GameComplete = ({ score, onRestart }: GameCompleteProps) => {
  return (
    <Card className="mb-8 animate-fade-in">
      <CardHeader>
        <CardTitle>Jogo Completo!</CardTitle>
        <CardDescription>
          Parabéns! Você completou todos os níveis do jogo da bisseção.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Pontuação final: {score}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onRestart}>
          Jogar Novamente
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameComplete;
