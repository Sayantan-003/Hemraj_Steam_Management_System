import React, { useState } from "react";

const NewSolventForm = () => {
  const [numOperators, setNumOperators] = useState(1);
  const [operatorDetails, setOperatorDetails] = useState([
    { name: "", shiftHour: "", shiftName: "" },
  ]);

  const [labReport, setLabReport] = useState({
    shiftA: { colour: "", moisture: "", dorb: "" },
    shiftB: { colour: "", moisture: "", dorb: "" },
    shiftC: { colour: "", moisture: "", dorb: "" },
  });

  const [steamConsumption, setSteamConsumption] = useState({
    shiftA: { line3: "", line6: "" },
    shiftB: { line3: "", line6: "" },
    shiftC: { line3: "", line6: "" },
  });

  const [totalProduction, setTotalProduction] = useState({
    totalCrude: "",
    shiftA: "",
    shiftB: "",
    shiftC: "",
  });

  const handleNumOperatorChange = (e) => {
    const value = parseInt(e.target.value);
    setNumOperators(value);
    const details = Array.from({ length: value }, () => ({
      name: "",
      shiftHour: "",
      shiftName: "",
    }));
    setOperatorDetails(details);
  };

  const handleOperatorChange = (index, field, value) => {
    const newDetails = [...operatorDetails];
    newDetails[index][field] = value;
    if (field === "shiftHour") {
      newDetails[index]["shiftName"] = "";
    }
    setOperatorDetails(newDetails);
  };

  const getShiftNameOptions = (shiftHour) => {
    switch (shiftHour) {
      case "8":
        return ["Shift A", "Shift B", "Shift C"];
      case "12":
        return [
          "Shift A + Shift B(1/2)",
          "Shift B + Shift C(1/2)",
          "Shift C + Shift A(1/2)",
        ];
      case "16":
        return ["Shift A + Shift B", "Shift B + Shift C", "Shift C + Shift A"];
      case "24":
        return ["Shift A + Shift B + Shift C"];
      default:
        return [];
    }
  };

  const handleLabChange = (shift, field, value) => {
    setLabReport((prev) => ({
      ...prev,
      [shift]: {
        ...prev[shift],
        [field]: value,
      },
    }));
  };

  const handleSteamChange = (shift, field, value) => {
    setSteamConsumption((prev) => ({
      ...prev,
      [shift]: {
        ...prev[shift],
        [field]: value,
      },
    }));
  };

  const handleTotalProductionChange = (field, value) => {
    setTotalProduction((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const sectionGradient = "linear-gradient(to right, #f9804c, #fab07c)";
  const buttonGradient = "linear-gradient(to right, #ACFD8B, #c1fdb0)";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#fff2eb] rounded-xl shadow-md">
      <div className="text-center mb-6 p-4 rounded text-white" style={{ backgroundImage: sectionGradient }}>
        <h1 className="text-2xl font-bold">Operator Performance Form</h1>
        <p className="text-sm">(Solvent Section)</p>
      </div>

      {/* Date & Operator Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" className="w-full border rounded px-3 py-2" placeholder="Select date" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Operators Present</label>
          <select value={numOperators} onChange={handleNumOperatorChange} className="w-full border rounded px-3 py-2">
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Operator Details */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white px-3 py-2 rounded" style={{ backgroundImage: sectionGradient }}>Operator Details</h2>
        {operatorDetails.map((op, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Operator Name</label>
              <select
                value={op.name}
                onChange={(e) => handleOperatorChange(i, "name", e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Operator</option>
                <option value="Prasanta Santra">Prasanta Santra</option>
                <option value="Raghav Roy">Raghav Roy</option>
                <option value="Srimanta Pramanik">Srimanta Pramanik</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Hour</label>
              <select
                value={op.shiftHour}
                onChange={(e) => handleOperatorChange(i, "shiftHour", e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Hours</option>
                <option value="8">8 Hours</option>
                <option value="12">12 Hours</option>
                <option value="16">16 Hours</option>
                <option value="24">24 Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Name</label>
              <select
                value={op.shiftName}
                onChange={(e) => handleOperatorChange(i, "shiftName", e.target.value)}
                className="w-full border rounded px-3 py-2"
                disabled={!op.shiftHour}
              >
                <option value="">Select Shift</option>
                {getShiftNameOptions(op.shiftHour).map((opt, j) => (
                  <option key={j} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Report Entries Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white px-3 py-2 rounded" style={{ backgroundImage: sectionGradient }}>Lab Report Entries</h2>
        {["shiftA", "shiftB", "shiftC"].map((shift, idx) => (
          <div key={shift} className="mb-4">
            <h3 className="text-md font-semibold text-center w-3/4 mx-auto text-white px-2 py-1 rounded mb-2" style={{ backgroundImage: sectionGradient }}>
              Shift {String.fromCharCode(65 + idx)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['colour', 'moisture', 'dorb'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${field}`}
                    value={labReport[shift][field]}
                    onChange={(e) => handleLabChange(shift, field, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Steam Consumption Entries Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white px-3 py-2 rounded" style={{ backgroundImage: sectionGradient }}>Steam Consumption Entries</h2>
        {["shiftA", "shiftB", "shiftC"].map((shift, idx) => (
          <div key={shift} className="mb-4">
            <h3 className="text-md font-semibold text-center w-3/4 mx-auto text-white px-2 py-1 rounded mb-2" style={{ backgroundImage: sectionGradient }}>
              Shift {String.fromCharCode(65 + idx)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['line3', 'line6'].map((line) => (
                <div key={line}>
                  <label className="block text-sm font-medium text-gray-700">{line.replace('line', 'Line ')}</label>
                  <input
                    type="text"
                    placeholder={`Enter ${line.replace('line', 'Line ')}`}
                    value={steamConsumption[shift][line]}
                    onChange={(e) => handleSteamChange(shift, line, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Total Production */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-white px-3 py-2 rounded" style={{ backgroundImage: sectionGradient }}>Total Production Entries</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total Crude Oil Production</label>
          <input
            type="text"
            placeholder="Enter total crude oil production"
            value={totalProduction.totalCrude}
            onChange={(e) => handleTotalProductionChange("totalCrude", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["shiftA", "shiftB", "shiftC"].map((shift, idx) => (
            <div key={shift}>
              <h3 className="text-md font-semibold text-center w-3/4 mx-auto text-white px-2 py-1 rounded mb-2" style={{ backgroundImage: sectionGradient }}>
                Shift {String.fromCharCode(65 + idx)}
              </h3>
              <label className="block text-sm font-medium text-gray-700">Number of Batch</label>
              <select
                value={totalProduction[shift]}
                onChange={(e) => handleTotalProductionChange(shift, e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="text-black font-semibold py-2 px-6 rounded"
          style={{ backgroundImage: buttonGradient }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewSolventForm;
