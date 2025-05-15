
import { Button } from "@/components/ui/button";
import { problems } from "@/utils/bisection-utils";

interface InfoHeaderProps {
  currentLevel: number;
  score: number;
  showHelp: boolean;
  setShowHelp: (b: boolean) => void;
}

const InfoHeader = ({ currentLevel, score, showHelp, setShowHelp }: InfoHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-xl font-semibold">Nível {currentLevel}/{problems.length}</h2>
      <p>Pontuação: {score}</p>
    </div>
    <Button variant="outline" onClick={() => setShowHelp(!showHelp)}>
      {showHelp ? "Ocultar Ajuda" : "Mostrar Ajuda"}
    </Button>
  </div>
);

export default InfoHeader;

