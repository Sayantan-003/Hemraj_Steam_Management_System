import React, { useState } from "react";

const TANK_TYPES = [
  "DEO Tank 1",
  "DEO Tank 2",
  "DEO Tank 3",
];

const FATTY_TANKS = ["Fatty Tank 1", "Fatty Tank 2"];

const DEOSection = () => {
  const [deoTanks, setDeoTanks] = useState(Array(TANK_TYPES.length).fill(""));
  const [fattyTanks, setFattyTanks] = useState(Array(FATTY_TANKS.length).fill(""));
  const [operatorName, setOperatorName] = useState("");
  const [shiftHours, setShiftHours] = useState("");
  const [shiftName, setShiftName] = useState("");

  // Shift name options (same as De-Waxing Form)
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

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>DEO Section</h2>

      {/* Dropdowns for Operator Name, Shift Hours, Shift Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Operator Name</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={operatorName}
            onChange={e => setOperatorName(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Shayamal Doloui">Shayamal Doloui</option>
            <option value="Santosh Mondal">Santosh Mondal</option>
            <option value="Utpal Doloui">Utpal Doloui</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Shift Hours</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={shiftHours}
            onChange={e => setShiftHours(e.target.value)}
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
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 ${!shiftHours ? 'bg-gray-200 text-gray-400' : ''}`}
            value={shiftName}
            onChange={e => setShiftName(e.target.value)}
            disabled={!shiftHours}
          >
            <option value="">Select</option>
            {shiftHours && shiftNameOptions[shiftHours]?.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* DEO Tanks Section */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>DEO Tank Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="font-semibold text-gray-700">Tank Type</div>
          <div className="font-semibold text-gray-700 col-span-2">Dip/Gap Of the Tank</div>
        </div>
        {TANK_TYPES.map((tank, idx) => (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2" key={tank}>
            <div className="flex items-center">{tank}</div>
            <div className="sm:col-span-2">
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={deoTanks[idx]}
                onChange={e => {
                  const arr = [...deoTanks];
                  arr[idx] = e.target.value;
                  setDeoTanks(arr);
                }}
                placeholder={`Dip/Gap of ${tank}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fatty Tank Section */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Fatty Tank Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="font-semibold text-gray-700">Fatty Tank Number</div>
          <div className="font-semibold text-gray-700">Dip/Gap of Fatty Tank</div>
        </div>
        {FATTY_TANKS.map((tank, idx) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2" key={tank}>
            <div className="flex items-center">{tank}</div>
            <div>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={fattyTanks[idx]}
                onChange={e => {
                  const arr = [...fattyTanks];
                  arr[idx] = e.target.value;
                  setFattyTanks(arr);
                }}
                placeholder={`Dip/Gap of ${tank}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DEOSection;
