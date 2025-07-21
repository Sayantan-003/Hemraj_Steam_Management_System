import React, { useState } from 'react';

const PrepForm = () => {
  const [shiftHours, setShiftHours] = useState('');
  const [shiftName, setShiftName] = useState('');
  const [ampRows, setAmpRows] = useState([{ time: '', meridian: 'AM', ampLoad: '' }]);

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

  const getShiftLabel = (name) => {
    if (!name) return '';
    if (name.includes('Shift A + Shift B + Shift C')) return 'Shift A+B+C';
    if (name.includes('Shift A + Shift B')) return 'Shift A+B';
    if (name.includes('Shift B + Shift C')) return 'Shift B+C';
    if (name.includes('Shift C + Shift A')) return 'Shift C+A';
    if (name.includes('Shift A')) return 'Shift A';
    if (name.includes('Shift B')) return 'Shift B';
    if (name.includes('Shift C')) return 'Shift C';
    return '';
  };

  const getNumberOfFields = (name) => {
    switch (name) {
      case 'Shift A':
      case 'Shift B':
      case 'Shift C':
        return 1;
      case 'Shift A + Shift B(1/2)':
      case 'Shift B + Shift C(1/2)':
      case 'Shift C + Shift A(1/2)':
      case 'Shift A(1/2) + Shift B':
      case 'Shift B(1/2) + Shift C':
      case 'Shift C(1/2) + Shift A':
        return 2;
      case 'Shift A + Shift B':
      case 'Shift B + Shift C':
      case 'Shift C + Shift A':
        return 2;
      case 'Shift A + Shift B + Shift C':
        return 3;
      default:
        return 0;
    }
  };

  const extractShiftParts = (name) => {
    if (!name) return [];
    if (name.includes('Shift A + Shift B + Shift C')) return ['Shift A', 'Shift B', 'Shift C'];

    const patterns = {
      'Shift A': 'Shift A',
      'Shift B': 'Shift B',
      'Shift C': 'Shift C',
    };

    const parts = Object.keys(patterns).filter((shift) => name.includes(shift));
    return [...new Set(parts)];
  };

  const numberOfFields = getNumberOfFields(shiftName);
  const shiftLabel = getShiftLabel(shiftName);
  const shiftParts = extractShiftParts(shiftName);

  const handleAddRow = () => {
    const maxRows = shiftHours ? parseInt(shiftHours) : 0;
    if (ampRows.length < maxRows) {
      setAmpRows([...ampRows, { time: '', meridian: 'AM', ampLoad: '' }]);
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...ampRows];
    updatedRows[index][field] = value;
    setAmpRows(updatedRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 min-h-screen" style={{ backgroundColor: '#EEE5D5' }}>
      <div className="rounded-xl shadow-md mb-6 p-4 text-center" style={{ backgroundColor: '#F1B854' }}>
        <h1 className="text-2xl font-bold text-gray-800">Operator Performance Form</h1>
        <p className="text-md text-gray-700 font-medium mt-1">(Prep Section)</p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Operator Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#F0CB8A' }}>Operator Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Operator Name</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="">Select</option>
                <option value="Prasanta Santra">Prasanta Santra</option>
                <option value="Raghav Roy">Raghav Roy</option>
                <option value="Srimanta Pramanik">Srimanta Pramanik</option>
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
                  setAmpRows([{ time: '', meridian: 'AM', ampLoad: '' }]);
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
                {shiftHours && shiftNameOptions[shiftHours].map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Total Steam Consumed Entries */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#F0CB8A' }}>
            Total Steam Consumed Entries
          </h2>

          {shiftParts.length > 0 ? (
            shiftParts.map((shift, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Steam Total Open for {shift}</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Steam Total Close for {shift}</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter number" />
                </div>
              </div>
            ))
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-500">Steam Total Open</label>
              <input type="number" disabled className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-2 bg-gray-100" placeholder="Select shift name" />
            </div>
          )}
        </div>

        {/* Time & Total Ampere Load Entries */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#F0CB8A' }}>Time & Total Ampere Load Entries</h2>
          <div className="flex flex-col gap-4">
            {ampRows.map((row, index) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" key={index}>
                <div>
                  <label className="block text-sm text-gray-700">Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={row.time}
                      onChange={(e) => handleRowChange(index, 'time', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <select
                      value={row.meridian}
                      onChange={(e) => handleRowChange(index, 'meridian', e.target.value)}
                      className="p-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Total Ampere Load</label>
                  <input
                    type="number"
                    value={row.ampLoad}
                    onChange={(e) => handleRowChange(index, 'ampLoad', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter load"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            disabled={ampRows.length >= (shiftHours ? parseInt(shiftHours) : 0)}
            className={`mt-4 px-4 py-2 rounded-md text-white ${
              ampRows.length >= (shiftHours ? parseInt(shiftHours) : 0)
                ? 'bg-gray-400 cursor-not-allowed'
                : ''
            }`}
            style={{
              backgroundColor:
                ampRows.length >= (shiftHours ? parseInt(shiftHours) : 0)
                  ? ''
                  : '#F1B854',
              cursor:
                ampRows.length >= (shiftHours ? parseInt(shiftHours) : 0)
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Add More Rows
          </button>
        </div>

        {/* Total Production Entries */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#F0CB8A' }}>Total Production Entries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Bran 21% (Local) Production',
              'Bran 20% (Raw) Production',
              'Bran 10% (Mota) Production',
              'Pora D.O.R.B.',
              'Valo D.O.R.B.',
              'Others'
            ].map((label, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter quantity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrepForm;
