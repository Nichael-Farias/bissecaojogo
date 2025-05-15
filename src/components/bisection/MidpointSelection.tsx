
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/utils/bisection-utils";
import { CircleMinus, CirclePlus } from "lucide-react";

interface MidpointSelectionProps {
  midpoint: number;
  lowerBound: number;
  upperBound: number;
  fMid: number;
  onSelectInterval: (chooseLower: boolean) => void;
}

const MidpointSelection = ({ 
  midpoint, 
  lowerBound, 
  upperBound, 
  fMid,
  onSelectInterval 
}: MidpointSelectionProps) => {
  return (
    <div className="mb-6 p-4 bg-secondary/20 rounded-md">
      <h3 className="font-semibold mb-2">Ponto Médio: {formatNumber(midpoint)}</h3>
      <p>f({formatNumber(midpoint)}) = {formatNumber(fMid)}</p>
      <div className="flex gap-3 mt-4">
        <Button 
          onClick={() => onSelectInterval(true)}
          variant="outline"
          className="flex-1"
        >
          <CircleMinus className="mr-2" />
          Escolher [{formatNumber(lowerBound)}, {formatNumber(midpoint)}]
        </Button>
        <Button 
          onClick={() => onSelectInterval(false)}
          variant="outline"
          className="flex-1"
        >
          <CirclePlus className="mr-2" />
          Escolher [{formatNumber(midpoint)}, {formatNumber(upperBound)}]
        </Button>
      </div>
    </div>
  );
};

export default MidpointSelection;
