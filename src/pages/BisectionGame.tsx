
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts";
import { Check, X, CircleMinus, CirclePlus } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Types for our game state
interface GameState {
  currentLevel: number;
  attempts: number;
  score: number;
}

// Type for a function to solve
interface FunctionProblem {
  fn: (x: number) => number;
  expression: string;
  lowerBound: number;
  upperBound: number;
  solution: number;
  maxIterations: number;
}

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
  const [iterations, setIterations] = useState<Array<{lowerBound: number, upperBound: number, midpoint: number, fMid: number}>>([]);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  // Chart data
  const [chartData, setChartData] = useState<Array<{x: number, y: number}>>([]);
  
  // Available problems
  const problems: FunctionProblem[] = [
    {
      fn: (x) => x * x - 4,
      expression: "f(x) = x² - 4",
      lowerBound: 0,
      upperBound: 3,
      solution: 2,
      maxIterations: 5,
    },
    {
      fn: (x) => Math.sin(x),
      expression: "f(x) = sin(x)",
      lowerBound: 2.5,
      upperBound: 4,
      solution: Math.PI,
      maxIterations: 6,
    },
    {
      fn: (x) => x * x * x - x - 2,
      expression: "f(x) = x³ - x - 2",
      lowerBound: 1,
      upperBound: 2,
      solution: 1.521,
      maxIterations: 7,
    }
  ];
  
  const [currentProblem, setCurrentProblem] = useState<FunctionProblem>(problems[0]);
  
  // Initialize the game
  useEffect(() => {
    startLevel(gameState.currentLevel);
  }, []);
  
  // Generate chart data whenever the problem changes
  useEffect(() => {
    if (currentProblem) {
      generateChartData();
    }
  }, [currentProblem]);
  
  // Generate points for the chart
  const generateChartData = () => {
    const { lowerBound, upperBound, fn } = currentProblem;
    const range = upperBound - lowerBound;
    const step = range / 50;
    
    const data = [];
    for (let x = lowerBound - range * 0.2; x <= upperBound + range * 0.2; x += step) {
      data.push({
        x: Number(x.toFixed(2)),
        y: Number(fn(x).toFixed(4))
      });
    }
    
    setChartData(data);
  };
  
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
  
  // Format number for display
  const formatNumber = (num: number) => {
    return num.toFixed(4);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Jogo da Bisseção</h1>
      
      {gameComplete ? (
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Jogo Completo!</CardTitle>
            <CardDescription>
              Parabéns! Você completou todos os níveis do jogo da bisseção.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Pontuação final: {gameState.score}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => {
              setGameComplete(false);
              startLevel(1);
            }}>
              Jogar Novamente
            </Button>
          </CardFooter>
        </Card>
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
          
          {showHelp && (
            <Alert className="mb-4 animate-fade-in">
              <AlertTitle>Como jogar</AlertTitle>
              <AlertDescription>
                <p className="mb-2">O método da bisseção encontra raízes de funções dividindo o intervalo ao meio repetidamente.</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Observe o gráfico para entender o comportamento da função.</li>
                  <li>Clique em "Calcular Ponto Médio" para encontrar o ponto médio.</li>
                  <li>Escolha o subintervalo que contém a raiz (onde f(x) muda de sinal).</li>
                  <li>Continue até encontrar a aproximação da raiz.</li>
                </ol>
              </AlertDescription>
            </Alert>
          )}
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Encontre a raiz da função usando o método da bisseção</CardTitle>
              <CardDescription>
                {currentProblem.expression} no intervalo [{currentProblem.lowerBound}, {currentProblem.upperBound}]
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6">
                <ChartContainer
                  config={{
                    line: { theme: { light: "#2563eb", dark: "#3b82f6" } },
                    xAxis: { theme: { light: "#94a3b8", dark: "#64748b" } },
                    yAxis: { theme: { light: "#94a3b8", dark: "#64748b" } },
                    grid: { theme: { light: "#e2e8f0", dark: "#334155" } }
                  }}
                >
                  <ResponsiveContainer>
                    <Line
                      data={chartData}
                      dataKey="y"
                      name="f(x)"
                      type="monotone"
                      stroke="var(--color-line)"
                      dot={false}
                      isAnimationActive={true}
                    >
                      <CartesianGrid stroke="var(--color-grid)" />
                      <XAxis 
                        dataKey="x"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        label={{ value: 'x', position: 'insideBottomRight', offset: -5 }}
                        stroke="var(--color-xAxis)"
                      />
                      <YAxis 
                        label={{ value: 'f(x)', angle: -90, position: 'insideLeft' }}
                        stroke="var(--color-yAxis)"
                      />
                      <ReferenceLine y={0} stroke="#888" />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                    </Line>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
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
                <div className="mb-6 p-4 bg-secondary/20 rounded-md">
                  <h3 className="font-semibold mb-2">Ponto Médio: {formatNumber(midpoint)}</h3>
                  <p>f({formatNumber(midpoint)}) = {formatNumber(currentProblem.fn(midpoint))}</p>
                  <div className="flex gap-3 mt-4">
                    <Button 
                      onClick={() => selectNewInterval(true)}
                      variant="outline"
                      className="flex-1"
                    >
                      <CircleMinus className="mr-2" />
                      Escolher [{formatNumber(lowerBound)}, {formatNumber(midpoint)}]
                    </Button>
                    <Button 
                      onClick={() => selectNewInterval(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      <CirclePlus className="mr-2" />
                      Escolher [{formatNumber(midpoint)}, {formatNumber(upperBound)}]
                    </Button>
                  </div>
                </div>
              )}
              
              {iterations.length > 0 && (
                <div className="overflow-auto mb-6">
                  <h3 className="font-semibold mb-2">Histórico ({iterations.length}/{currentProblem.maxIterations} iterações)</h3>
                  <table className="w-full min-w-[500px] border-collapse">
                    <thead>
                      <tr className="bg-secondary/30">
                        <th className="p-2 text-left">Iteração</th>
                        <th className="p-2 text-left">a</th>
                        <th className="p-2 text-left">b</th>
                        <th className="p-2 text-left">m</th>
                        <th className="p-2 text-left">f(m)</th>
                        <th className="p-2 text-left">|b-a|</th>
                      </tr>
                    </thead>
                    <tbody>
                      {iterations.map((iter, idx) => (
                        <tr key={idx} className={idx % 2 ? "bg-secondary/10" : ""}>
                          <td className="p-2">{idx + 1}</td>
                          <td className="p-2">{formatNumber(iter.lowerBound)}</td>
                          <td className="p-2">{formatNumber(iter.upperBound)}</td>
                          <td className="p-2">{formatNumber(iter.midpoint)}</td>
                          <td className="p-2">{formatNumber(iter.fMid)}</td>
                          <td className="p-2">{formatNumber(Math.abs(iter.upperBound - iter.lowerBound))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
