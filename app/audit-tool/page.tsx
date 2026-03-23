'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Search, AlertTriangle, CheckCircle, Info, FileDown, 
  Globe, LayoutTemplate, Zap, FileText, BadgeDollarSign 
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function AuditTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const reportRef = useRef<HTMLDivElement>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    setReport(null);
    
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to run audit');
      
      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { backgroundColor: '#0f172a' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`audit-report-${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-[#00b4a6]/30">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00b4a6] to-emerald-400 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Velora <span className="text-[#00b4a6]">Audit</span></h1>
          </div>
          {report && (
            <button 
              onClick={exportPDF}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
            >
              <FileDown className="w-4 h-4" />
              Export PDF
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Input Hero Section */}
        <section className="text-center mb-16 mt-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Analyze Your Travel Website
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Get instant insights into SEO, AdSense readiness, monetization potential, and performance to maximize your traffic revenue.
          </p>
          
          <form onSubmit={handleAudit} className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-slate-400 group-focus-within:text-[#00b4a6] transition-colors" />
            </div>
            <input
              type="text"
              required
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full pl-12 pr-40 py-5 bg-slate-900 border border-slate-800 rounded-2xl text-lg shadow-xl focus:ring-2 focus:ring-[#00b4a6] focus:border-transparent outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-8 bg-[#00b4a6] hover:bg-[#009b8f] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Run Audit'
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-400 flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}
        </section>

        {/* Dashboard Results */}
        <AnimatePresence>
          {report && (
            <motion.div 
              ref={reportRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              
              {/* TOP CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Score Ring */}
                <div className="md:col-span-1 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00b4a6]/10 to-transparent pointer-events-none" />
                  <h3 className="text-slate-400 font-medium mb-6 uppercase tracking-wider text-sm z-10">Overall Health Score</h3>
                  <div className="h-48 w-48 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart 
                        cx="50%" cy="50%" 
                        innerRadius="70%" outerRadius="100%" 
                        barSize={12} 
                        data={[{ name: 'Score', value: report.overallScore, fill: report.overallScore > 80 ? '#00b4a6' : report.overallScore > 50 ? '#eab308' : '#ef4444' }]} 
                        startAngle={90} endAngle={-270}
                      >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background={{ fill: '#1e293b' }} dataKey="value" cornerRadius={10} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black">{report.overallScore}</span>
                      <span className="text-slate-400 text-sm">/ 100</span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 z-10">
                    <span className="text-sm text-slate-400">Grade:</span>
                    <span className={`px-3 py-1 rounded-md font-bold text-lg 
                      ${report.letterGrade === 'A' ? 'bg-[#00b4a6]/20 text-[#00b4a6]' : 
                        ['B','C'].includes(report.letterGrade) ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'}`
                    }>
                      {report.letterGrade}
                    </span>
                  </div>
                </div>

                {/* Categories Breakdown */}
                <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                  <h3 className="text-slate-400 font-medium mb-6 uppercase tracking-wider text-sm">Performance by Category</h3>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'SEO', score: report.categories.seo.score * 5 }, // scale to 100
                          { name: 'AdSense', score: report.categories.adsense.score * 5 },
                          { name: 'Monetize', score: report.categories.monetization.score * 5 },
                          { name: 'Perf', score: report.categories.performance.score * 5 },
                          { name: 'Content', score: report.categories.content.score * 5 },
                        ]}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 13 }} axisLine={false} tickLine={false} />
                        <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 13 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: '#1e293b', opacity: 0.4 }}
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} 
                        />
                        <Bar dataKey="score" fill="#00b4a6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-px pt-8">
                {[
                  { id: 'overview', icon: LayoutTemplate, label: 'Action Plan' },
                  { id: 'seo', icon: Search, label: 'SEO Audit' },
                  { id: 'adsense', icon: BadgeDollarSign, label: 'AdSense' },
                  { id: 'monetization', icon: FileText, label: 'Monetization' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-colors border-b-2 
                      ${activeTab === tab.id ? 'border-[#00b4a6] text-[#00b4a6]' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB CONTENT */}
              <div className="py-6">
                
                {/* Overview / Action Plan */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-4">Actionable Recommendations</h3>
                    {report.recommendations.length === 0 ? (
                      <div className="p-6 bg-[#00b4a6]/10 border border-[#00b4a6]/20 rounded-2xl flex items-center gap-4 text-[#00b4a6]">
                        <CheckCircle className="w-6 h-6" />
                        <div>
                          <p className="font-semibold">Perfect Score!</p>
                          <p className="text-sm opacity-80">We found no immediate areas for improvement.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {report.recommendations.map((rec: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                            <div className="flex-shrink-0 mt-1">
                              {rec.priority === 'Critical' ? <AlertTriangle className="w-5 h-5 text-red-400" /> :
                               rec.priority === 'Important' ? <Info className="w-5 h-5 text-yellow-400" /> :
                               <CheckCircle className="w-5 h-5 text-blue-400" />
                              }
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-md
                                  ${rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                    rec.priority === 'Important' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-blue-500/20 text-blue-400'}`}
                                >
                                  {rec.priority}
                                </span>
                                <span className="text-xs text-slate-500 uppercase tracking-wider">{rec.category}</span>
                              </div>
                              <p className="text-slate-200">{rec.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(report.categories.seo.details).map(([key, value]: any) => (
                        <div key={key} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                          <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="text-lg font-medium truncate">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AdSense Tab */}
                {activeTab === 'adsense' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                      <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">Word Count</p>
                      <p className="text-3xl font-bold">{report.categories.adsense.details.wordCount}</p>
                      <p className="text-xs text-slate-500 mt-2">Optimal: &gt; 500 words</p>
                    </div>
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                      <p className="text-slate-400 text-sm mb-4 uppercase tracking-wider">Privacy Policy</p>
                      {report.categories.adsense.details.hasPrivacy ? 
                        <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-medium">Found</span> :
                        <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full font-medium">Missing</span>
                      }
                    </div>
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                      <p className="text-slate-400 text-sm mb-4 uppercase tracking-wider">Contact Page</p>
                      {report.categories.adsense.details.hasContact ? 
                        <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-medium">Found</span> :
                        <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full font-medium">Missing</span>
                      }
                    </div>
                  </div>
                )}

                {/* Monetization Tab */}
                {activeTab === 'monetization' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                      <p className="text-slate-400 text-sm mb-4 uppercase tracking-wider">Affiliate Links</p>
                      {report.categories.monetization.details.hasAffiliates ? 
                        <span className="inline-block px-4 py-1 bg-[#00b4a6]/20 text-[#00b4a6] rounded-full font-medium">Detected</span> :
                        <span className="inline-block px-4 py-1 bg-slate-800 text-slate-400 rounded-full font-medium">None Found</span>
                      }
                    </div>
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                      <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">CTA Buttons</p>
                      <p className="text-3xl font-bold">{report.categories.monetization.details.ctas}</p>
                    </div>
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                      <p className="text-slate-400 text-sm mb-4 uppercase tracking-wider">Email Capture</p>
                      {report.categories.monetization.details.emailCaptured ? 
                        <span className="inline-block px-4 py-1 bg-[#00b4a6]/20 text-[#00b4a6] rounded-full font-medium">Present</span> :
                        <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full font-medium">Missing</span>
                      }
                    </div>
                  </div>
                )}
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
