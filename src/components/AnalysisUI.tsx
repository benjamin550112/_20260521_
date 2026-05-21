import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  onAnalyze: (csvData: string) => Promise<void>;
  loading: boolean;
}

export default function AnalysisUI({ onAnalyze, loading }: Props) {
  const [csvData, setCsvData] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">貼上 CSV 資料</h2>
      <textarea
        value={csvData}
        onChange={(e) => setCsvData(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        placeholder="請貼上您的 CSV 數據..."
      />
      <button
        onClick={() => onAnalyze(csvData)}
        disabled={loading || !csvData.trim()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" /> 分析中...
          </>
        ) : (
          "開始 AI 分析"
        )}
      </button>
    </div>
  );
}
