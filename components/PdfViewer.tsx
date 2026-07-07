"use client";

interface Props {
  url: string;
  title: string;
}

export default function PdfViewer({ url, title }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <a href={url} download rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition">
          Download PDF ↓
        </a>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="border border-slate-300 text-slate-700 hover:border-green-500 hover:text-green-700 font-semibold px-6 py-3 rounded-lg text-sm transition">
          Open PDF in browser ↗
        </a>
      </div>
      <div className="border border-slate-200 rounded-xl bg-slate-50 px-6 py-8 flex flex-col items-center gap-3 text-center">
        <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="font-semibold text-slate-700">{title}</p>
        <p className="text-sm text-slate-500 max-w-xs">
          Click <strong>Open PDF in browser</strong> above to view the manual — your browser will display it natively.
        </p>
      </div>
    </div>
  );
}
