import React, { useState } from 'react';

const DeGumming_Bleaching_Form = () => {
  const [shiftHours, setShiftHours] = useState('');
  const [shiftName, setShiftName] = useState('');
  const [alphaShiftName, setAlphaShiftName] = useState('');

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

  const getShiftSubparts = (shiftName) => {
    if (shiftName === 'Shift A + Shift B(1/2)' || shiftName === 'Shift A(1/2) + Shift B' || shiftName === 'Shift A + Shift B') return ['Shift A', 'Shift B'];
    if (shiftName === 'Shift B + Shift C(1/2)' || shiftName === 'Shift B(1/2) + Shift C' || shiftName === 'Shift B + Shift C') return ['Shift B', 'Shift C'];
    if (shiftName === 'Shift C + Shift A(1/2)' || shiftName === 'Shift C(1/2) + Shift A' || shiftName === 'Shift C + Shift A') return ['Shift C', 'Shift A'];
    if (shiftName === 'Shift A + Shift B + Shift C') return ['Shift A', 'Shift B', 'Shift C'];
    if (['Shift A', 'Shift B', 'Shift C'].includes(shiftName)) return [shiftName];
    return [];
  };

  const shiftSubparts = getShiftSubparts(shiftName);
  const alphaShiftSubparts = getShiftSubparts(alphaShiftName);

  return (
    <>
      {/* Header */}
      <div className="rounded-xl shadow-md mb-6 p-4 text-center" style={{ backgroundColor: '#FFE95B' }}>
        <h1 className="text-2xl font-bold text-gray-800">Operator Performance Form</h1>
        <p className="text-md text-gray-700 font-medium mt-1">(Refinery Section)</p>
      </div>

      {/* De-Gumming + Bleaching Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>De-Gumming + Bleaching Section</h2>

        {/* Operator Details */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Operator Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Operator Name</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="">Select</option>
                <option value="Sahadeb Adhikary">Sahadeb Adhikary</option>
                <option value="Biplab Pal">Biplab Pal</option>
                <option value="Abhijit Doloui">Abhijit Doloui</option>
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

        {/* Dip/Gap Entries for COT Tanks */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for COT Tanks</h3>
          {shiftSubparts.length > 0 ? shiftSubparts.map((label, index) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" key={index}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dip/Gap of COT 3 in {label}</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dip/Gap of COT 4 in {label}</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter value"
                />
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500">Select a shift name to view fields</p>
          )}
        </div>

        {/* Dip/Gap Entries for Bleacher Tanks */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for Bleacher Tanks</h3>
          {shiftSubparts.length > 0 ? shiftSubparts.map((label, index) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" key={index}>
              {['Bleacher 1', 'Bleacher 2', 'Bleacher 3'].map((bleacher, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700">Dip/Gap of {bleacher} in {label}</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter value"
                  />
                </div>
              ))}
            </div>
          )) : (
            <p className="text-sm text-gray-500">Select a shift name to view fields</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeGumming_Bleaching_Form;
