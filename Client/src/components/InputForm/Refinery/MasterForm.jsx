import React, { useState } from "react";
import new_Alpha_Form from "./new_Alpha_Form";
import new_DeGum_Bleach_Form from "./new_DeGum_Bleach_Form";
import new_DEO_Form from "./new_DEO_Form";
import new_DeWaxing_Form from "./new_DeWaxing_Form";

export default function MasterRefineryForm() {
  const [alphaData, setAlphaData] = useState({});
  const [degumData, setDegumData] = useState({});
  const [deoData, setDeoData] = useState({});
  const [dewaxData, setDewaxData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAlphaChange = (field, value) =>
    setAlphaData((prev) => ({ ...prev, [field]: value }));
  const handleDegumChange = (field, value) =>
    setDegumData((prev) => ({ ...prev, [field]: value }));
  const handleDeoChange = (field, value) =>
    setDeoData((prev) => ({ ...prev, [field]: value }));
  const handleDewaxChange = (field, value) =>
    setDewaxData((prev) => ({ ...prev, [field]: value }));

  // Validation helper
  const isFormValid = (data, requiredFields) =>
    requiredFields.every(
      (field) => data[field] !== undefined && data[field] !== ""
    );

  const handleSubmitAll = async () => {
    const alphaRequired = ["batchNumber", "productionQty", "steamUsed"];
    const degumRequired = ["oilType", "degumTemp", "bleachTime"];
    const deoRequired =   ["deoStartTime", "deoEndTime", "steamPressure"];
    const dewaxRequired = ["coolingTemp", "filtrationTime", "waxContent"];

    if (!isFormValid(alphaData, alphaRequired)) {
      alert("Please fill all Alpha form fields");
      return;
    }
    if (!isFormValid(degumData, degumRequired)) {
      alert("Please fill all DeGum & Bleach form fields");
      return;
    }
    if (!isFormValid(deoData, deoRequired)) {
      alert("Please fill all DEO form fields");
      return;
    }
    if (!isFormValid(dewaxData, dewaxRequired)) {
      alert("Please fill all DeWaxing form fields");
      return;
    }

    setLoading(true);
    try {
      const results = await Promise.allSettled([
        fetch("/api/alpha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alphaData),
        }),
        fetch("/api/degum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(degumData),
        }),
        fetch("/api/deo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deoData),
        }),
        fetch("/api/dewax", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dewaxData),
        }),
      ]);

      let failedForms = [];
      results.forEach((res, i) => {
        if (res.status === "fulfilled" && res.value.ok) {
          console.log(`Form ${i + 1} submitted successfully`);
        } else {
          failedForms.push(
            ["Alpha", "DeGum & Bleach", "DEO", "DeWaxing"][i]
          );
        }
      });

      if (failedForms.length > 0) {
        alert(
          `Some forms failed to submit:\n- ${failedForms.join("\n- ")}`
        );
      } else {
        alert("All forms submitted successfully!");
      }
    } catch (error) {
      console.error("Unexpected error submitting forms", error);
      alert("Unexpected error occurred while submitting forms.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Refinery Production Forms</h2>

      <h3>Alpha Section</h3>
      <new_Alpha_Form formData={alphaData} onChange={handleAlphaChange} />

      <h3>DeGum & Bleach Section</h3>
      <new_DeGum_Bleach_Form formData={degumData} onChange={handleDegumChange} />

      <h3>DEO Section</h3>
      <new_DEO_Form formData={deoData} onChange={handleDeoChange} />

      <h3>DeWaxing Section</h3>
      <new_DeWaxing_Form formData={dewaxData} onChange={handleDewaxChange} />

      <button onClick={handleSubmitAll} disabled={loading}>
        {loading ? "Submitting..." : "Submit All"}
      </button>
    </div>
  );
}
