const PrepLog = require('../model/prep/FormSchema');

// Create a new prep log entry
exports.createPrepLog = async (req, res) => {
  try {
    const newLog = new PrepLog(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    console.error("Error creating prep log:", err);
    res.status(500).json({ message: "Failed to create prep log", error: err.message });
  }
};

// Get all prep logs
exports.getAllPrepLogs = async (req, res) => {
  try {
    const logs = await PrepLog.find().sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching prep logs:", err);
    res.status(500).json({ message: "Failed to fetch prep logs", error: err.message });
  }
};

// Get prep log by ID
exports.getPrepLogById = async (req, res) => {
  try {
    const log = await PrepLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Prep log not found" });
    res.status(200).json(log);
  } catch (err) {
    console.error("Error fetching prep log:", err);
    res.status(500).json({ message: "Failed to fetch prep log", error: err.message });
  }
};

// Update prep log by ID
exports.updatePrepLog = async (req, res) => {
  try {
    const updatedLog = await PrepLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLog) return res.status(404).json({ message: "Prep log not found" });
    res.status(200).json(updatedLog);
  } catch (err) {
    console.error("Error updating prep log:", err);
    res.status(500).json({ message: "Failed to update prep log", error: err.message });
  }
};

// Delete prep log by ID
exports.deletePrepLog = async (req, res) => {
  try {
    const deletedLog = await PrepLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: "Prep log not found" });
    res.status(200).json({ message: "Prep log deleted successfully" });
  } catch (err) {
    console.error("Error deleting prep log:", err);
    res.status(500).json({ message: "Failed to delete prep log", error: err.message });
  }
};
