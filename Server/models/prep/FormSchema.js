const mongoose = require('mongoose');

const steamEntrySchema = new mongoose.Schema({
  shiftName: { type: String, required: true },
  steamTotalOpen: { type: Number, required: true },
}, { _id: false });

const ampereLoadEntrySchema = new mongoose.Schema({
  time: { type: String, required: true }, // You can change to Date if time tracking is exact
  meridian: { type: String, enum: ['AM', 'PM'], required: true },
  totalAmpereLoad: { type: Number, required: true },
}, { _id: false });

const productionSchema = new mongoose.Schema({
  bran21Local: { type: Number, default: 0 },
  bran20Raw: { type: Number, default: 0 },
  bran10Mota: { type: Number, default: 0 },
  poraDORB: { type: Number, default: 0 },
  valoDORB: { type: Number, default: 0 },
}, { _id: false });

const prepFormSchema = new mongoose.Schema({
  section: { type: String, default: 'prep' },

  date: { type: Date, required: true },

  operatorName: { type: String, required: true },
  shiftHours: { type: String, required: true },
  shiftName: { type: String, required: true },

  steamConsumedEntries: [steamEntrySchema],
  ampereLoadEntries: [ampereLoadEntrySchema],

  totalProduction: productionSchema,
}, {
  timestamps: true
});

module.exports = mongoose.model('prep_daily_log', prepFormSchema);
