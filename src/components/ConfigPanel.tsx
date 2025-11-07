import { Input } from './ui/input';
import { Label } from './ui/label';

interface ConfigPanelProps {
  title: string;
  setTitle: (title: string) => void;
  xAxisLabel: string;
  setXAxisLabel: (label: string) => void;
  yAxisLabel: string;
  setYAxisLabel: (label: string) => void;
}

export function ConfigPanel({
  title,
  setTitle,
  xAxisLabel,
  setXAxisLabel,
  yAxisLabel,
  setYAxisLabel,
}: ConfigPanelProps) {
  return (
    <div className="flex gap-4 items-end">
      <div className="space-y-1">
        <Label htmlFor="title" className="text-xs">Chart Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-9 w-48"
          placeholder="Chart Title"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="xAxis" className="text-xs">X Axis Label</Label>
        <Input
          id="xAxis"
          value={xAxisLabel}
          onChange={(e) => setXAxisLabel(e.target.value)}
          className="h-9 w-32"
          placeholder="X Axis"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="yAxis" className="text-xs">Y Axis Label</Label>
        <Input
          id="yAxis"
          value={yAxisLabel}
          onChange={(e) => setYAxisLabel(e.target.value)}
          className="h-9 w-32"
          placeholder="Y Axis"
        />
      </div>
    </div>
  );
}
