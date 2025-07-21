import React, { useState, useEffect } from "react";

const TANK_TYPE_OPTIONS = [
  { value: "ST", label: "ST (Storage Tanks)", count: 6, heading: "DIP/GAP Of ST Tanks" },
  { value: "FOT", label: "FOT (Final Oil Tanks)", count: 2, heading: "DIP/GAP Of FOT Tanks" },
  { value: "OUT", label: "OUT Tanks", count: 1, heading: "DIP/GAP Of OUT Tanks" },
];

const FATTY_TANKS = [
  { label: "Fatty Tank (Tank No. 13)", key: "fatty13" },
  { label: "Fatty Tank (Tank No. 14)", key: "fatty14" },
];

const DEOSection = () => {
  const [operatorName, setOperatorName] = useState("");
  const [shiftHours, setShiftHours] = useState("");
  const [shiftName, setShiftName] = useState("");
  const [tankType, setTankType] = useState("");
  const [tankValues, setTankValues] = useState([]);
  const [fattyTankValues, setFattyTankValues] = useState([]);
  const [fotTankValues, setFotTankValues] = useState([]); // Add this line

  // Define number of shifts for each hour option
  const shiftCountByHours = {
    '8': 1,
    '12': 2,
    '18': 3,
    // add more if needed
  };

  // State to hold values for all shifts
  const [shiftTankValues, setShiftTankValues] = useState([]);

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

  // Update tankValues array when tankType changes
  useEffect(() => {
    const selected = TANK_TYPE_OPTIONS.find(opt => opt.value === tankType);
    setTankValues(Array(selected?.count || 0).fill(""));
    // Add this block:
    if (tankType === "FOT" && shiftHours) {
      const count = shiftCountByHours[shiftHours] || 0;
      setFotTankValues(Array(count).fill().map(() => ["", ""]));
    } else {
      setFotTankValues([]);
    }
  }, [tankType, shiftHours]);

  // Update shiftTankValues when shiftHours changes
  useEffect(() => {
    const count = shiftCountByHours[shiftHours] || 0;
    setShiftTankValues(Array(count).fill().map(() => Array(6).fill("")));
    setFattyTankValues(Array(count).fill(" "))
  }, [shiftHours]);

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
            <option value="Milon K Paul">Milon K Paul</option>
            <option value="Anwar Sekh">Anwar Sekh</option>
            <option value="Shyamal Bhattacharya">Shyamal Bhattacharya</option>
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

      {/* Tank Type Dropdown */}
      <div className="mb-6">
        <div className="flex justify-center">
          <label className="block text-sm font-medium text-gray-700">Tank Type</label>
        </div>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={tankType}
          onChange={e => setTankType(e.target.value)}
        >
          <option value="">Select</option>
          {TANK_TYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
  {/* DIP/GAP Section for OUT Tank Type, rendered for each shift with correct subheadings and input boxes */}
      {tankType === 'OUT' && shiftHours && shiftName && (
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            DIP/GAP Of OUT Tanks
          </h3>
          {(() => {
            // For 8 hours, one subheading and one input
            if (shiftHours === '8') {
              return (
                <div className="mb-4">
                  <div className="flex justify-center">
                    <h4 className="font-semibold text-gray-700 mb-2 px-3 py-2 rounded-md m-5 w-100 " style={{ backgroundColor: '#FFE95B' }}>
                      {shiftName}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={tankValues[0] || ""}
                      onChange={e => {
                        const arr = [...tankValues];
                        arr[0] = e.target.value;
                        setTankValues(arr);
                      }}
                    />
                  </div>
                </div>
              );
            }
            // For 12 and 16 hours, two subheadings and two inputs
            if (shiftHours === '12' || shiftHours === '16') {
              const selectedShifts = shiftName.split('+').map(s => s.trim());
              return selectedShifts.map((selShift, idx) => {
                // Trim (1/2) if present
                const trimmed = selShift.replace(/\(1\/2\)/, '').trim();
                return (
                  <div className="mb-4" key={trimmed + idx}>
                    <div className="flex justify-center">
                      <h4 className="font-semibold text-gray-700 mb-2 px-3 py-2 rounded-md m-5 w-100 " style={{ backgroundColor: '#FFE95B' }}>
                        {trimmed}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={tankValues[idx] || ""}
                        onChange={e => {
                          const arr = [...tankValues];
                          arr[idx] = e.target.value;
                          setTankValues(arr);
                        }}
                      />
                    </div>
                  </div>
                );
              });
            }
            // For 24 hours, three subheadings and three inputs
            if (shiftHours === '24') {
              const selectedShifts = ['Shift A', 'Shift B', 'Shift C'];
              return selectedShifts.map((selShift, idx) => (
                <div className="mb-4" key={selShift + idx}>
                  <div className="flex justify-center">
                    <h4 className="font-semibold text-gray-700 mb-2 px-3 py-2 rounded-md m-5 w-100 " style={{ backgroundColor: '#FFE95B' }}>
                      {selShift}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={tankValues[idx] || ""}
                      onChange={e => {
                        const arr = [...tankValues];
                        arr[idx] = e.target.value;
                        setTankValues(arr);
                      }}
                    />
                  </div>
                </div>
              ));
            }
            return null;
          })()}
        </div>
      )}
      
      {/* DIP/GAP Section for ST Tank Type, rendered for each shift with dynamic subheadings */}
      {tankType === 'ST' && shiftHours && shiftName && (
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            DIP/GAP Of ST Tanks
          </h3>
          {(() => {
            // Split the selected shiftName by '+' and use each as a subheading, trimming (1/2)
            const selectedShifts = shiftName.split('+').map(s => s.trim());
            return selectedShifts.map((selShift, shiftIdx) => {
              const trimmed = selShift.replace(/\(1\/2\)/, '').trim();
              return (
                <div key={trimmed + shiftIdx} className="mb-4">
                  <div className="flex justify-center">
                    <h4 className="font-semibold text-gray-700 mb-2 px-3 py-2 rounded-md m-5 w-100 " style={{ backgroundColor: '#FFE95B' }}>
                      {trimmed}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {(shiftTankValues[shiftIdx] || Array(6).fill("")).map((val, boxIdx) => (
                      <div key={boxIdx}>
                        <label className="block text-sm font-medium text-gray-700 m-5 ">{`Dip/Gap of ST Tank ${boxIdx + 1}`}</label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          value={val}
                          onChange={e => {
                            const arr = [...shiftTankValues];
                            arr[shiftIdx] = arr[shiftIdx] || Array(6).fill("");
                            arr[shiftIdx][boxIdx] = e.target.value;
                            setShiftTankValues(arr);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* DIP/GAP Section for FOT Tank Type, rendered for each shift with FOT-A and FOT-B subheadings */}
      {tankType === 'FOT' && shiftHours && shiftName && (
        <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            DIP/GAP Of FOT Tanks
          </h3>
          {(() => {
            // Split the selected shiftName by '+' and use each as a subheading
            const selectedShifts = shiftName.split('+').map(s => s.trim());
            return selectedShifts.map((selShift, shiftIdx) => {
            const trimmed = selShift.replace(/\(1\/2\)/, '').trim();
            return (
              <div className="mb-4" key={trimmed + shiftIdx}>
              <div className="flex justify-center">
                  <h4 className="font-semibold text-gray-700 mb-2 px-3 py-2 rounded-md m-5 w-100 " style={{ backgroundColor: '#FFE95B' }}>
                    {trimmed}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["FOT-A", "FOT-B"].map((label, fotIdx) => (
                    <div key={label}>
                      <label className="block text-sm font-medium text-gray-700 m-5 ">{label}</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        value={fotTankValues[shiftIdx]?.[fotIdx] || ""}
                        onChange={e => {
                          const arr = [...fotTankValues];
                          arr[shiftIdx] = arr[shiftIdx] || ["", ""];
                          arr[shiftIdx][fotIdx] = e.target.value;
                          setFotTankValues(arr);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          });
          })()}
        </div>
      )}

      {/* Fatty Tanks Section: one input per shift, with dynamic shift subheading */}
      {/* Fatty Tanks Section: one input per shift, with dynamic shift subheading */}
      {shiftHours && shiftName && (
  <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
    <h3 className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
      FATTY TANKS DIP/GAP
    </h3>
    {shiftName.split('+').map((s, idx) => {
      const shiftLabel = s.trim().replace(/\(1\/2\)/g, '');
      return (
        <div key={idx} className="mb-4">
          <div className="flex justify-center">
            <h4 className="font-semibold text-gray-700 mb-5 px-3 py-2 rounded-md w-80" style={{ backgroundColor: '#FFE95B' }}>
              {shiftLabel}
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 m-2">Fatty Tank</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={fattyTankValues[idx] || ""}
                onChange={e => {
                  const arr = [...fattyTankValues];
                  arr[idx] = e.target.value;
                  setFattyTankValues(arr);
                }}
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
)}
</div>
  );
};

export default DEOSection;
