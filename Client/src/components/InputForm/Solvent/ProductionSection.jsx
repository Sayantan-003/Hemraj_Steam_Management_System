import FormHeader from "./FormHeader";

const ProductionSection = ({ production, onChange }) => {
  const shifts = ["shiftA", "shiftB", "shiftC"];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <FormHeader title="Production Entry" />
      {shifts.map((shift, idx) => (
        <div key={shift} className="mb-4">
          <h3 className="text-md font-semibold text-center w-3/4 mx-auto text-white px-2 py-1 rounded mb-2"
              style={{ backgroundImage: "linear-gradient(to right, #f9804c, #fab07c)" }}>
            Shift {String.fromCharCode(65 + idx)}
          </h3>
          <input
            type="text"
            placeholder="Production (MT)"
            value={production[shift] || ""}
            onChange={(e) => onChange(shift, e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductionSection;