
import { Button } from "@/components/ui/button";

interface LevelControlsProps {
  onCalculate: () => void;
  calculateDisabled: boolean;
  onReset: () => void;
}

const LevelControls = ({ onCalculate, calculateDisabled, onReset }: LevelControlsProps) => (
  <div className="flex flex-wrap gap-2">
    <Button
      onClick={onCalculate}
      disabled={calculateDisabled}
      className="flex-1"
    >
      Calcular Ponto Médio
    </Button>
    <Button
      onClick={onReset}
      variant="outline"
      className="flex-1"
    >
      Reiniciar Nível
    </Button>
  </div>
);

export default LevelControls;
