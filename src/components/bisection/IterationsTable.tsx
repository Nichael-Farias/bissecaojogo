
import { Iteration } from "@/types/bisection-game";
import { formatNumber } from "@/utils/bisection-utils";

interface IterationsTableProps {
  iterations: Iteration[];
  maxIterations: number;
}

const IterationsTable = ({ iterations, maxIterations }: IterationsTableProps) => {
  if (iterations.length === 0) return null;
  
  return (
    <div className="overflow-auto mb-6">
      <h3 className="font-semibold mb-2">Histórico ({iterations.length}/{maxIterations} iterações)</h3>
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
  );
};

export default IterationsTable;
