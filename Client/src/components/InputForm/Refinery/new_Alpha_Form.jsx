import React, { useState } from 'react';

const New_Alpha_Form = () => {
  const [operatorCount, setOperatorCount] = useState(1);
  const [operatorDetails, setOperatorDetails] = useState([
    { name: '', shiftHours: '', shiftName: '' },
  ]);

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

  const handleOperatorCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setOperatorCount(count);
    const updated = Array.from({ length: count }, (_, index) => operatorDetails[index] || {
      name: '',
      shiftHours: '',
      shiftName: '',
    });
    setOperatorDetails(updated);
  };

  const handleDetailChange = (index, field, value) => {
    const updated = [...operatorDetails];
    updated[index][field] = value;
    if (field === 'shiftHours') {
      updated[index]['shiftName'] = '';
    }
    setOperatorDetails(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
        Alpha Section
      </h2>

      {/* Date and Operator Count */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Operator Present</label>
            <select
              value={operatorCount}
              onChange={handleOperatorCountChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Operator Details */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
          Operator Details
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {operatorDetails.map((operator, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Operator Name</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={operator.name}
                  onChange={(e) => handleDetailChange(index, 'name', e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Shayamal Doloui">Shayamal Kr. Doloui</option>
                  <option value="Santosh Mondal">Santosh Mondal</option>
                  <option value="Utpal Doloui">Utpal Dalui</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={operator.shiftHours}
                  onChange={(e) => handleDetailChange(index, 'shiftHours', e.target.value)}
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
                  value={operator.shiftName}
                  onChange={(e) => handleDetailChange(index, 'shiftName', e.target.value)}
                  disabled={!operator.shiftHours}
                >
                  <option value="">Select</option>
                  {shiftNameOptions[operator.shiftHours]?.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dip/Gap Entries for DGOT Tank */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
          Dip/Gap Entries for DGOT Tank
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Shift A', 'Shift B', 'Shift C'].map((shift, index) => (
            <div key={index} className="bg-white rounded-md shadow p-4">
              <h4
                className="text-md font-semibold text-gray-800 mb-2 px-3 py-1 rounded-md text-center mx-auto"
                style={{ backgroundColor: '#FFE95B', width: '75%' }}
              >
                {shift}
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dip/Gap of DGOT</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder={`Enter value for ${shift}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New_Alpha_Form;
