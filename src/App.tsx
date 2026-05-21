/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import AnalysisUI from "./components/AnalysisUI";
import ResultDisplay from "./components/ResultDisplay";

export default function App() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (csvData: string) => {
    setLoading(true);
    setAnalysis("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData }),
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
    <div className="min-h-screen bg-gray-50 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          AI 數據分析與洞察工具
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          貼上您的 CSV 數據，讓 AI 為您揭示隱藏的洞察。
        </p>
      </header>
      <main>
        <AnalysisUI onAnalyze={handleAnalyze} loading={loading} />
        <ResultDisplay analysis={analysis} />
      </main>
    </div>
  );
}
