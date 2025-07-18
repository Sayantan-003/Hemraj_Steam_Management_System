import React, {useState, useEffect} from "react";
import ShiftSelector from "../../common/ShiftSelector";

const DeWaxingForm = () => {
  const [operatorName, setOperatorName] = useState("");
  const [shiftHours, setShiftHours] = useState("");
  const [shiftName, setShiftName] = useState("");
  const [crystallizer, setCrystallizer] = useState({ rawWaterStart: '', filterStop: '' });
  const [dipGap, setDipGap] = useState([]);
  const [cloudyTanks, setCloudyTanks] = useState([]);

  // AlphaForm shift name options
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

  // Calculate number of tanks and cloudy tanks based on shift hours
  // For Dip/Gap, always 4 tanks per shift, number of shifts depends on hours
  const getShiftLabels = (hours) => {
    switch (hours) {
      case '8': return ['A'];
      case '12': return ['A', 'B'];
      case '16': return ['A', 'B', 'C'];
      case '24': return ['A', 'B', 'C'];
      default: return [];
    }
  };
  const getCloudyTankCount = (hours) => {
    switch (hours) {
      case '8': return 1;
      case '12': return 2;
      case '16': return 3;
      case '24': return 4;
     
    }
  };

  // Update dip/gap and cloudy tank fields when shiftHours changes
  useEffect(() => {
    // For Dip/Gap, create array of arrays: one array per shift, 4 tanks per shift
    const shiftLabels = getShiftLabels(shiftHours);
    setDipGap(Array(shiftLabels.length).fill().map(() => Array(4).fill('')));
    setCloudyTanks(Array(getCloudyTankCount(shiftHours)).fill(''));
    setShiftName(""); // Reset shift name when shift hours changes
  }, [shiftHours]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>De-Waxing Form</h2>

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

      {/* Data Entry for Crystallizer */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Data Entry for Crystallizer</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Raw Water Start Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={crystallizer.rawWaterStart}
              onChange={e => setCrystallizer({ ...crystallizer, rawWaterStart: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Filter Stop Time</label>
            <input
              type="time"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={crystallizer.filterStop}
              onChange={e => setCrystallizer({ ...crystallizer, filterStop: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Of De-Wax Tanks</h3>
        {/* Only show after shift name is selected */}
        {shiftName && (() => {
          // Parse subheadings from selected shift name
          // For 8 hours: shiftName is 'Shift A', 'Shift B', or 'Shift C'
          // For 12/16/24: shiftName is 'Shift A + Shift B(1/2)', etc.
          let subheadings = [];
          if (shiftHours === '8') {
            // Only one subheading
            const match = shiftName.match(/Shift ([ABC])/);
            if (match) subheadings = [`Shift ${match[1]}`];
          } else {
            // Multiple subheadings, split by '+' and clean up
            subheadings = shiftName.split('+').map(s => {
              // Remove (1/2) and trim
              return s.replace(/\(1\/2\)/g, '').trim();
            });
          }
          return subheadings.map((sub, shiftIdx) => (
            <div key={shiftIdx} className="mb-4 ">
              <h4 className="font-semibold text-gray-700 mt-7 mb-5 px-2 py-1 rounded-md w-1/4 mx-auto" style={{ backgroundColor: '#FFE95B' }}>{sub}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {dipGap[shiftIdx]?.map((val, tankIdx) => (
                  <div key={tankIdx}>
                    <label className="block text-sm font-medium text-gray-700">Dip/Gap of De-Wax Tank {tankIdx + 1}</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={val}
                      onChange={e => {
                        const newArr = dipGap.map(arr => [...arr]);
                        newArr[shiftIdx][tankIdx] = e.target.value;
                        setDipGap(newArr);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ));
        })()}
      </div>

      {/* Dip/Gap Of Cloudy Tanks Section (separate card) */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3 className="font-semibold text-gray-800 mt-7 mb-5 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>Dip/Gap Of Cloudy Tanks</h3>
        {/* Only show after shift name is selected */}
        {shiftName && (() => {
          // Parse subheadings from selected shift name
          let subheadings = [];
          if (shiftHours === '8') {
            const match = shiftName.match(/Shift ([ABC])/);
            if (match) subheadings = [`Shift ${match[1]}`];
          } else {
            subheadings = shiftName.split('+').map(s => s.replace(/\(1\/2\)/g, '').trim());
          }
          // Always 1 input box per shift
          let inputIdx = 0;
          return subheadings.map((sub, shiftIdx) => {
            return (
              <div key={shiftIdx} className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2 px-2 py-1 rounded-md w-1/4 mx-auto" style={{ backgroundColor: '#FFE95B' }}>{sub}</h4>
                <div className="flex justify-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">Cloudy Tank 1</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-center"
                      value={cloudyTanks[inputIdx] || ''}
                      onChange={e => {
                        const newArr = [...cloudyTanks];
                        newArr[inputIdx] = e.target.value;
                        setCloudyTanks(newArr);
                      }}
                    />
                  </div>
                </div>
                {(() => { inputIdx++; return null; })()}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default DeWaxingForm;