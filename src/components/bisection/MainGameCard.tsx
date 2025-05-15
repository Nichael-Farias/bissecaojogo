
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FunctionProblem, Iteration } from "@/types/bisection-game";
import FunctionChart from "./FunctionChart";
import UserInputs from "./UserInputs";
import MidpointSelection from "./MidpointSelection";
import IterationsTable from "./IterationsTable";
import LevelControls from "./LevelControls";
import { formatNumber } from "@/utils/bisection-utils";

interface MainGameCardProps {
  currentProblem: FunctionProblem;
  chartData: any[];
  lowerBound: number;
  upperBound: number;
  setLowerBound: (n: number) => void;
  setUpperBound: (n: number) => void;
  midpoint: number | null;
  iterations: Iteration[];
  maxIterations: number;
  onSelectInterval: (chooseLower: boolean) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const MainGameCard = ({
  currentProblem,
  chartData,
  lowerBound,
  upperBound,
  setLowerBound,
  setUpperBound,
  midpoint,
  iterations,
  maxIterations,
  onSelectInterval,
  onCalculate,
  onReset,
}: MainGameCardProps) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Encontre a raiz da função usando o método da bisseção</CardTitle>
      <CardDescription>
        {currentProblem.expression} no intervalo [{currentProblem.lowerBound}, {currentProblem.upperBound}]
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FunctionChart chartData={chartData} />
      <UserInputs
        lowerBound={lowerBound}
        upperBound={upperBound}
        setLowerBound={setLowerBound}
        setUpperBound={setUpperBound}
        disabled={iterations.length > 0}
      />
      {midpoint !== null && (
        <MidpointSelection
          midpoint={midpoint}
          lowerBound={lowerBound}
          upperBound={upperBound}
          fMid={currentProblem.fn(midpoint)}
          onSelectInterval={onSelectInterval}
        />
      )}
      <IterationsTable iterations={iterations} maxIterations={maxIterations} />
    </CardContent>
    <CardFooter>
      <LevelControls
        onCalculate={onCalculate}
        calculateDisabled={midpoint !== null}
        onReset={onReset}
      />
    </CardFooter>
  </Card>
);

export default MainGameCard;

