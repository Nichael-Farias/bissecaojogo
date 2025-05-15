
import { useBisectionGame } from "@/hooks/useBisectionGame";
import InfoHeader from "@/components/bisection/InfoHeader";
import HelpSection from "@/components/bisection/HelpSection";
import MainGameCard from "@/components/bisection/MainGameCard";
import GameComplete from "@/components/bisection/GameComplete";

const BisectionGame = () => {
  const {
    gameState,
    lowerBound,
    setLowerBound,
    upperBound,
    setUpperBound,
    midpoint,
    iterations,
    gameComplete,
    showHelp,
    setShowHelp,
    chartData,
    currentProblem,
    calculateMidpoint,
    selectNewInterval,
    resetLevel,
    restartGame,
  } = useBisectionGame();

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Jogo da Bisseção</h1>

      {gameComplete ? (
        <GameComplete score={gameState.score} onRestart={restartGame} />
      ) : (
        <>
          <InfoHeader
            currentLevel={gameState.currentLevel}
            score={gameState.score}
            showHelp={showHelp}
            setShowHelp={setShowHelp}
          />
          {showHelp && <HelpSection />}
          <MainGameCard
            currentProblem={currentProblem}
            chartData={chartData}
            lowerBound={lowerBound}
            upperBound={upperBound}
            setLowerBound={setLowerBound}
            setUpperBound={setUpperBound}
            midpoint={midpoint}
            iterations={iterations}
            maxIterations={currentProblem.maxIterations}
            onSelectInterval={selectNewInterval}
            onCalculate={calculateMidpoint}
            onReset={resetLevel}
          />
        </>
      )}
    </div>
  );
};

export default BisectionGame;
