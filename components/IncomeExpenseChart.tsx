import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface IncomeExpenseChartProps {
  data: { name: string; income: number; expense: number }[];
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  return (
    <div className="flex justify-center"> {/* Use flex to center the chart */}
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'Categories', position: 'insideBottomRight', offset: -5, fontWeight: 'bold' }} />
        <YAxis label={{ value: 'Amount', angle: -90, position: 'insideLeft', offset: 0, fontWeight: 'bold' }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontWeight: 'bold' }} />
        <Bar dataKey="income" fill="#82ca9d" />
        <Bar dataKey="expense" fill="#ff4d4f" />
      </BarChart>
    </div>
  );
}