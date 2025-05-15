
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

// Types
import { GameState, FunctionProblem, Iteration, ChartPoint } from "@/types/bisection-game";

// Utils
import { problems, generateChartData, formatNumber } from "@/utils/bisection-utils";

// Components
import FunctionChart from "@/components/bisection/FunctionChart";
import IterationsTable from "@/components/bisection/IterationsTable";
import MidpointSelection from "@/components/bisection/MidpointSelection";
import HelpSection from "@/components/bisection/HelpSection";
import GameComplete from "@/components/bisection/GameComplete";

const BisectionGame = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    attempts: 0,
    score: 0,
  });
  
  // User's guesses
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(0);
  const [midpoint, setMidpoint] = useState<number | null>(null);
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  // Chart data
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [currentProblem, setCurrentProblem] = useState<FunctionProblem>(problems[0]);
  
  // Initialize the game
  useEffect(() => {
    startLevel(gameState.currentLevel);
  }, []);
  
  // Generate chart data whenever the problem changes
  useEffect(() => {
    if (currentProblem) {
      setChartData(generateChartData(currentProblem));
    }
  }, [currentProblem]);
  
  // Start a new level
  const startLevel = (level: number) => {
    if (level <= problems.length) {
      const problem = problems[level - 1];
      setCurrentProblem(problem);
      setLowerBound(problem.lowerBound);
      setUpperBound(problem.upperBound);
      setMidpoint(null);
      setIterations([]);
      setGameState({
        ...gameState,
        currentLevel: level,
        attempts: 0
      });
    } else {
      setGameComplete(true);
      toast.success("Parabéns! Você completou todos os níveis!");
    }
  };
  
  // Calculate midpoint
  const calculateMidpoint = () => {
    const mid = (lowerBound + upperBound) / 2;
    const fMid = currentProblem.fn(mid);
    
    setMidpoint(mid);
    setIterations([...iterations, {
      lowerBound,
      upperBound,
      midpoint: mid,
      fMid
    }]);
    
    setGameState({
      ...gameState,
      attempts: gameState.attempts + 1
    });
  };
  
  // Select new interval
  const selectNewInterval = (chooseLower: boolean) => {
    if (midpoint === null) return;
    
    const fMid = currentProblem.fn(midpoint);
    const fLower = currentProblem.fn(lowerBound);
    
    // If signs are different, the root is in that interval
    const rootInLowerHalf = (fLower * fMid) < 0;
    
    if ((chooseLower && rootInLowerHalf) || (!chooseLower && !rootInLowerHalf)) {
      // Correct choice
      if (chooseLower) {
        setUpperBound(midpoint);
      } else {
        setLowerBound(midpoint);
      }
      
      setGameState({
        ...gameState,
        score: gameState.score + 10
      });
      
      toast.success("Escolha correta! +10 pontos");
      
      // Check if we're close enough to the solution
      if (Math.abs(upperBound - lowerBound) < 0.05 || iterations.length >= currentProblem.maxIterations) {
        toast.success(`Nível ${gameState.currentLevel} completo!`);
        // Move to next level after a delay
        setTimeout(() => {
          startLevel(gameState.currentLevel + 1);
        }, 2000);
      }
    } else {
      // Incorrect choice
      toast.error("Escolha incorreta! Tente novamente.");
      setGameState({
        ...gameState,
        score: Math.max(0, gameState.score - 5)
      });
    }
    
    setMidpoint(null);
  };
  
  // Reset the current level
  const resetLevel = () => {
    startLevel(gameState.currentLevel);
  };
  
  // Restart the game
  const restartGame = () => {
    setGameComplete(false);
    startLevel(1);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Jogo da Bisseção</h1>
      
      {gameComplete ? (
        <GameComplete score={gameState.score} onRestart={restartGame} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Nível {gameState.currentLevel}/{problems.length}</h2>
              <p>Pontuação: {gameState.score}</p>
            </div>
            <div>
              <Button variant="outline" onClick={() => setShowHelp(!showHelp)}>
                {showHelp ? "Ocultar Ajuda" : "Mostrar Ajuda"}
              </Button>
            </div>
          </div>
          
          {showHelp && <HelpSection />}
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Encontre a raiz da função usando o método da bisseção</CardTitle>
              <CardDescription>
                {currentProblem.expression} no intervalo [{currentProblem.lowerBound}, {currentProblem.upperBound}]
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FunctionChart chartData={chartData} />
              
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
                    disabled={iterations.length > 0}
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
                    disabled={iterations.length > 0}
                  />
                </div>
              </div>
              
              {midpoint !== null && (
                <MidpointSelection 
                  midpoint={midpoint}
                  lowerBound={lowerBound}
                  upperBound={upperBound}
                  fMid={currentProblem.fn(midpoint)}
                  onSelectInterval={selectNewInterval}
                />
              )}
              
              <IterationsTable 
                iterations={iterations} 
                maxIterations={currentProblem.maxIterations} 
              />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button
                onClick={calculateMidpoint}
                disabled={midpoint !== null}
                className="flex-1"
              >
                Calcular Ponto Médio
              </Button>
              <Button
                onClick={resetLevel}
                variant="outline"
                className="flex-1"
              >
                Reiniciar Nível
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default BisectionGame;
