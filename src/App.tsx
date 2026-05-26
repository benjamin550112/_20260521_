import { useState } from "react";
import { Sparkles, Cpu, Check } from "lucide-react";
import AnalysisUI from "./components/AnalysisUI";
import ResultDisplay from "./components/ResultDisplay";

export default function App() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("gemini");

  const handleAnalyze = async (csvData: string) => {
    setLoading(true);
    setAnalysis("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData, provider: selectedProvider }),
      });
      const data = await response.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        alert("分析失敗，請稍後再試。");
      }
    } catch (error) {
      console.error(error);
      alert("分析失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-24 relative overflow-hidden">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

      <header className="max-w-4xl mx-auto pt-16 pb-8 px-6 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <Sparkles size={12} className="animate-pulse" /> Vercel Serverless Powered
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
          AI 數據分析與洞察工具
        </h1>
        <p className="max-w-2xl mx-auto text-base text-slate-400 md:text-lg">
          貼上您的 CSV 數據，由頂尖 AI 模型為您即時解讀、生成商業洞察與預測。
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Modern Provider Selection Panel */}
        <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <Cpu className="text-indigo-400 animate-pulse" size={20} />
            <h2 className="text-lg font-bold text-slate-200">選擇 AI 服務商與模型</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Google Gemini Card */}
            <button
              onClick={() => setSelectedProvider("gemini")}
              className={`relative flex flex-col items-start text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedProvider === "gemini"
                  ? "bg-blue-950/20 border-blue-500/60 shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/30"
                  : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
              }`}
            >
              {selectedProvider === "gemini" && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-1 shadow-md shadow-blue-500/20">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-400" />
                <h3 className="font-bold text-lg text-slate-100">Google Gemini</h3>
              </div>
              <p className="text-xs text-blue-400 font-mono mb-2">gemini-2.5-flash-lite</p>
              <p className="text-sm text-slate-400">
                最新輕量化高效模型，對數據趨勢、模式識別與結構化分析具備極佳的洞察力與極速回應。
              </p>
            </button>

            {/* NVIDIA Card */}
            <button
              onClick={() => setSelectedProvider("nvidia")}
              className={`relative flex flex-col items-start text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                selectedProvider === "nvidia"
                  ? "bg-emerald-950/20 border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30"
                  : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
              }`}
            >
              {selectedProvider === "nvidia" && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-1 shadow-md shadow-emerald-500/20">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <h3 className="font-bold text-lg text-slate-100">NVIDIA</h3>
              </div>
              <p className="text-xs text-emerald-400 font-mono mb-2">nvidia/nemotron-mini-4b-instruct</p>
              <p className="text-sm text-slate-400">
                專為精準指令遵循優化的小型高效模型，適合高準確度的文字摘要、大綱整理及深度的商務分析。
              </p>
            </button>
          </div>
        </section>

        {/* Input UI */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-lg">
          <AnalysisUI onAnalyze={handleAnalyze} loading={loading} />
        </div>

        {/* Output Display */}
        <ResultDisplay analysis={analysis} />
      </main>
    </div>
  );
}
