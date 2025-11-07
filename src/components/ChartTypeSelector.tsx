import { ChartType } from '../App';
import { Button } from './ui/button';
import { LineChart, BarChart3, BarChart4, AreaChart, PieChart } from 'lucide-react';

interface ChartTypeSelectorProps {
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

const chartTypes: { type: ChartType; icon: React.ReactNode; label: string }[] = [
  { type: 'line', icon: <LineChart className="w-4 h-4" />, label: 'Line' },
  { type: 'bar', icon: <BarChart3 className="w-4 h-4" />, label: 'Bar' },
  { type: 'stackedBar', icon: <BarChart4 className="w-4 h-4" />, label: 'Stacked Bar' },
  { type: 'area', icon: <AreaChart className="w-4 h-4" />, label: 'Area' },
  { type: 'pie', icon: <PieChart className="w-4 h-4" />, label: 'Pie' },
];

export function ChartTypeSelector({ chartType, setChartType }: ChartTypeSelectorProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
      {chartTypes.map(({ type, icon, label }) => (
        <Button
          key={type}
          variant={chartType === type ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setChartType(type)}
          className="flex items-center gap-2"
          title={label}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}
