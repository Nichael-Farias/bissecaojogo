
// Types for the bisection game
export interface GameState {
  currentLevel: number;
  attempts: number;
  score: number;
}

export interface FunctionProblem {
  fn: (x: number) => number;
  expression: string;
  lowerBound: number;
  upperBound: number;
  solution: number;
  maxIterations: number;
}

export interface Iteration {
  lowerBound: number;
  upperBound: number;
  midpoint: number;
  fMid: number;
}

export interface ChartPoint {
  x: number;
  y: number;
}
