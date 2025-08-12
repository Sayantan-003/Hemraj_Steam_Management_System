import React, { useState } from "react";
import New_DeGum_Bleach_Form from "./New_DeGum_Bleach_Form";
import New_DeWaxing_Form from "./New_DeWaxing_Form";
import New_DEO_Form from "./New_DEO_Form";
import New_Alpha_Form from "./New_Alpha_Form";

export default function MasterRefineryForm() {
  const [formData, setFormData] = useState({
    degumBleach: {},
    alpha: {},
    deo: {},
    dewaxing: {}
  });
  
  const [loading, setLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const handleDegumBleachChange = (data) => {
    setFormData(prev => ({ ...prev, degumBleach: data }));
  };

  const handleAlphaChange = (data) => {
    setFormData(prev => ({ ...prev, alpha: data }));
  };

  const handleDeoChange = (data) => {
    setFormData(prev => ({ ...prev, deo: data }));
  };

  const handleDewaxingChange = (data) => {
    setFormData(prev => ({ ...prev, dewaxing: data }));
  };

  const handleSubmitAll = async () => {
    setLoading(true);
    
    // Simulate API submission
    try {
      console.log("Submitting combined form data:", formData);
      
      // Here you would normally send to your API
      // const response = await fetch("/api/refinery-forms", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("All forms submitted successfully!");
      setShowJson(true);
    } catch (error) {
      console.error("Error submitting forms", error);
      alert("Error occurred while submitting forms.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Main Header */}
      <div className="rounded-xl shadow-md mb-6 p-4 text-center" style={{ backgroundColor: '#FFE95B' }}>
        <h1 className="text-3xl font-bold text-gray-800">Refinery Production Forms</h1>
        <p className="text-lg text-gray-700 font-medium mt-1">Master Form Submission</p>
      </div>

      {/* DeGum & Bleach Form */}
      <New_DeGum_Bleach_Form onDataChange={handleDegumBleachChange} />

      {/* Alpha Form */}
      <New_Alpha_Form onDataChange={handleAlphaChange} />

      {/* DEO Form */}
      <New_DEO_Form onDataChange={handleDeoChange} />

      {/* DeWaxing Form */}
      <New_DeWaxing_Form onDataChange={handleDewaxingChange} />

      {/* Submit Button */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
        <button 
          onClick={handleSubmitAll} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
        >
          {loading ? "Submitting..." : "Submit All Forms"}
        </button>
        
        <button 
          onClick={() => setShowJson(!showJson)}
          className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
        >
          {showJson ? "Hide" : "Show"} JSON Preview
        </button>
      </div>

      {/* JSON Preview */}
      {showJson && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md" style={{ backgroundColor: '#FFE95B' }}>
            JSON Output Preview
          </h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}