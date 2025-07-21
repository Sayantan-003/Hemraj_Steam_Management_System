import React, { useState } from 'react';

const AlphaForm = () => {
  const [shiftHours, setShiftHours] = useState('');
    const [shiftName, setShiftName] = useState('');
    const [alphaShiftHours, setAlphaShiftHours] = useState('');
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

  return(
    <div>
        {/* Alpha Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Alpha Section</h2>

        {/* Operator Details */}
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Operator Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Operator Name</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
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
                value={alphaShiftHours}
                onChange={(e) => {
                  setAlphaShiftHours(e.target.value);
                  setAlphaShiftName('');
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
                value={alphaShiftName}
                onChange={(e) => setAlphaShiftName(e.target.value)}
                disabled={!alphaShiftHours}
              >
                <option value="">Select</option>
                {alphaShiftHours && shiftNameOptions[alphaShiftHours]?.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dip/Gap Entries for DGOT Tank */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Entries for DGOT Tank</h3>
          {alphaShiftSubparts.length > 0 ? (
            <>
              {alphaShiftSubparts.map((label, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 px-2 py-1 rounded-md" style={{ backgroundColor: '#FFE95B' }}>{label}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dip/Gap of DGOT in {label}</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm text-gray-500">Select a shift name to view fields</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AlphaForm;