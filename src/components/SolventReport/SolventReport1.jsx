import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Calendar, Download, RefreshCw, Activity } from 'lucide-react';

import Filters from './Filters';


const SolventReport1 = () => {
  const [parameters, setParameters] = useState([
    { name: 'Crude Oil Color', value: '32' },
    { name: 'Crude Oil Moisture', value: '0.25%' },
    { name: 'DORB Oil Moisture %', value: '11.30' },
    { name: 'Steam Consumed', value: '20.57 Ton' },
    { name: 'Electric Consumed (WBSECDL)', value: '2500 units' },
    { name: 'Electric Consumed (Solar)', value: '1000 units' },
    { name: 'Total Production', value: '682 mT' }
  ]);
  const [charts, setCharts] = useState([
     [
      { name: '00:00', value: 85 },
      { name: '04:00', value: 87 },
      { name: '08:00', value: 92 },
      { name: '12:00', value: 89 },
      { name: '16:00', value: 94 },
      { name: '20:00', value: 91 }
    ],
    [
      { name: 'Mon', value: 78 },
      { name: 'Tue', value: 82 },
      { name: 'Wed', value: 85 },
      { name: 'Thu', value: 79 },
      { name: 'Fri', value: 88 },
      { name: 'Sat', value: 84 }
    ],
    [
      { name: 'Jan', value: 145 },
      { name: 'Feb', value: 152 },
      { name: 'Mar', value: 138 },
      { name: 'Apr', value: 161 },
      { name: 'May', value: 147 },
      { name: 'Jun', value: 155 }
    ]
  ]);
  const [loading, setLoading] = useState(false);
  const [operators, setOperators] = useState([]);
  const [shiftHours, setShiftHours] = useState([]);
  const [shiftNames, setShiftNames] = useState([]);
  const [filter, setFilter] = useState({ operator: '', hours: '', shift: '' });

  const fetchDropdownOptions = async () => {
    try {
      const [opRes, hrRes, shRes] = await Promise.all([
        fetch('/api/solvent/operators'),
        fetch('/api/solvent/shift-hours'),
        fetch('/api/solvent/shift-names'),
      ]);

      const operators = await opRes.json();
      const hours = await hrRes.json();
      const shiftNames = await shRes.json();

      setOperators(operators);
      setShiftHours(hours);
      setShiftNames(shiftNames);
    } catch (err) {
      console.error('Failed to load dropdown options', err);
    }
  };

  const fetchSolventData = async ({ type, value }) => {
    setLoading(true);
    try {
      const body = { type, value, filter };

      const res = await fetch('/api/solvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      setParameters(json.parameters || []);
      setCharts(json.charts || [[], [], []]);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mt-25">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Solvent Report</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          operators={operators}
          shiftHours={shiftHours}
          shiftNames={shiftNames}
          filter={filter}
          setFilter={setFilter}
        />

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">Performance Parameters</h3>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {parameters.map((param, idx) => (
                    <div key={idx} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900">{param.name}</p>
                        <p className="text-lg font-bold text-blue-600">{param.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:col-span-2 space-y-8">
              {[0, 1, 2].map((index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className={`h-5 w-5 ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-emerald-600' : 'text-purple-600'}`} />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {index === 0 ? 'Operator wise Production Performance'
                        : index === 1 ? 'Operator Wise Steam Consumption'
                        : 'Operator Wise Electric Consumption'}
                    </h3>
                  </div>

                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={charts[index]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#8b5cf6'}
                        strokeWidth={3}
                        dot={{ r: 5, fill: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#8b5cf6' }}
                        activeDot={{ r: 7, fill: index === 0 ? '#1d4ed8' : index === 1 ? '#047857' : '#7c3aed' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolventReport1;
