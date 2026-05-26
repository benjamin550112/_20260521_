import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, BarChart3 } from "lucide-react";

interface Props {
  analysis: string;
}

export default function ResultDisplay({ analysis }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!analysis) return null;

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-emerald-400" size={22} />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">AI 分析結果與商業建議</h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-850 hover:border-slate-700 text-slate-300 transition-all active:scale-95 cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check size={15} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">已複製到剪貼簿</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>複製分析結果</span>
            </>
          )}
        </button>
      </div>

      <div className="prose prose-invert prose-indigo max-w-none bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-800/80 shadow-2xl leading-relaxed text-slate-300">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </div>
    </div>
  );
}
