// components/forms/solvent/LabReportSection.jsx
import FormHeader from "./FormHeader";

const LabReportSection = ({ labReport, onChange }) => {
  const fields = ["colour", "moisture", "dorb"];
  const shifts = ["shiftA", "shiftB", "shiftC"];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <FormHeader title="Lab Report Entries" />
      {shifts.map((shift, idx) => (
        <div key={shift} className="mb-4">
          <h3 className="text-md font-semibold text-center w-3/4 mx-auto text-white px-2 py-1 rounded mb-2"
              style={{ backgroundImage: "linear-gradient(to right, #f9804c, #fab07c)" }}>
            Shift {String.fromCharCode(65 + idx)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field}</label>
                <input
                  type="text"
                  value={labReport[shift][field]}
                  onChange={(e) => onChange(shift, field, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabReportSection;
