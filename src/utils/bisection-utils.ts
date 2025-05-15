
import { ChartPoint, FunctionProblem } from "@/types/bisection-game";

// Available problems
export const problems: FunctionProblem[] = [
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

// Generate chart data points for the function
export const generateChartData = (problem: FunctionProblem): ChartPoint[] => {
  const { lowerBound, upperBound, fn } = problem;
  const range = upperBound - lowerBound;
  const step = range / 50;
  
  const data = [];
  for (let x = lowerBound - range * 0.2; x <= upperBound + range * 0.2; x += step) {
    data.push({
      x: Number(x.toFixed(2)),
      y: Number(fn(x).toFixed(4))
    });
  }
  
  return data;
};

// Format number for display
export const formatNumber = (num: number) => {
  return num.toFixed(4);
};
