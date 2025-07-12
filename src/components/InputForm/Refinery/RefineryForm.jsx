import React, { useState } from 'react';

const RefineryForm = () => {
  const [shiftHours, setShiftHours] = useState('');
  const [shiftName, setShiftName] = useState('');

  const shiftNameOptions = {
    '8': ['Shift A', 'Shift B', 'Shift C'],
    '12': [
      'Shift A + Shift B(1/2)',
      'Shift B + Shift C(1/2)',
      'Shift C + Shift A(1/2)',
      'Shift A(1/2) + Shift B',
      'Shift B(1/2) + Shift C',
      'Shift C(1/2) + Shift A',
    ],
    '16': ['Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A'],
    '24': ['Shift A + Shift B + Shift C'],
  };

  const getNumberOfSteamFields = (hours) => {
    switch (hours) {
      case '8': return 1;
      case '12':
      case '16': return 2;
      case '24': return 3;
      default: return 0;
    }
  };

  const numberOfSteamFields = getNumberOfSteamFields(shiftHours);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen" style={{ backgroundColor: '#EEE5D5' }}>
      {/* Header */}
      <div className="rounded-xl shadow-md mb-6 p-4 text-center" style={{ backgroundColor: '#F1B854' }}>
        <h1 className="text-2xl font-bold text-gray-800">Refinery Form</h1>
      </div>

      {/* De-Gumming + Bleaching Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#F0CB8A' }}>De-Gumming + Bleaching Section</h2>

        {/* Operator Details */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Operator Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Operator Name</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="">Select</option>
                <option value="Operator 1">Operator 1</option>
                <option value="Operator 2">Operator 2</option>
                <option value="Operator 3">Operator 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={shiftHours}
                onChange={(e) => {
                  setShiftHours(e.target.value);
                  setShiftName('');
                }}
              >
                <option value="">Select</option>
                <option value="8">8 Hours</option>
                <option value="12">12 Hours</option>
                <option value="16">16 Hours</option>
                <option value="24">24 Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Name</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
                disabled={!shiftHours}
              >
                <option value="">Select</option>
                {shiftHours && shiftNameOptions[shiftHours]?.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Entries */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Data Entries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Dip/Gap Measured in COT 4", "Dip/Gap Measured in COT 3", "Dip/Gap Measured in Bleacher 1", "Dip/Gap Measured in Bleacher 2", "Dip/Gap Measured in Bleacher 3"].map((label, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter value"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Steam Consumption Entries */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Steam Consumption Entries</h3>
          {numberOfSteamFields > 0 ? (
            Array.from({ length: numberOfSteamFields }, (_, i) => (
              <div key={i} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Steam used in {shiftName || 'Shift'} {numberOfSteamFields > 1 ? `(${i + 1})` : ''}
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter amount"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Select shift hours to enter steam usage</p>
          )}
        </div>
      </div>

      {/* Alpha Section Placeholder */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#F0CB8A' }}>Alpha Section</h2>
        <p className="text-sm text-gray-600">(More content can be added here)</p>
      </div>
    </div>
  );
};

export default RefineryForm;
