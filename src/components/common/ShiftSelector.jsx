import React, { useState } from 'react';

const defaultShiftTimmings = {
  '8':  ['Shift A', 'Shift B', 'Shift C'],
  '12': ['Shift A + Shift B(1/2)', 'Shift B + Shift C(1/2)', 'Shift C + Shift A(1/2)', 'Shift A(1/2) + Shift B', 'Shift B(1/2) + Shift C', 'Shift C(1/2) + Shift A'],
  '16': ['Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A', 'Shift A + Shift B', 'Shift B + Shift C', 'Shift C + Shift A'],
  '24': ['Shift A + Shift B + Shift C']
};

const ShiftSelector = ({
  shiftTimmings = defaultShiftTimmings,
  value = {},
  onChange = () => {},
  operatorNames = []
}) => {
  const [operator, setOperator] = useState(value.operator || "");
  const [shiftHours, setShiftHours] = useState(value.shiftHours || "");
  const [shiftTimming, setShiftTimming] = useState(value.shiftTimming || "");

  // Update parent on any change
  React.useEffect(() => {
    onChange({ operator, shiftHours, shiftTimming });
    // eslint-disable-next-line
  }, [operator, shiftHours, shiftTimming]);

  const shiftHoursOptions = Object.keys(shiftTimmings);
  const shiftTimmingOptions = shiftHours ? shiftTimmings[shiftHours] : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Operator Name Dropdown */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Operator Name</label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={operator}
          onChange={e => setOperator(e.target.value)}
        >
          <option value="">Select Operator</option>
          {operatorNames.map((name, idx) => (
            <option key={idx} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Shift Hours Dropdown */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Shift Hours</label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={shiftHours}
          onChange={e => {
            setShiftHours(e.target.value);
            setShiftTimming("");
          }}
        >
          <option value="">Select Hours</option>
          {shiftHoursOptions.map((hr, idx) => (
            <option key={idx} value={hr}>{hr}</option>
          ))}
        </select>
      </div>

      {/* Shift Timmings Dropdown */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Shift Timmings</label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={shiftTimming}
          onChange={e => setShiftTimming(e.target.value)}
          disabled={!shiftHours}
        >
          <option value="">{shiftHours ? "Select Timming" : "Select Shift Hours First"}</option>
          {shiftTimmingOptions.map((timing, idx) => (
            <option key={idx} value={timing}>{timing}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShiftSelector;
