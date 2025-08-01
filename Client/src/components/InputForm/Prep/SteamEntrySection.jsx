import React, { forwardRef, useImperativeHandle, useState } from "react";

const SteamEntrySection = forwardRef((_, ref) => {
  const [steamData, setSteamData] = useState({
    'Shift A': { open : "", close : "" },
    'Shift B': { open: "", close: "" },
    'Shift C': { open: "", close: "" }
  });

  useImperativeHandle(ref, () => ({
    getData: () => steamData
  }));

  const handleChange = (shift, field, value) => {
    setSteamData((prev) => ({
      ...prev,
      [shift]: { ...prev[shift], [field]: value }
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Steam Consumption Entries</h2>
      {Object.keys(steamData).map((shift) => (
        <div key={shift} className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded w-[75%] mx-auto text-center">{shift}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Steam Total Open</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={steamData[shift].open}
                onChange={(e) => handleChange(shift, "open", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Steam Total Close</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={steamData[shift].close}
                onChange={(e) => handleChange(shift, "close", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SteamEntrySection;
