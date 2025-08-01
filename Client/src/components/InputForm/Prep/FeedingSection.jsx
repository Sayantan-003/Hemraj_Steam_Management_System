import React, { forwardRef, useImperativeHandle, useState } from "react";

const labels = [
  "Bran 21% (Local)",
  "Bran 20% (Raw)",
  "Bran 10% (Mota)",
  "Pora D.O.R.B.",
  "Valo D.O.R.B.",
  "Others"
];

const FeedingSection = forwardRef((_, ref) => {
  const [feedingData, setFeedingData] = useState(
    Object.fromEntries(labels.map(label => [label, ""]))
  );

  useImperativeHandle(ref, () => ({
    getData: () => feedingData
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Feeding Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {labels.map(label => (
          <div key={label}>
            <label className="block font-medium text-gray-700">{label} Feeding</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={feedingData[label]}
              onChange={(e) => setFeedingData({ ...feedingData, [label]: e.target.value })}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default FeedingSection;
