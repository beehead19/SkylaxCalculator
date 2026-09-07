"use client";
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Home() {
  const [mode, setMode] = useState('basic');
  const [revenue, setRevenue] = useState('');
  const [cost, setCost] = useState('');
  const [expenses, setExpenses] = useState({
    rent: '',
    salaries: '',
    utilities: '',
    marketing: '',
    other: ''
  });
  const [quantity, setQuantity] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateMargin = () => {
    const rev = parseFloat(revenue) || 0;
    const cst = parseFloat(cost) || 0;
    const qty = parseFloat(quantity) || 1;
    
    const totalExpenses = Object.values(expenses).reduce((sum: number, val: any) => sum + (parseFloat(val) || 0), 0);
    const totalCost = cst + totalExpenses;
    const grossProfit = rev - cst;
    const netProfit = rev - totalCost;
    
    const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
    const netMargin = rev > 0 ? (netProfit / rev) * 100 : 0;
    const profitPerUnit = qty > 0 ? netProfit / qty : 0;

    setResults({
      revenue: rev,
      cost: cst,
      totalExpenses,
      grossProfit,
      netProfit,
      grossMargin,
      netMargin,
      profitPerUnit,
      chartData: [
        { name: 'Cost of Goods', value: cst, color: '#DC2626' },
        { name: 'Operating Expenses', value: totalExpenses, color: '#7F1D1D' },
        { name: 'Net Profit', value: netProfit > 0 ? netProfit : 0, color: '#10B981' }
      ]
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  SkylaxCalculator
                </h1>
                <p className="text-xs text-gray-400">Profit Margin Calculator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-wrap gap-3">
          {['basic', 'advanced'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                mode === m 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {m} Mode
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                Revenue & Costs
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Total Revenue (KES)</label>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Cost of Goods Sold (KES)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                  />
                </div>

                {mode === 'advanced' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Quantity Sold</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="1"
                      className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            {mode === 'advanced' && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                  Operating Expenses
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(expenses).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">{key}</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setExpenses({...expenses, [key]: e.target.value})}
                        placeholder="0"
                        className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={calculateMargin}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/30 transform hover:scale-[1.02] transition-all text-lg"
            >
              Calculate Profit Margin
            </button>
          </div>

          <div className="space-y-6">
            {results ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-700/50 rounded-2xl p-6">
                    <p className="text-green-400 text-sm mb-1">Net Profit</p>
                    <p className={`text-3xl font-bold ${results.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatCurrency(results.netProfit)}
                    </p>
                    <p className="text-green-400/70 text-sm mt-2">{results.netMargin.toFixed(2)}% margin</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/50 rounded-2xl p-6">
                    <p className="text-blue-400 text-sm mb-1">Gross Profit</p>
                    <p className="text-3xl font-bold text-blue-400">
                      {formatCurrency(results.grossProfit)}
                    </p>
                    <p className="text-blue-400/70 text-sm mt-2">{results.grossMargin.toFixed(2)}% margin</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Profit Breakdown</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={results.chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {results.chartData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold mb-4">Detailed Analysis</h3>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Total Revenue</span>
                    <span className="font-semibold">{formatCurrency(results.revenue)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Total Costs</span>
                    <span className="font-semibold text-red-400">{formatCurrency(results.cost + results.totalExpenses)}</span>
                  </div>

                  {mode === 'advanced' && (
                     <div className="flex justify-between items-center py-3 border-b border-gray-800">
                     <span className="text-gray-400">Profit Per Unit</span>
                     <span className="font-semibold text-yellow-400">{formatCurrency(results.profitPerUnit)}</span>
                   </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-gray-900/30 border border-gray-800 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-400 text-lg">Enter your numbers and click Calculate</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}