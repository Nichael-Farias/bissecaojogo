
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartPoint } from "@/types/bisection-game";
import { Line, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts";

interface FunctionChartProps {
  chartData: ChartPoint[];
}

const FunctionChart = ({ chartData }: FunctionChartProps) => {
  return (
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
  );
};

export default FunctionChart;
