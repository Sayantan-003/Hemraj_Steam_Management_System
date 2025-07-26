/*import React, { useState } from "react";
import ref from "../../../assets/images/ref.jpg"

const NewPerpForm = () => {
  const [numOperators, setNumOperators] = useState(1);
  const [shiftHours, setShiftHours] = useState(Array(numOperators).fill(""));

  const handleNumOperatorsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumOperators(value);
    setShiftHours(Array(value).fill(""));
  };

  const handleShiftHourChange = (index, value) => {
    const newShiftHours = [...shiftHours];
    newShiftHours[index] = value;
    setShiftHours(newShiftHours);
  };

  const getShiftNameOptions = (shiftHour) => {
    if (shiftHour === "8 Hours") {
      return ["Shift A", "Shift B", "Shift C"];
    } else if (shiftHour === "12 Hours") {
      return [
        "Shift A + Shift B(1/2)",
        "Shift B + Shift C(1/2)",
        "Shift C + Shift A(1/2)"
      ];
    } else if (shiftHour === "16 Hours") {
      return [
        "Shift A + Shift B",
        "Shift B + Shift C",
        "Shift C + Shift A"
      ];
    } else if (shiftHour === "24 Hours") {
      return ["Shift A + Shift B + Shift C"];
    } else {
      return [];
    }
  };

  const feedingFields = [
    "Bran 21% (Local) Feeding",
    "Bran 20% (Raw) Feeding",
    "Bran 10% (Mota) Feeding",
    "Pora D.O.R.B. Feeding",
    "Valo D.O.R.B. Feeding",
    "Others Feeding"
  ];

  const renderFeedingRows = () => {
    const rows = [];
    for (let i = 0; i < feedingFields.length; i += 3) {
      rows.push(
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {feedingFields.slice(i, i + 3).map((label, idx) => (
            <div key={idx}>
              <label className="block font-medium text-gray-700">{label}</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
  <div
  className="w-screen min-h-screen bg-cover bg-center bg-no-repeat p-0 m-0 overflow-x-hidden" 
  style={{ backgroundImage: `url(${ref})` }} >  
    {<div
      className="p-6 w-auto min-h-screen bg-cover bg-center"
    >
      <div className="bg-[#f5f0e6] bg-opacity-90 p-6 rounded">
        <div className="text-center mb-6 bg-[#F9D232] p-4 rounded">
          <h1 className="text-2xl font-bold text-gray-800">Operator Performance Form</h1>
          <p className="text-sm text-gray-700">(Prep Section)</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">General Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Date</label>
              <input type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Number of Operator Present</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={numOperators}
                onChange={handleNumOperatorsChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f0f0] p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Operator Details</h2>
          {[...Array(numOperators)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <div>
                <label className="block font-medium text-gray-700">Operator Name</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Select</option>
                  <option>Prasanta Santra</option>
                  <option>Raghav Roy</option>
                  <option>Srimanta Pramanik</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Shift Hours</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={shiftHours[index] || ""}
                  onChange={(e) => handleShiftHourChange(index, e.target.value)}
                >
                  <option>Select</option>
                  <option>8 Hours</option>
                  <option>12 Hours</option>
                  <option>16 Hours</option>
                  <option>24 Hours</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Shift Name</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Select</option>
                  {getShiftNameOptions(shiftHours[index]).map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Steam Consumption Entries</h2>
          {['Shift A', 'Shift B', 'Shift C'].map((shift, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded">{shift}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700">Steam Total Open</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter open value" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Steam Total Close</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter close value" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#f0f0f0] p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Ampere Load Entries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Shift A', 'Shift B', 'Shift C'].map((shift, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded">{shift}</h3>
                <label className="block font-medium text-gray-700">Total Ampere Load</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter ampere load" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Feeding Entries</h2>
          {renderFeedingRows()}
        </div>

        <div className="text-center">
          <button className="bg-[#ACFD8B] text-black font-semibold px-6 py-2 rounded hover:brightness-90">
            Submit
          </button>
        </div>
      </div>
    </div>}
  </div>
  );
};

export default NewPerpForm;*/
import React, { useState } from "react";

const NewPerpForm = () => {
  const [numOperators, setNumOperators] = useState(1);
  const [shiftHours, setShiftHours] = useState(Array(numOperators).fill(""));

  const handleNumOperatorsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumOperators(value);
    setShiftHours(Array(value).fill(""));
  };

  const handleShiftHourChange = (index, value) => {
    const newShiftHours = [...shiftHours];
    newShiftHours[index] = value;
    setShiftHours(newShiftHours);
  };

  const getShiftNameOptions = (shiftHour) => {
    if (shiftHour === "8 Hours") {
      return ["Shift A", "Shift B", "Shift C"];
    } else if (shiftHour === "12 Hours") {
      return [
        "Shift A + Shift B(1/2)",
        "Shift B + Shift C(1/2)",
        "Shift C + Shift A(1/2)",
        "Shift A(1/2) + Shift B",
        "Shift B(1/2) + Shift C",
        "Shift C(1/2) + Shift A",
      ];
    } else if (shiftHour === "16 Hours") {
      return [
        "Shift A + Shift B",
        "Shift B + Shift C",
        "Shift C + Shift A"
      ];
    } else if (shiftHour === "24 Hours") {
      return ["Shift A + Shift B + Shift C"];
    } else {
      return [];
    }
  };

  return (
    <div className="p-6 min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      <div className="bg-[#F7F7F7] p-6 rounded-lg shadow-lg">
        <div className="text-center mb-6 bg-[#F9D232] p-4 rounded">
          <h1 className="text-2xl font-bold text-gray-800">Operator Performance Form</h1>
          <p className="text-sm text-gray-600">(Prep Section)</p>
        </div>

        {/* Section 1 */}
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Date</label>
              <input type="date" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Number of Operator Present</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={numOperators}
                onChange={handleNumOperatorsChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Operator Details</h2>
          {[...Array(numOperators)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <div>
                <label className="block font-medium text-gray-700">Operator Name</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Select</option>
                  <option>Prasanta Santra</option>
                  <option>Raghav Roy</option>
                  <option>Srimanta Pramanik</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Shift Hours</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={shiftHours[index] || ""}
                  onChange={(e) => handleShiftHourChange(index, e.target.value)}
                >
                  <option>Select</option>
                  <option>8 Hours</option>
                  <option>12 Hours</option>
                  <option>16 Hours</option>
                  <option>24 Hours</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Shift Name</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Select</option>
                  {getShiftNameOptions(shiftHours[index]).map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3 */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Steam Consumption Entries</h2>
          {['Shift A', 'Shift B', 'Shift C'].map((shift, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-medium text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded w-[75%] mx-auto text-center">{shift}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700">Steam Total Open</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter open value" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Steam Total Close</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter close value" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4 */}
        <div className="bg-gray-100 p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Ampere Load Entries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Shift A', 'Shift B', 'Shift C'].map((shift, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-gray-800 mb-2 bg-[#F0CB8A] p-2 rounded text-center">{shift}</h3>
                <label className="block font-medium text-gray-700">Total Ampere Load</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter ampere load" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="font-bold text-lg mb-4 bg-[#F0CB8A] p-2 rounded">Total Feeding Entries</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Bran 21% (Local) Feeding", "Bran 20% (Raw) Feeding", "Bran 10% (Mota) Feeding", "Pora D.O.R.B. Feeding", "Valo D.O.R.B. Feeding", "Others Feeding"].map((label, idx) => (
              <div key={idx}>
                <label className="block font-medium text-gray-700">{label}</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder={`Enter ${label.toLowerCase()}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-[#ACFD8B] text-gray-800 px-6 py-2 rounded-lg font-semibold hover:shadow-md transition duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPerpForm;


