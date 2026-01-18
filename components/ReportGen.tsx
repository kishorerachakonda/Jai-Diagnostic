
import React, { useState } from 'react';
import { analyzeBloodReport } from '../services/geminiService';
import { FlaskConical, Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { TESTS } from '../constants';

export const ReportGen: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState(TESTS[0].id);
  const [readings, setReadings] = useState<Record<string, string>>({
    hemoglobin: '14.2',
    wbc: '6500',
    platelets: '250000'
  });
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const test = TESTS.find(t => t.id === selectedTest);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeBloodReport(test?.name || "Blood Test", readings);
    setAiInsight(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FlaskConical className="text-blue-600" />
            Result Entry
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Select Test Type</label>
              <select 
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
              >
                {TESTS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Patient ID</label>
              <input type="text" defaultValue="P1002" className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(readings).map(key => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 capitalize">{key}</label>
                  <input 
                    type="number" 
                    value={readings[key]}
                    onChange={(e) => setReadings({...readings, [key]: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              Generate AI Insights
            </button>
            <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Send size={20} />
              Publish Report
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <Sparkles size={18} />
            Smart Summary
          </h3>
          {aiInsight ? (
            <p className="text-sm leading-relaxed text-indigo-50 animate-in slide-in-from-bottom duration-500">
              {aiInsight}
            </p>
          ) : (
            <div className="text-sm text-indigo-200 italic">
              Click 'Generate AI Insights' to see a natural language analysis of these results.
            </div>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-amber-800 mb-1">Critical Value Protocol</p>
              <p className="text-[11px] text-amber-700">
                Values exceeding ±15% of biological reference interval will trigger immediate branch manager notification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
