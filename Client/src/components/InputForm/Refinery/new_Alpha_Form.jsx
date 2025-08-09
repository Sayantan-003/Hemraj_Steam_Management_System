import React, { useState } from "react";
import ShiftSelector from "../../utils/ShiftSelector";
import RefineryOperatorNames from "../../../constants/refineryOperatorNames";
import { toast } from "react-hot-toast";
export default function New_Alpha_Form({ formData, onChange }) {
  return (
    <form>
      <div>
        <label>Batch Number</label>
        <input
          type="text"
          value={formData.batchNumber || ""}
          onChange={(e) => onChange("batchNumber", e.target.value)}
        />
      </div>

      <div>
        <label>Production Quantity</label>
        <input
          type="number"
          value={formData.productionQty || ""}
          onChange={(e) => onChange("productionQty", e.target.value)}
        />
      </div>

      <div>
        <label>Steam Used</label>
        <input
          type="number"
          value={formData.steamUsed || ""}
          onChange={(e) => onChange("steamUsed", e.target.value)}
        />
      </div>
    </form>
  );
}