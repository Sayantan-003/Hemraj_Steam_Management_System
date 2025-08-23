import React, { useState,useEffect } from "react";
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

  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async () => {
    // Validate required fields
    if (!date) {
      setSubmitStatus({ loading: false, error: "Please select a date", success: false });
      return;
    }

    if (!operatorDetails[0].name || !operatorDetails[0].shiftHour || !operatorDetails[0].shiftName) {
      setSubmitStatus({ loading: false, error: "Please fill operator details", success: false });
      return;
    }

    try {
      setSubmitStatus({ loading: true, error: null, success: false });
      
      const payload = { date, operatorDetails, labReport, steam, production };
      console.log("Submitting payload:", payload);

      const response = await fetch('/api/solvent/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save data');
      }

      console.log("Server response:", data);
      setSubmitStatus({ loading: false, error: null, success: true });

      // Clear form after successful submission
      setDate("");
      setOperatorDetails([{ name: "", shiftHour: "", shiftName: "" }]);
      setNumOperators(1);
      setLabReport({ shiftA: {}, shiftB: {}, shiftC: {} });
      setSteam({ shiftA: {}, shiftB: {}, shiftC: {} });
      setProduction({ shiftA: "", shiftB: "", shiftC: "" });

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ loading: false, error: error.message, success: false });
    }
  };

  useEffect(()=>{
    setOperatorDetails((prev) => {
      const updated = [...prev];
      while (updated.length < numOperators){
        updated.push({ name:"", shiftHour: "", shiftName: ""});
      }
      return updated.slice (0, numOperators);
    });
  }, [numOperators]);

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
      <div className="text-center space-y-4">
        {submitStatus.error && (
          <div className="text-red-600 bg-red-50 p-3 rounded">
            {submitStatus.error}
          </div>
        )}
        {submitStatus.success && (
          <div className="text-green-600 bg-green-50 p-3 rounded">
            Data saved successfully!
          </div>
        )}
        <button 
          onClick={handleSubmit} 
          disabled={submitStatus.loading}
          className={`bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 \${
            submitStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitStatus.loading ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default NewSolventForm;