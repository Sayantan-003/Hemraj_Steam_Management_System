import React, { useState } from 'react';

const New_DeGum_Bleach_Form = () => {
  const [numOperators, setNumOperators] = useState('');
  const [shiftHoursList, setShiftHoursList] = useState(['']);
  const [shiftNameList, setShiftNameList] = useState(['']);

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

  const getShiftSubparts = (shiftName) => {
    if (shiftName === 'Shift A + Shift B(1/2)' || shiftName === 'Shift A(1/2) + Shift B' || shiftName === 'Shift A + Shift B') return ['Shift A', 'Shift B'];
    if (shiftName === 'Shift B + Shift C(1/2)' || shiftName === 'Shift B(1/2) + Shift C' || shiftName === 'Shift B + Shift C') return ['Shift B', 'Shift C'];
    if (shiftName === 'Shift C + Shift A(1/2)' || shiftName === 'Shift C(1/2) + Shift A' || shiftName === 'Shift C + Shift A') return ['Shift C', 'Shift A'];
    if (shiftName === 'Shift A + Shift B + Shift C') return ['Shift A', 'Shift B', 'Shift C'];
    if (['Shift A', 'Shift B', 'Shift C'].includes(shiftName)) return [shiftName];
    return [];
  };

  const handleNumOperatorsChange = (value) => {
    setNumOperators(value);
    const count = parseInt(value || 0);
    setShiftHoursList(Array(count).fill(''));
    setShiftNameList(Array(count).fill(''));
  };

  return (
    <>
      {/* Header */}
      <div className="rounded-xl shadow-md mb-6 p-4 text-center" style={{ backgroundColor: '#FFE95B' }}>
        <h1 className="text-2xl font-bold text-gray-800">Operator Performance Form</h1>
        <p className="text-md text-gray-700 font-medium mt-1">(Refinery Section)</p>
      </div>

      {/* De-Gumming + Bleaching Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
          De-Gumming + Bleaching Section
        </h2>

        {/* Date and Number of Operator Present */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Operator Present</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={numOperators}
              onChange={(e) => handleNumOperatorsChange(e.target.value)}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        {/* Operator Details */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Operator Details</h3>

          {[...Array(parseInt(numOperators || 0))].map((_, idx) => (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4" key={idx}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Operator Name</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option value="">Select</option>
                  <option value="Sahadeb Adhikary">Sahadev Adhikary</option>
                  <option value="Biplab Pal">Biplab Pal</option>
                  <option value="Abhijit Doloui">Abhijit Dalui</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={shiftHoursList[idx]}
                  onChange={(e) => {
                    const newHours = [...shiftHoursList];
                    newHours[idx] = e.target.value;
                    setShiftHoursList(newHours);

                    const newShiftNames = [...shiftNameList];
                    newShiftNames[idx] = '';
                    setShiftNameList(newShiftNames);
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
                  value={shiftNameList[idx]}
                  onChange={(e) => {
                    const newShiftNames = [...shiftNameList];
                    newShiftNames[idx] = e.target.value;
                    setShiftNameList(newShiftNames);
                  }}
                  disabled={!shiftHoursList[idx]}
                >
                  <option value="">Select</option>
                  {shiftHoursList[idx] && shiftNameOptions[shiftHoursList[idx]]?.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Dip/Gap Entries for COT Tanks */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            Dip/Gap Entries for COT Tanks
          </h3>
          {['Shift A', 'Shift B', 'Shift C'].map((shiftLabel, index) => (
            <div key={index} className="mb-6 w-full">
              <div className="mx-auto mb-4 rounded-md text-center font-semibold text-gray-800 py-2" style={{ backgroundColor: '#FFE95B', width: '75%' }}>
                {shiftLabel}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dip/Gap of COT 3</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder={`Enter value for COT 3 in ${shiftLabel}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dip/Gap of COT 4</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder={`Enter value for COT 4 in ${shiftLabel}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dip/Gap Entries for Bleacher Tanks */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            Dip/Gap Entries for Bleacher Tanks
          </h3>
          {['Shift A', 'Shift B', 'Shift C'].map((shiftLabel, index) => (
            <div key={index} className="mb-6 w-full">
              <div className="mx-auto mb-4 rounded-md text-center font-semibold text-gray-800 py-2" style={{ backgroundColor: '#FFE95B', width: '75%' }}>
                {shiftLabel}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Bleacher 1', 'Bleacher 2', 'Bleacher 3'].map((bleacher, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700">Dip/Gap of {bleacher}</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder={`Enter value for ${bleacher} in ${shiftLabel}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default New_DeGum_Bleach_Form;
