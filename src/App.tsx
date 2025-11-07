import { useState, useRef } from 'react';
import { DataTable } from './components/DataTable';
import { ChartDisplay } from './components/ChartDisplay';
import { ChartTypeSelector } from './components/ChartTypeSelector';
import { ConfigPanel } from './components/ConfigPanel';
import { Button } from './components/ui/button';
import { Download } from 'lucide-react';
import { Resizable } from 're-resizable';
import { toPng } from 'html-to-image';

export type ChartType = 'line' | 'bar' | 'stackedBar' | 'area' | 'pie';

export interface ChartData {
  [key: string]: string | number;
}

export default function App() {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [title, setTitle] = useState('Chart Title');
  const [xAxisLabel, setXAxisLabel] = useState('X Axis');
  const [yAxisLabel, setYAxisLabel] = useState('Y Axis');
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [data, setData] = useState<ChartData[]>([
    { name: 'Jan', series1: 400, series2: 240 },
    { name: 'Feb', series1: 300, series2: 139 },
    { name: 'Mar', series1: 200, series2: 980 },
    { name: 'Apr', series1: 278, series2: 390 },
    { name: 'May', series1: 189, series2: 480 },
  ]);

  const chartRef = useRef<HTMLDivElement>(null);

  const exportToPNG = async () => {
    if (!chartRef.current) {
      setErrorMessage("Erreur: La référence au graphique n'existe pas.");
      return;
    }
    
    setErrorMessage(''); // Réinitialise l'erreur

    // --- STRATÉGIE NPM / 'html-to-image' ---
    
    // 1. Forcer la perte de focus (toujours une bonne idée)
    if (document.activeElement && typeof (document.activeElement as HTMLElement).blur === 'function') {
      (document.activeElement as HTMLElement).blur();
    }

    // 2. Attendre que le 'blur' soit effectif
    await new Promise(resolve => setTimeout(resolve, 50)); 
    
    const domNode = chartRef.current;

    try {
      // 3. Appel direct à 'html-to-image' (plus de loadScript !)
      const dataUrl = await toPng(domNode, {
        backgroundColor: '#ffffff',
        // Cette bibliothèque gère bien mieux le CSS,
        // les options 'style' et 'pseudo' ne sont probablement pas nécessaires.
      });
      
      // 4. Créer le lien de téléchargement
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_') || 'graphique'}.png`;
      link.href = dataUrl;
      link.click();

    } catch (error: any) {
      console.error('Erreur lors de l_exportation en PNG:', error);
      // Gérer les erreurs de 'html-to-image'
      let message = error.message;
      if (error.message && error.message.includes('Resource')) {
        message = "Impossible de charger une ressource externe (ex: image) pour l'export. " + error.message;
      }
      setErrorMessage(`Erreur d'exportation: ${message}`);
    } 
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shrink-0">
        <h1>Graph Editor</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Panel - Data Table - Resizable */}
        <Resizable
          size={{ width: leftPanelWidth, height: '100%' }}
          onResizeStop={(e, direction, ref, d) => {
            setLeftPanelWidth(leftPanelWidth + d.width);
          }}
          minWidth={250}
          maxWidth="50%"
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            right: {
              width: '8px',
              right: '-4px',
              cursor: 'col-resize',
              backgroundColor: 'transparent',
            },
          }}
          handleClasses={{
            right: 'hover:bg-blue-500 hover:bg-opacity-20 transition-colors',
          }}
          className="border-r bg-white shrink-0"
        >
          <div className="p-6 h-full overflow-auto">
            <h2 className="mb-4">Data</h2>
            <DataTable data={data} setData={setData} />
          </div>
        </Resizable>

        {/* Right Panel - Chart and Controls */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar - Config */}
          <div className="bg-white border-b p-4 shrink-0">
            <ConfigPanel
              title={title}
              setTitle={setTitle}
              xAxisLabel={xAxisLabel}
              setXAxisLabel={setXAxisLabel}
              yAxisLabel={yAxisLabel}
              setYAxisLabel={setYAxisLabel}
            />
          </div>

          {/* Chart Display */}
          <div className="flex-1 flex flex-col p-6 min-h-0 overflow-hidden">
            <div className="flex-1 mb-6 min-h-0">
              <div ref={chartRef} className="bg-white rounded-lg p-6 shadow-sm h-full">
                <ChartDisplay
                  data={data}
                  chartType={chartType}
                  title={title}
                  xAxisLabel={xAxisLabel}
                  yAxisLabel={yAxisLabel}
                />
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="bg-white border rounded-lg p-4 flex items-center justify-center gap-4 shrink-0">
              <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
              <div className="h-8 w-px bg-gray-300"></div>
              <Button onClick={exportToPNG} variant="default" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PNG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}