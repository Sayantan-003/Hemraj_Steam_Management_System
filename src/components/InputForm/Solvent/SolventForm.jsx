import React,{useState} from 'react';
import SteamConsumedCard from './SteamConsumedCard';

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

const SolventForm = () => {
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedShiftHours, setSelectedShiftHours] = useState("");
  const [selectedShiftName, setSelectedShiftName] = useState("");
  const [cardValues, setCardValues] = useState({
    crudeOilColour: [{ time: '', period: 'A.M.', value: '', timeError: false }],
    crudeOilMoisture: [{ time: '', period: 'A.M.', value: '', timeError: false }],
    dorbOil: [{ time: '', period: 'A.M.', value: '', timeError: false }],
  });

  const shiftNameOptions = selectedShiftHours ? shiftNamesByHours[selectedShiftHours] : [];
  const maxColumns = selectedShiftHours ? parseInt(selectedShiftHours, 10) : 1;

  const handleAddValue = (cardKey) => {
    if (cardValues[cardKey].length < maxColumns) {
      setCardValues({
        ...cardValues,
        [cardKey]: [
          ...cardValues[cardKey],
          { time: '', period: 'A.M.', value: '', timeError: false }
        ]
      });
    }
  };

  const handleChange = (cardKey, idx, field, val) => {
    const updated = cardValues[cardKey].map((v, i) => {
      if (i !== idx) return v;
      if (field === 'time') {
        return { ...v, time: val, timeError: val && !validateTime(val) };
      }
      return { ...v, [field]: val };
    });
    setCardValues({ ...cardValues, [cardKey]: updated });
  };

  const handleShiftHoursChange = (val) => {
    setSelectedShiftHours(val);
    setSelectedShiftName("");
    setCardValues({
      crudeOilColour: [{ time: '', period: 'A.M.', value: '', timeError: false }],
      crudeOilMoisture: [{ time: '', period: 'A.M.', value: '', timeError: false }],
      dorbOil: [{ time: '', period: 'A.M.', value: '', timeError: false }],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-orange-800 mb-3">Operator Performance Form</h1>
          <p className="text-orange-600 text-base">Solvent Section</p>
        </div>

        {/* Selection Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-orange-100">
          <h2 className="text-lg font-semibold text-orange-800 mb-4 text-center">Shift Configuration</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-orange-800 uppercase tracking-wide">
                Operator Name
              </label>
              <select
                className="w-full h-10 px-3 text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none transition-colors duration-200"
                style={{ borderColor: '#fed7aa', focusBorderColor: '#f9804c' }}
                onFocus={e => e.target.style.borderColor = '#f9804c'}
                onBlur={e => e.target.style.borderColor = '#fed7aa'}
                value={selectedOperator}
                onChange={e => setSelectedOperator(e.target.value)}
              >
                <option value="">Select Operator</option>
                {operatorNames.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-orange-800 uppercase tracking-wide">
                Shift Hours
              </label>
              <select
                className="w-full h-10 px-3 text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none transition-colors duration-200"
                style={{ borderColor: '#fed7aa', focusBorderColor: '#f9804c' }}
                onFocus={e => e.target.style.borderColor = '#f9804c'}
                onBlur={e => e.target.style.borderColor = '#fed7aa'}
                value={selectedShiftHours}
                onChange={e => handleShiftHoursChange(e.target.value)}
              >
                <option value="">Select Hours</option>
                {shiftHoursOptions.map((hr, idx) => (
                  <option key={idx} value={hr}>{hr}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-orange-800 uppercase tracking-wide">
                Shift Name
              </label>
              <select
                className="w-full h-10 px-3 text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-400"
                style={{ borderColor: '#fed7aa', focusBorderColor: '#f9804c' }}
                onFocus={e => e.target.style.borderColor = '#f9804c'}
                onBlur={e => e.target.style.borderColor = '#fed7aa'}
                value={selectedShiftName}
                onChange={e => setSelectedShiftName(e.target.value)}
                disabled={!selectedShiftHours}
              >
                <option value="">{selectedShiftHours ? "Select Shift Name" : "Select Shift Hours First"}</option>
                {shiftNameOptions.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Collection Cards */}
        {cardConfigs.map(card => (
          <div key={card.key} className="w-full max-w-5xl mx-auto bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4" style={{ background: `linear-gradient(to right, #f9804c, #f97316)` }}>
              <h2 className="text-xl font-semibold text-white text-center tracking-wide">{card.title}</h2>
            </div>
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Time & Period Section */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-orange-800 mb-4 uppercase tracking-wide">Time</h3>
                  </div>
                  <div className="space-y-3">
                    {cardValues[card.key].map((val, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-md p-3 border border-white-100">
                        <div className="flex gap-2 items-center">
                          <div className="flex-1">
                            <input
                              type="text"
                              className={`w-full h-10 px-3 text-base text-center text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 ${val.timeError ? 'border-red-400 ring-2 ring-red-400' : ''}`}
                              value={val.time}
                              onChange={e => handleChange(card.key, idx, 'time', e.target.value)}
                              placeholder="HH:MM"
                            />
                          </div>
                          <div className="flex-none">
                            <select
                              className="w-16 h-10 px-1 text-sm text-center text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                              value={val.period}
                              onChange={e => handleChange(card.key, idx, 'period', e.target.value)}
                            >
                              {periodOptions.map((p, i) => (
                                <option key={i} value={p}>{p}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {val.timeError && (
                          <div className="mt-2 text-red-600 text-sm text-center font-medium">
                            ⚠ Invalid time format
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Value Section */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-orange-800 mb-4 uppercase tracking-wide">{card.placeholder}</h3>
                  </div>
                  <div className="space-y-3">
                    {cardValues[card.key].map((val, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-md p-3 border border-orange-100">
                        <input
                          type="text"
                          className="w-full h-10 px-3 text-base text-center text-gray-700 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                          value={val.value}
                          onChange={e => handleChange(card.key, idx, 'value', e.target.value)}
                          placeholder={card.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add Another Value Button */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-base font-semibold text-orange-600 bg-white border-2 border-orange-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleAddValue(card.key)}
                  disabled={cardValues[card.key].length >= maxColumns}
                >
                  <span className="mr-2">+</span>
                  Add Another Value
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Steam Consumed Card */}
        <SteamConsumedCard
          shiftHours={selectedShiftHours}
          shiftName={selectedShiftName}
          shiftNamesByHours={shiftNamesByHours}
        />

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="button"
            className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 transform hover:scale-105"
          >
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolventForm;