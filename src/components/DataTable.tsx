import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { ChartData } from '../App';

interface DataTableProps {
  data: ChartData[];
  setData: (data: ChartData[]) => void;
}

export function DataTable({ data, setData }: DataTableProps) {
  const columns = data.length > 0 ? Object.keys(data[0]) : ['name'];
  const [editingColumn, setEditingColumn] = useState<{ oldName: string; newName: string } | null>(null);

  const addRow = () => {
    const newRow: ChartData = {};
    columns.forEach((col) => {
      newRow[col] = col === 'name' ? `Row ${data.length + 1}` : 0;
    });
    setData([...data, newRow]);
  };

  const deleteRow = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const addColumn = () => {
    const newColName = `series${columns.length}`;
    const newData = data.map((row) => ({
      ...row,
      [newColName]: 0,
    }));
    setData(newData);
  };

  const deleteColumn = (colName: string) => {
    if (colName === 'name') return; // Don't allow deleting the name column
    const newData = data.map((row) => {
      const { [colName]: _, ...rest } = row;
      return rest;
    });
    setData(newData);
  };

  const updateCell = (rowIndex: number, colName: string, value: string) => {
    const newData = [...data];
    if (colName === 'name') {
      newData[rowIndex][colName] = value;
    } else {
      newData[rowIndex][colName] = parseFloat(value) || 0;
    }
    setData(newData);
  };

  const startEditingColumn = (colName: string) => {
    setEditingColumn({ oldName: colName, newName: colName });
  };

  const updateColumnNameInput = (newName: string) => {
    if (editingColumn) {
      setEditingColumn({ ...editingColumn, newName });
    }
  };

  const finishEditingColumn = () => {
    if (editingColumn && editingColumn.newName.trim() && editingColumn.newName !== editingColumn.oldName) {
      const newData = data.map((row) => {
        const { [editingColumn.oldName]: value, ...rest } = row;
        return { ...rest, [editingColumn.newName]: value };
      });
      setData(newData);
    }
    setEditingColumn(null);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className="border border-gray-300 p-2 bg-gray-50">
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      value={editingColumn?.oldName === col ? editingColumn.newName : col}
                      onFocus={() => startEditingColumn(col)}
                      onChange={(e) => updateColumnNameInput(e.target.value)}
                      onBlur={finishEditingColumn}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          finishEditingColumn();
                        }
                      }}
                      className="h-8 text-center"
                    />
                    {col !== 'name' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteColumn(col)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </th>
              ))}
              <th className="border border-gray-300 p-2 bg-gray-50 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col} className="border border-gray-300 p-2">
                    <Input
                      type={col === 'name' ? 'text' : 'number'}
                      value={row[col]}
                      onChange={(e) => updateCell(rowIndex, col, e.target.value)}
                      className="h-8"
                    />
                  </td>
                ))}
                <td className="border border-gray-300 p-2 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRow(rowIndex)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <Button onClick={addRow} variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Row
        </Button>
        <Button onClick={addColumn} variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Column
        </Button>
      </div>
    </div>
  );
}