import DailyLog from '../models/solvent/FormSchema.js';

class SolventService {
    calculateOperatorMetrics(formData) {
        const { operators, shifts, steamReadings, labReports } = formData;
        const operatorMetrics = {};

        // Initialize operator metrics
        operators.forEach(operator => {
            operatorMetrics[operator.id] = {
                totalHours: 0,
                production: 0,
                steamConsumed: 0,
                color: 0,
                moisture: 0,
                dorb: 0,
                shiftsWorked: []
            };
        });

        // Calculate total hours for each operator
        operators.forEach(operator => {
            operator.shifts.forEach(shiftId => {
                const shift = shifts.find(s => s.id === shiftId);
                if (shift) {
                    operatorMetrics[operator.id].totalHours += shift.duration;
                    operatorMetrics[operator.id].shiftsWorked.push(shift);
                }
            });
        });

        // Calculate metrics based on shift duration
        operators.forEach(operator => {
            const metrics = operatorMetrics[operator.id];
            const totalHours = metrics.totalHours;

            if (totalHours === 24) {
                // 24-hour shift: operator gets all values
                metrics.production = formData.totalProduction;
                metrics.steamConsumed = this.calculateTotalSteamConsumed(steamReadings);
                metrics.color = this.calculateAverageMetric(labReports, 'color');
                metrics.moisture = this.calculateAverageMetric(labReports, 'moisture');
                metrics.dorb = this.calculateAverageMetric(labReports, 'dorb');
            } else {
                // Calculate proportional values based on hours worked
                const hourlyRatio = totalHours / 24;
                metrics.production = formData.totalProduction * hourlyRatio;
                metrics.steamConsumed = this.calculateTotalSteamConsumed(steamReadings) * hourlyRatio;

                // For lab metrics, calculate average only for shifts worked
                metrics.color = this.calculateShiftBasedAverage(metrics.shiftsWorked, labReports, 'color');
                metrics.moisture = this.calculateShiftBasedAverage(metrics.shiftsWorked, labReports, 'moisture');
                metrics.dorb = this.calculateShiftBasedAverage(metrics.shiftsWorked, labReports, 'dorb');
            }
        });

        return operatorMetrics;
    }

    calculateTotalSteamConsumed(steamReadings) {
        return steamReadings.reduce((total, reading) => {
            return total + (reading.closing - reading.opening);
        }, 0);
    }

    calculateAverageMetric(labReports, metric) {
        const values = labReports.map(report => report[metric]);
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    calculateShiftBasedAverage(shiftsWorked, labReports, metric) {
        const relevantReports = labReports.filter(report => 
            shiftsWorked.some(shift => shift.id === report.shiftId)
        );
        return this.calculateAverageMetric(relevantReports, metric);
    }

    async createDailyLog(formData) {
        const operatorMetrics = this.calculateOperatorMetrics(formData);
        
        const dailyLog = new DailyLog({
            date: formData.date,
            operators: Object.entries(operatorMetrics).map(([operatorId, metrics]) => ({
                operatorId,
                ...metrics
            })),
            crude_oil_color: formData.labReports.map(report => ({
                shift: report.shiftId,
                value: report.color
            })),
            crude_oil_moisture: formData.labReports.map(report => ({
                shift: report.shiftId,
                value: report.moisture
            })),
            dorb_oil: formData.labReports.map(report => ({
                shift: report.shiftId,
                value: report.dorb
            })),
            steam_consumed: formData.steamReadings.map(reading => ({
                shift: reading.shiftId,
                opening: reading.opening,
                closing: reading.closing
            }))
        });

        return await dailyLog.save();
    }
}

export default new SolventService();
