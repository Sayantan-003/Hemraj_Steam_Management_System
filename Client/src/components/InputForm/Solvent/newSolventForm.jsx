import React, { useState } from "react";
import OperatorSection from "./OperatorSection";
import LabReportSection from "./LabReportSection";
import SteamSection from "./SteamSection";
import ProductionSection from "./ProductionSection";
import solventOperatorNames from "../../../constants/solventOperatorNames";
import FormHeader from "./FormHeader";

const operatorNames = solventOperatorNames;

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
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-6 px-4">
    <FormHeader title='Operator Performance Form' subtitle='Solvent Section' className="py-3" />
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-4 bg-white">
        <label className=" text-sm font-medium bg-white text-gray-700">Date</label>
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
  </div>
  );
};

export default NewSolventForm;