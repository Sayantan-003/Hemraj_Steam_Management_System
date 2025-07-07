import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Download, RefreshCw, Activity } from 'lucide-react';
import DateSelector from '../DateSelector/DateSelector';
import PrepReportFilters from '../PrepReport/PrepReportFilter';

const PrepReport = () => {
  const [parameters, setParameters] = useState([
  { name: 'Steam Consumed', value: '4912 KG' },
  { name: 'Electric Consumed (WBSECDL)', value: '1156 units' },
  { name: 'Electric Consumed (Solar)', value: '1110 units' },
  { name: 'Total Production', value: '970.29 MT' }
  ]);
  const [charts, setCharts] = useState([
  [  { name: '00:00', value: 85 },
    { name: '04:00', value: 87 },
    { name: '08:00', value: 92 },
    { name: '12:00', value: 89 },
    { name: '16:00', value: 94 },
    { name: '20:00', value: 91 }
  ],
  [
    { name: 'Mon', value: 780 },
    { name: 'Tue', value: 820 },
    { name: 'Wed', value: 850 },
    { name: 'Thu', value: 790 },
    { name: 'Fri', value: 880 },
    { name: 'Sat', value: 840 }
  ],
  [
    { name: 'Jan', value: 1450 },
    { name: 'Feb', value: 1520 },
    { name: 'Mar', value: 1380 },
    { name: 'Apr', value: 1610 },
    { name: 'May', value: 1470 },
    { name: 'Jun', value: 1550 }
  ]
]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ operator: '', hours: '', shift: '' });
  const [operators, setOperators] = useState([]);
  const [shiftHours, setShiftHours] = useState([]);
  const [shiftNames, setShiftNames] = useState([]);

  const fetchPrepData = async ({ type, value }) => {
    setLoading(true);
    try {
      let url = '/api/prep?';

      if (type === 'date' && value) {
        const dateStr = value.toISOString().split('T')[0];
        url += `date=${dateStr}`;
      } else if (type === 'range' && value?.start && value?.end) {
        const startStr = value.start.toISOString().split('T')[0];
        const endStr = value.end.toISOString().split('T')[0];
        url += `start=${startStr}&end=${endStr}`;
      }

      if (filter.operator) url += `&operator=${filter.operator}`;
      if (filter.hours) url += `&hours=${filter.hours}`;
      if (filter.shift) url += `&shift=${filter.shift}`;

      const res = await fetch(url);
      const json = await res.json();

      setParameters(json.parameters || []);
      setCharts(json.charts || [[], [], []]);
    } catch (err) {
      console.error('Error loading Prep Report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch dropdown values
    const fetchDropdowns = async () => {
      const [opRes, hrRes, shiftRes] = await Promise.all([
        fetch('/api/prep/operators'),
        fetch('/api/prep/shifthours'),
        fetch('/api/prep/shiftnames')
      ]);
      const [ops, hrs, shifts] = await Promise.all([
        opRes.json(),
        hrRes.json(),
        shiftRes.json()
      ]);
      setOperators(ops);
      setShiftHours(hrs);
      setShiftNames(shifts);
    };
    fetchDropdowns();
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
                <h1 className="text-3xl font-bold text-gray-900">Prep Report</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => fetchPrepData({ type: 'date', value: new Date() })}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
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
        <PrepReportFilters
          operators={operators}
          shiftHours={shiftHours}
          shiftNames={shiftNames}
          filter={filter}
          setFilter={setFilter}
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
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
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{param.name}</p>
                        <p className="text-lg font-bold text-blue-600">{param.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="xl:col-span-2 space-y-8">
              {charts.map((chartData, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Operator Wise
                      {[' Production', ' Steam Consumed', ' Unit Consumed'][idx]} 
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={idx === 0 ? 280 : 250}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
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

export default PrepReport;
