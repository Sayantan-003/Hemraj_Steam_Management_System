import React, { useState } from "react";
import OperatorSection from "./OperatorSection";
import LabReportSection from "./LabReportSection";
import SteamSection from "./SteamSection";
import ProductionSection from "./ProductionSection";

const operatorNames = ["Operator 1", "Operator 2", "Operator 3"];

const NewSolventForm = () => {
  const [date, setDate] = useState("");
  const [numOperators, setNumOperators] = useState(1);
  const [operatorDetails, setOperatorDetails] = useState([{ name: "", shiftHour: "", shiftName: "" }]);
  const [labReport, setLabReport] = useState({ shiftA: {}, shiftB: {}, shiftC: {} });
  const [steam, setSteam] = useState({ shiftA: {}, shiftB: {}, shiftC: {} });
  const [production, setProduction] = useState({ shiftA: "", shiftB: "", shiftC: "" });

  const handleOperatorChange = (index, value) => {
    const updated = [...operatorDetails];
    updated[index] = value;
    setOperatorDetails(updated);
  };

  const handleLabChange = (shift, field, value) => {
    setLabReport(prev => ({ ...prev, [shift]: { ...prev[shift], [field]: value } }));
  };

  const handleSteamChange = (shift, type, value) => {
    setSteam(prev => ({ ...prev, [shift]: { ...prev[shift], [type]: value } }));
  };

  const handleProductionChange = (shift, value) => {
    setProduction(prev => ({ ...prev, [shift]: value }));
  };

  const handleSubmit = () => {
    const payload = { date, operatorDetails, labReport, steam, production };
    console.log("Submitting:", payload);
    // You can POST this payload to Express backend
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">New Solvent Form</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <OperatorSection
        operatorData={operatorDetails}
        numOperators={numOperators}
        onCountChange={(e) => setNumOperators(+e.target.value)}
        onChange={handleOperatorChange}
        operatorNames={operatorNames}
      />
      <LabReportSection labReport={labReport} onChange={handleLabChange} />
      <SteamSection steam={steam} onChange={handleSteamChange} />
      <ProductionSection production={production} onChange={handleProductionChange} />
      <div className="text-center">
        <button onClick={handleSubmit} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Submit</button>
      </div>
    </div>
  );
};

export default NewSolventForm;