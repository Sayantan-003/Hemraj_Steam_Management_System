import DailyLog from '../models/solvent/FormSchema.js';
import solventService from '../service/solvent.service.js';

import { exportToCSV, exportToExcel } from '../utils/exportUtils.js';
// Export dashboard data as CSV/Excel
export const exportSolventDashboard = async (req, res) => {
  try {
    const { startDate, endDate, operatorName, shiftHours, metrics, format } = req.query;
    const dashboardData = await solventService.getDashboardMetrics({
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      operatorName,
      shiftHours
    });

    // Default metrics if not specified
    const allMetrics = [
      'crudeOilColor',
      'crudeOilMoisture',
      'dorbOilMoisture',
      'steamConsumed',
      'electricConsumedWBSEDCL',
      'electricConsumedSolar',
      'totalProduction'
    ];
    const selectedMetrics = metrics ? metrics.split(',') : allMetrics;

    // Prepare data for export
    const row = {};
    selectedMetrics.forEach(metric => {
      row[metric] = dashboardData.performanceParameters[metric];
    });
    const data = [row];

    if (format === 'excel') {
      const buffer = await exportToExcel(data, selectedMetrics);
      res.setHeader('Content-Disposition', 'attachment; filename="solvent_dashboard.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.end(Buffer.from(buffer));
    } 
  } catch (error) {
    console.error('Error exporting dashboard:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSolventLog = async (req, res) => {
    try {
        const { date, operatorDetails, labReport, steam, production } = req.body;

        // Transform the input data into the format expected by the service
        const formattedData = {
            date,
            operators: operatorDetails.map(operator => ({
                operatorId: operator.name,
                totalHours: parseInt(operator.shiftHour),
                shifts: [operator.shiftName]
            })),
            labReports: operatorDetails.map(operator => {
                const shiftKey = `shift${operator.shiftName}`;
                return {
                    shiftId: operator.shiftName,
                    color: labReport[shiftKey]?.color || 0,
                    moisture: labReport[shiftKey]?.moisture || 0,
                    dorb: labReport[shiftKey]?.dorb || 0
                };
            }),
            steamReadings: operatorDetails.map(operator => {
                const shiftKey = `shift${operator.shiftName}`;
                return {
                    shiftId: operator.shiftName,
                    opening: steam[shiftKey]?.opening || 0,
                    closing: steam[shiftKey]?.closing || 0
                };
            }),
            totalProduction: Object.values(production).reduce((total, current) => total + (parseFloat(current) || 0), 0)
        };

        // Save using the service
        const savedLog = await solventService.createDailyLog(formattedData);
        return res.status(201).json({ 
            message: 'Log saved successfully', 
            data: savedLog 
        });
    } catch (error) {
        console.error('Error saving solvent log:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSolventDashboardData = async (req, res) => {
    try {
        const { startDate, endDate, operatorName, shiftHours } = req.query;
        
        const dashboardData = await solventService.getDashboardMetrics({
            startDate: startDate ? new Date(startDate) : new Date(),
            endDate: endDate ? new Date(endDate) : new Date(),
            operatorName,
            shiftHours
        });

        return res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSolventPerformanceHistory = async (req, res) => {
    try {
        const { startDate, endDate, operatorName, metric } = req.query;
        
        const performanceData = await solventService.getPerformanceHistory({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            operatorName,
            metric
        });

        return res.status(200).json(performanceData);
    } catch (error) {
        console.error('Error fetching performance history:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAvailableOperators = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const operators = await solventService.getOperatorsForDateRange(
            startDate || new Date(),
            endDate || new Date()
        );
        res.json(operators);
    } catch (error) {
        console.error('Error fetching operators:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getShiftDetails = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const shiftDetails = await solventService.getShiftDetailsForDateRange(
            startDate || new Date(),
            endDate || new Date()
        );
        res.json(shiftDetails);
    } catch (error) {
        console.error('Error fetching shift details:', error);
        res.status(500).json({ error: 'Internal server error' });
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
