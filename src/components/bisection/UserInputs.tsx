
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/utils/bisection-utils";

interface UserInputsProps {
  lowerBound: number;
  upperBound: number;
  setLowerBound: (n: number) => void;
  setUpperBound: (n: number) => void;
  disabled: boolean;
}

const UserInputs = ({
  lowerBound,
  upperBound,
  setLowerBound,
  setUpperBound,
  disabled,
}: UserInputsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <div>
      <Label htmlFor="lowerBound" className="mb-2 block">
        Limite Inferior (a): {formatNumber(lowerBound)}
      </Label>
      <Input
        id="lowerBound"
        type="number"
        value={lowerBound}
        onChange={(e) => setLowerBound(Number(e.target.value))}
        disabled={disabled}
      />
    </div>
    <div>
      <Label htmlFor="upperBound" className="mb-2 block">
        Limite Superior (b): {formatNumber(upperBound)}
      </Label>
      <Input
        id="upperBound"
        type="number"
        value={upperBound}
        onChange={(e) => setUpperBound(Number(e.target.value))}
        disabled={disabled}
      />
    </div>
  </div>
);

export default UserInputs;

