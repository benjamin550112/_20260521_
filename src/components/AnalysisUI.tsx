import { useState } from "react";
import { Loader2, FileSpreadsheet } from "lucide-react";

interface Props {
  onAnalyze: (csvData: string) => Promise<void>;
  loading: boolean;
}

export default function AnalysisUI({ onAnalyze, loading }: Props) {
  const [csvData, setCsvData] = useState("");

  return (
    <div className="w-full p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-lg border border-indigo-500/20">
          <FileSpreadsheet size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">貼上您的 CSV 數據</h2>
          <p className="text-xs text-slate-400">支援標準的 CSV 文字格式，請包含欄位名稱行</p>
        </div>
      </div>

      <textarea
        value={csvData}
        onChange={(e) => setCsvData(e.target.value)}
        className="w-full h-64 p-4 bg-slate-950/80 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-slate-100 placeholder:text-slate-600 font-mono text-sm transition-all shadow-inner resize-y"
        placeholder={`商品,銷量,金額\n蘋果,100,3000\n香蕉,150,1500\n橘子,80,2400`}
      />

      <div className="flex justify-end">
        <button
          onClick={() => onAnalyze(csvData)}
          disabled={loading || !csvData.trim()}
          className="relative inline-flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:border-slate-800/50 disabled:shadow-none hover:shadow-lg hover:shadow-indigo-600/25 active:scale-[0.98] transition-all duration-200 border border-indigo-500/20 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>智能分析中...</span>
            </>
          ) : (
            <span>開始 AI 分析</span>
          )}
        </button>
      </div>
    </div>
  );
}
