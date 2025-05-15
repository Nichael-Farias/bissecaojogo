
import { useEffect, useState } from "react";
import { problems, generateChartData } from "@/utils/bisection-utils";
import { GameState, FunctionProblem, Iteration, ChartPoint } from "@/types/bisection-game";
import { toast } from "@/components/ui/sonner";

export function useBisectionGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    attempts: 0,
    score: 0,
  });
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(0);
  const [midpoint, setMidpoint] = useState<number | null>(null);
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [currentProblem, setCurrentProblem] = useState<FunctionProblem>(problems[0]);

  useEffect(() => {
    startLevel(gameState.currentLevel);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setChartData(generateChartData(currentProblem));
  }, [currentProblem]);

  const startLevel = (level: number) => {
    if (level <= problems.length) {
      const problem = problems[level - 1];
      setCurrentProblem(problem);
      setLowerBound(problem.lowerBound);
      setUpperBound(problem.upperBound);
      setMidpoint(null);
      setIterations([]);
      setGameState((prev) => ({
        ...prev,
        currentLevel: level,
        attempts: 0,
      }));
    } else {
      setGameComplete(true);
      toast.success("Parabéns! Você completou todos os níveis!");
    }
  };

  const calculateMidpoint = () => {
    const mid = (lowerBound + upperBound) / 2;
    const fMid = currentProblem.fn(mid);

    setMidpoint(mid);
    setIterations((prev) => [
      ...prev,
      {
        lowerBound,
        upperBound,
        midpoint: mid,
        fMid,
      },
    ]);

    setGameState((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }));
  };

  const selectNewInterval = (chooseLower: boolean) => {
    if (midpoint === null) return;

    const fMid = currentProblem.fn(midpoint);
    const fLower = currentProblem.fn(lowerBound);

    const rootInLowerHalf = fLower * fMid < 0;

    if ((chooseLower && rootInLowerHalf) || (!chooseLower && !rootInLowerHalf)) {
      if (chooseLower) {
        setUpperBound(midpoint);
      } else {
        setLowerBound(midpoint);
      }

      setGameState((prev) => ({
        ...prev,
        score: prev.score + 10,
      }));

      toast.success("Escolha correta! +10 pontos");

      if (Math.abs(upperBound - lowerBound) < 0.05 || iterations.length >= currentProblem.maxIterations) {
        toast.success(`Nível ${gameState.currentLevel} completo!`);
        setTimeout(() => {
          startLevel(gameState.currentLevel + 1);
        }, 2000);
      }
    } else {
      toast.error("Escolha incorreta! Tente novamente.");
      setGameState((prev) => ({
        ...prev,
        score: Math.max(0, prev.score - 5),
      }));
    }

    setMidpoint(null);
  };

  const resetLevel = () => startLevel(gameState.currentLevel);

  const restartGame = () => {
    setGameComplete(false);
    startLevel(1);
  };

  return {
    gameState,
    lowerBound,
    setLowerBound,
    upperBound,
    setUpperBound,
    midpoint,
    setMidpoint,
    iterations,
    setIterations,
    gameComplete,
    setGameComplete,
    showHelp,
    setShowHelp,
    chartData,
    currentProblem,
    startLevel,
    calculateMidpoint,
    selectNewInterval,
    resetLevel,
    restartGame,
  };
}
