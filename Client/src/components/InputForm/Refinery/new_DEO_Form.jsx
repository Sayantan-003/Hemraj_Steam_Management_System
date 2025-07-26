import React, { useState } from 'react';

const New_DEO_Form = () => {
  const [numOperators, setNumOperators] = useState('');
  const [tankType, setTankType] = useState('');
  const [shiftHours, setShiftHours] = useState([]);

  const handleShiftHourChange = (index, value) => {
    const updated = [...shiftHours];
    updated[index] = value;
    setShiftHours(updated);
  };

  const getShiftNameOptions = (hour) => {
    switch (hour) {
      case '8':
        return ['Shift A', 'Shift B', 'Shift C'];
      case '12':
        return [
          'Shift A + Shift B(1/2)',
          'Shift B + Shift C(1/2)',
          'Shift C + Shift A(1/2)',
          'Shift A(1/2) + Shift B',
          'Shift B(1/2) + Shift C',
          'Shift C(1/2) + Shift A',
        ];
      case '16':
        return ['Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A'];
      case '24':
        return ['Shift A + Shift B + Shift C'];
      default:
        return [];
    }
  };

  const renderOperatorFields = () => {
    const operatorFields = [];
    for (let i = 0; i < Number(numOperators); i++) {
      const currentShiftHour = shiftHours[i] || '';
      const shiftNameOptions = getShiftNameOptions(currentShiftHour);

      operatorFields.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Operator Name</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="">Select</option>
              <option value="Arup Dalui">Arup Dalui</option>
              <option value="Abhijit Dutta">Abhijit Dutta</option>
              <option value="Raju Mukhia">Raju Mukhia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
            <select
              value={currentShiftHour}
              onChange={(e) => handleShiftHourChange(i, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
            <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="">Select</option>
              {shiftNameOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }
    return operatorFields;
  };

  const renderTankTypeSection = () => {
    switch (tankType) {
      case 'ST':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries of Storage Tanks (ST)</h3>
            {['Shift A', 'Shift B', 'Shift C'].map((shift) => (
              <div key={shift} className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>{shift}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  {[1, 2, 3].map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of ST {num}</label>
                      <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" type="text" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[4, 5, 6].map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of ST {num}</label>
                      <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" type="text" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'FOT':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries of Final Oil Tanks (FOT)</h3>
            {['Shift A', 'Shift B', 'Shift C'].map((shift) => (
              <div key={shift} className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>{shift}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['FOT-A', 'FOT-B'].map((name) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of {name}</label>
                      <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" type="text" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'OUT':
        return (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for OUT Tanks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Shift A', 'Shift B', 'Shift C'].map((shift) => (
                <div key={shift}>
                  <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>{shift}</h4>
                  <label className="block text-sm font-medium text-gray-700">Dip/Gap of OUT Tanks</label>
                  <input className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" type="text" />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>DEO Section</h2>

      {/* Date and Operator Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Operator Present</label>
          <select
            value={numOperators}
            onChange={(e) => {
              const count = e.target.value;
              setNumOperators(count);
              setShiftHours(Array(Number(count)).fill(''));
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      {/* Operator Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Operator Details</h3>
        {renderOperatorFields()}
      </div>

      {/* Tank Type Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Tank Type Entries</h3>
        <select value={tankType} onChange={(e) => setTankType(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4">
          <option value="">Select</option>
          <option value="ST">ST (Storage Tanks)</option>
          <option value="FOT">FOT (Final Oil Tanks)</option>
          <option value="OUT">OUT Tanks</option>
        </select>
        {renderTankTypeSection()}
      </div>

      {/* Dip/Gap Entries for Fatty Tank */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for Fatty Tank</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Shift A', 'Shift B', 'Shift C'].map((shift) => (
            <div key={shift}>
              <h4 className="font-semibold text-gray-800 mb-2 px-4 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>{shift}</h4>
              <label className="block text-sm font-medium text-gray-700">Dip/Gap of Fatty Tank</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
          ))}
        </div>
      </div>

        {/* Submit Button */}
        <div className="flex justify-center">
        <button
            type="submit"
            className="bg-[#ACFD8B] hover:bg-green-300 text-gray-800 font-semibold py-2 px-6 rounded-md shadow"
        >
            Submit
        </button>
        </div>

    </div>
  );
};

export default New_DEO_Form;
