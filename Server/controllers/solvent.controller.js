import DailyLog from '../models/FormSchema.js';

export const createSolventLog = async (req, res) => {
  try {
    const {
      date,
      operatorDetails,
      labReport,
      steam,
      production
    } = req.body;

    const logs = operatorDetails.map(operator => {
      const shiftKey = `shift${operator.shiftName}`;
      return {
        operator_name: operator.name,
        shift_hours: operator.shiftHour,
        shift_name: operator.shiftName,
        log_date: date,
        crude_oil_color: Object.entries(labReport[shiftKey] || {})
          .filter(([key]) => key.includes('color'))
          .map(([_, val]) => val),
        crude_oil_moisture: Object.entries(labReport[shiftKey] || {})
          .filter(([key]) => key.includes('moisture'))
          .map(([_, val]) => val),
        dorb_oil: Object.entries(labReport[shiftKey] || {})
          .filter(([key]) => key.includes('dorb'))
          .map(([_, val]) => val),
        steam_consumed: Object.entries(steam[shiftKey] || {}).map(([_, val]) => val),
        production: production[shiftKey] || ''
      };
    });

    const savedLogs = await DailyLog.insertMany(logs);
    return res.status(201).json({ message: 'Logs saved successfully', data: savedLogs });
  } catch (error) {
    console.error('Error saving solvent log:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSolventDataByOperator = async (req, res) => {
  const { name, date } = req.query;

  if (!name || !date) {
    return res.status(400).json({ error: 'name and date are required' });
  }

  try {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const logs = await DailyLog.find({
      operator_name: name,
      log_date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!logs.length) {
      return res.status(404).json({ error: 'No logs found for operator on given date' });
    }

    const response = {
      operator_name: name,
      date,
      labReports: {
        crude_oil_color: [],
        crude_oil_moisture: [],
        dorb_oil: []
      },
      steam: [],
      production: []
    };

    logs.forEach(log => {
      response.labReports.crude_oil_color.push(...log.crude_oil_color);
      response.labReports.crude_oil_moisture.push(...log.crude_oil_moisture);
      response.labReports.dorb_oil.push(...log.dorb_oil);
      response.steam.push(...log.steam_consumed);
      if (log.production) {
        response.production.push(log.production);
      }
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching operator data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
