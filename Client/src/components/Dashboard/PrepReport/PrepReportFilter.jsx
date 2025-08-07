// Filter.jsx for Prep Section
import React from 'react';

const PrepReportFilters = ({ operators, shiftHours, shiftNames, filter, setFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Operator Name</label>
        <select
          name="operator"
          value={filter.operator}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          {operators.map((op, idx) => (
            <option key={idx} value={op}>{op}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Shift Hours</label>
        <select
          name="hours"
          value={filter.hours}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          {shiftHours.map((hr, idx) => (
            <option key={idx} value={hr}>{hr}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Shift Name</label>
        <select
          name="shift"
          value={filter.shift}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All</option>
          {shiftNames.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PrepReportFilters;
