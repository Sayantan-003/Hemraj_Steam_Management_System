import FormHeader from "./FormHeader";

const SteamSection = ({ steam, onChange }) => {
  const shifts = ["shiftA", "shiftB", "shiftC"];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <FormHeader title="Steam Entry" />
      {shifts.map((shift, idx) => (
        <div key={shift} className="mb-4">
          <h3 className="text-md font-semibold text-center w-3/4 mx-auto text-white px-2 py-1 rounded mb-2"
              style={{ backgroundImage: "linear-gradient(to right, #f9804c, #fab07c)" }}>
            Shift {String.fromCharCode(65 + idx)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Open Reading"
              value={steam[shift]?.open || ""}
              onChange={(e) => onChange(shift, "open", e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Close Reading"
              value={steam[shift]?.close || ""}
              onChange={(e) => onChange(shift, "close", e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SteamSection;