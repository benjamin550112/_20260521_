import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">分析結果</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "已複製" : "複製結果"}
        </button>
      </div>
      <div className="prose prose-blue max-w-none bg-white p-6 rounded-lg border border-gray-200">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </div>
    </div>
  );
}
