import React, { useState } from "react";
import ShiftSelector from "../../utils/ShiftSelector";
import RefineryOperatorNames from "../../../constants/refineryOperatorNames";
import { toast } from "react-hot-toast";

const New_Alpha_Form = () => {
  const [operatorCount, setOperatorCount] = useState(1);
  const [operatorDetails, setOperatorDetails] = useState([
    { operator: "", shiftHours: "", shiftTiming: "" },
  ]);
  const [date, setDate] = useState("");
  const [dgotDip, setDgotDip] = useState({
    "Shift A": "",
    "Shift B": "",
    "Shift C": "",
  });
  const [dryBasisOilPercent, setDryBasisOilPercent] = useState({
    "Shift A": "",
    "Shift B": "",
    "Shift C": "",
  });
  const [loading, setLoading] = useState(false);

  const handleOperatorCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setOperatorCount(count);
    const updated = Array.from(
      { length: count },
      (_, index) =>
        operatorDetails[index] || {
          operator: "",
          shiftHours: "",
          shiftTiming: "",
        }
    );
    setOperatorDetails(updated);
  };

  const handleDetailChange = (index, value) => {
    const updated = [...operatorDetails];
    updated[index] = value;
    setOperatorDetails(updated);
  };

  const handleDipChange = (shift, value) => {
    setDgotDip((prev) => ({ ...prev, [shift]: value }));
  };

  const handleDryOilChange = (shift, value) => {
    setDryBasisOilPercent((prev) => ({ ...prev, [shift]: value }));
  };

  const handleSubmit = async () => {
    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    for (let i = 0; i < operatorCount; i++) {
      const { operator, shiftHours, shiftTiming } = operatorDetails[i];
      if (!operator || !shiftHours || !shiftTiming) {
        toast.error(`Please complete all fields for operator ${i + 1}`);
        return;
      }
    }

    for (let shift in dgotDip) {
      if (
        dgotDip[shift] === "" ||
        isNaN(dgotDip[shift]) ||
        Number(dgotDip[shift]) < 0
      ) {
        toast.error(`Please enter a valid DGOT Dip value for ${shift}`);
        return;
      }
    }

    for (let shift in dryBasisOilPercent) {
      if (
        dryBasisOilPercent[shift] === "" ||
        isNaN(dryBasisOilPercent[shift]) ||
        Number(dryBasisOilPercent[shift]) < 0
      ) {
        toast.error(`Please enter a valid Dry Oil % for ${shift}`);
        return;
      }
    }

    const payload = {
      section: "Alpha",
      date,
      operators: operatorDetails,
      dgotDip,
      dryBasisOilPercent,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/alpha-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      toast.success("Form submitted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2
        className="text-lg font-semibold text-gray-800 mb-4 px-4 py-2 rounded-md"
        style={{ backgroundColor: "#FFE95B" }}
      >
        Alpha Section
      </h2>

      {/* Date and Operator Count */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Operator Present
            </label>
            <select
              value={operatorCount}
              onChange={handleOperatorCountChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Operator Details */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3
          className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md"
          style={{ backgroundColor: "#FFE95B" }}
        >
          Operator Details
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {[...Array(operatorCount)].map((_, index) => (
            <ShiftSelector
              key={index}
              value={operatorDetails[index]}
              onChange={(val) => handleDetailChange(index, val)}
              operatorNames={RefineryOperatorNames.alpha}
              shiftTimmings={{
                8: ["Shift A", "Shift B", "Shift C"],
                12: [
                  "Shift A + Shift B(1/2)",
                  "Shift B + Shift C(1/2)",
                  "Shift C + Shift A(1/2)",
                  "Shift A(1/2) + Shift B",
                  "Shift B(1/2) + Shift C",
                  "Shift C(1/2) + Shift A",
                ],
                16: [
                  "Shift A + Shift B",
                  "Shift B + Shift C",
                  "Shift C + Shift A",
                ],
                24: ["Shift A + Shift B + Shift C"],
              }}
            />
          ))}
        </div>
      </div>

      {/* Dip/Gap Entries for DGOT Tank */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3
          className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md"
          style={{ backgroundColor: "#FFE95B" }}
        >
          Dip/Gap Entries for DGOT Tank
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Shift A", "Shift B", "Shift C"].map((shift, index) => (
            <div key={index} className="bg-white rounded-md shadow p-4">
              <h4
                className="text-md font-semibold text-gray-800 mb-2 px-3 py-1 rounded-md text-center mx-auto"
                style={{ backgroundColor: "#FFE95B", width: "75%" }}
              >
                {shift}
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dip/Gap of DGOT
                </label>
                <input
                  type="number"
                  value={dgotDip[shift]}
                  onChange={(e) => handleDipChange(shift, e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder={`Enter value for ${shift}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dry Oil % in GUM/S/GAD */}
      <div className="bg-gray-50 rounded-lg p-4 shadow mb-6">
        <h3
          className="font-semibold text-gray-800 mb-4 px-3 py-2 rounded-md"
          style={{ backgroundColor: "#FFE95B" }}
        >
          Dry Oil % in GUM/S/GAD
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Shift A", "Shift B", "Shift C"].map((shift, index) => (
            <div key={index} className="bg-white rounded-md shadow p-4">
              <h4
                className="text-md font-semibold text-gray-800 mb-2 px-3 py-1 rounded-md text-center mx-auto"
                style={{ backgroundColor: "#FFE95B", width: "75%" }}
              >
                {shift}
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dry Oil %
                </label>
                <input
                  type="number"
                  value={dryBasisOilPercent[shift]}
                  onChange={(e) => handleDryOilChange(shift, e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder={`Enter value for ${shift}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default New_Alpha_Form;
