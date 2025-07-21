import mongoose from 'mongoose';

const timeSessionSchema = {
  time: String, // Format: "HH:MM"
  session: {
    type: String,
    enum: ['AM', 'PM'],
    required: true
  }
};

const crudeOilColorSchema = new mongoose.Schema({
  ...timeSessionSchema,
  color: { type: String, required: true }
});

const crudeOilMoistureSchema = new mongoose.Schema({
  ...timeSessionSchema,
  moisture_percent: { type: Number, required: true }
});

const dorbOilSchema = new mongoose.Schema({
  ...timeSessionSchema,
  dorb_percent: { type: Number, required: true }
});

const steamConsumedSchema = new mongoose.Schema({
  pipe_size: { type: String, enum: ['3"', '6"'], required: true },
  shift_section: { type: String, enum: ['A', 'B'], required: true },
  amount: { type: Number, required: true }
});

const DailyLogSchema = new mongoose.Schema({
  operator_name: { type: String, required: true },
  shift_hours: { type: Number, required: true },
  shift_name: { type: String, required: true },
  log_date: { type: Date, default: Date.now },

  crude_oil_color: [crudeOilColorSchema],
  crude_oil_moisture: [crudeOilMoistureSchema],
  dorb_oil: [dorbOilSchema],
  steam_consumed: [steamConsumedSchema]
});

export default mongoose.model('DailyLog', DailyLogSchema);
