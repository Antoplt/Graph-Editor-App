import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartType, ChartData } from '../App';

interface ChartDisplayProps {
  data: ChartData[];
  chartType: ChartType;
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export function ChartDisplay({
  data,
  chartType,
  title,
  xAxisLabel,
  yAxisLabel,
}: ChartDisplayProps) {
  // Get all series columns (excluding 'name')
  const seriesColumns = data.length > 0 
    ? Object.keys(data[0]).filter((key) => key !== 'name')
    : [];

  // Prepare data for pie chart
  const pieData = seriesColumns.map((series, index) => {
    const total = data.reduce((sum, row) => sum + (Number(row[series]) || 0), 0);
    return {
      name: series,
      value: total,
      fill: COLORS[index % COLORS.length],
    };
  });

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {seriesColumns.map((series, index) => (
                <Line
                  key={series}
                  type="monotone"
                  dataKey={series}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {seriesColumns.map((series, index) => (
                <Bar key={series} dataKey={series} fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'stackedBar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {seriesColumns.map((series, index) => (
                <Bar
                  key={series}
                  dataKey={series}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {seriesColumns.map((series, index) => (
                <Area
                  key={series}
                  type="monotone"
                  dataKey={series}
                  stackId="1"
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.6}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-center mb-6">{title}</h2>
      <div className="flex-1 min-h-0">
        {renderChart()}
      </div>
    </div>
  );
}
