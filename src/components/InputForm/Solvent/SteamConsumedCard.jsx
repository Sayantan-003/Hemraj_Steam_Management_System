import React, { useState } from 'react';
const operatorNames = ["Gurucharan Rakshit", "Sivjee Patel", "Taresh Roy"];
const shiftHoursOptions = ["8", "12", "16", "24"];
const shiftNamesByHours = {
  '8': ['Shift A', 'Shift B', 'Shift C'],
  '12': ['Shift A+ Shift B(1/2)', 'B+C(1/2)', 'Shift C+ Shift A(1/2)', 'Shift A(1/2)+ Shift B', 'Shift B(1/2)+ Shift C', 'Shift C(1/2)+ Shift A'],
  '16': ['Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A', 'Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A'],
  '24': ['Shift A + Shift B + Shift C']
};
const periodOptions = ['A.M.', 'P.M.'];

const cardConfigs = [
  { key: 'crudeOilColour', title: 'CRUDE OIL COLOUR', placeholder: 'Color', colorInput: true },
  { key: 'crudeOilMoisture', title: 'CRUDE OIL MOISTURE', placeholder: 'Moisture %', colorInput: false },
  { key: 'dorbOil', title: 'DORB OIL %', placeholder: 'DORB %', colorInput: false },
];

function validateTime(time) {
  return /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(time);
}

// Helper to extract pure shift names (A, B, C) from shiftNamesByHours
function getPureShiftNames(shiftHours, shiftNamesByHours) {
  if (!shiftHours) return [];
  let names = shiftNamesByHours[shiftHours] || [];
  if (shiftHours === '12') {
    return ['A', 'B'];
  }
  if (shiftHours === '8') return ['A'];
  if (shiftHours === '16') return ['A', 'B'];
  if (shiftHours === '24') return ['A', 'B', 'C'];
  return [];
}

const SteamConsumedCard = ({ shiftHours, shiftName, shiftNamesByHours }) => {
  const shiftNames = getPureShiftNames(shiftHours, shiftNamesByHours);
  const usedShiftNames = shiftHours === '8' && shiftName ? [shiftName] : shiftNames;

  const [values, setValues] = useState(
    usedShiftNames.map(name => ({
      shift: name,
      steam3: '',
      steam6: ''
    }))
  );

  const handleChange = (idx, field, val) => {
    setValues(values => values.map((v, i) => i === idx ? { ...v, [field]: val } : v));
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl shadow-lg overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6" style={{ background: `linear-gradient(to right, #f9804c, #f97316)` }}>
        <h2 className="text-2xl font-semibold text-white text-center tracking-wide">STEAM CONSUMED</h2>
      </div>
      <div className="p-8">
        <div className="grid gap-6 max-w-4xl mx-auto">
          {usedShiftNames.map((name, idx) => (
            <div key={name} className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-orange-800 uppercase tracking-wide">
                    Steam Consumed for 3" in {name}
                  </label>
                  <input
                    type="text"
                    className="w-full h-14 px-4 text-lg text-center text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                    value={values[idx]?.steam3 || ''}
                    onChange={e => handleChange(idx, 'steam3', e.target.value)}
                    placeholder={`Enter value for 3" in ${name}`}
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-orange-800 uppercase tracking-wide">
                    Steam Consumed for 6" in {name}
                  </label>
                  <input
                    type="text"
                    className="w-full h-14 px-4 text-lg text-center text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                    value={values[idx]?.steam6 || ''}
                    onChange={e => handleChange(idx, 'steam6', e.target.value)}
                    placeholder={`Enter value for 6" in ${name}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SteamConsumedCard;