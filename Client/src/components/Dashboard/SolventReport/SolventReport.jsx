import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  Download,
  RefreshCw,
  Activity,
} from "lucide-react";

import Filters from "./Filters";

const SolventReport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [filter, setFilter] = useState({ operator: "", hours: "", shift: "" });
  const [operators, setOperators] = useState([""]);
  const [shiftHours, setShiftHours] = useState([""]);
  const [shiftNames, setShiftNames] = useState([""]);
  const [exportDialog, setExportDialog] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({
    crudeOilColor: true,
    crudeOilMoisture: true,
    dorbOilMoisture: true,
    steamConsumed: true,
    electricConsumedWBSEDCL: true,
    electricConsumedSolar: true,
    totalProduction: true,
  });
  const [exportFormat, setExportFormat] = useState("csv");
  const [parameters, setParameters] = useState([
    { name: "Crude Oil Color", value: "32" },
    { name: "Crude Oil Moisture", value: "0.25%" },
    { name: "DORB Oil Moisture %", value: "11.30" },
    { name: "Steam Consumed", value: "20.57 Ton" },
    { name: "Electric Consumed (WBSECDL)", value: "2500 units" },
    { name: "Electric Consumed (Solar)", value: "1000 units" },
    { name: "Total Production", value: "682 mT" },
  ]);
  const [charts, setCharts] = useState([
    [
      { name: "00:00", value: 85 },
      { name: "04:00", value: 87 },
      { name: "08:00", value: 92 },
      { name: "12:00", value: 89 },
      { name: "16:00", value: 94 },
      { name: "20:00", value: 91 },
    ],
    [
      { name: "Mon", value: 78 },
      { name: "Tue", value: 82 },
      { name: "Wed", value: 85 },
      { name: "Thu", value: 79 },
      { name: "Fri", value: 88 },
      { name: "Sat", value: 84 },
    ],
    [
      { name: "Jan", value: 145 },
      { name: "Feb", value: 152 },
      { name: "Mar", value: 138 },
      { name: "Apr", value: 161 },
      { name: "May", value: 147 },
      { name: "Jun", value: 155 },
    ],
  ]);
  const [loading, setLoading] = useState(false);

  const fetchSolventData = async ({ type, value }) => {
    setLoading(true);
    try {
      let startDate, endDate;

      if (type === "date" && value) {
        startDate = value.toISOString().split("T")[0];
        endDate = startDate;
      } else if (type === "range" && value?.start && value?.end) {
        startDate = value.start.toISOString().split("T")[0];
        endDate = value.end.toISOString().split("T")[0];
      } else {
        setLoading(false);
        return;
      }

      // Fetch dashboard data
      const dashboardUrl = `/api/solvent/dashboard?startDate=${startDate}&endDate=${endDate}&operatorName=${
        filter.operator || "All"
      }&shiftHours=${filter.hours || "All"}`;
      const dashboardRes = await fetch(dashboardUrl);
      const dashboardData = await dashboardRes.json();

      // Format parameters from dashboard data
      const newParameters = [
        {
          name: "Crude Oil Color",
          value: dashboardData.performanceParameters.crudeOilColor.toFixed(2),
        },
        {
          name: "Crude Oil Moisture",
          value: `${dashboardData.performanceParameters.crudeOilMoisture.toFixed(
            2
          )}%`,
        },
        {
          name: "DORB Oil Moisture %",
          value: dashboardData.performanceParameters.dorbOilMoisture.toFixed(2),
        },
        {
          name: "Steam Consumed",
          value: `${dashboardData.performanceParameters.steamConsumed.toFixed(
            2
          )} Ton`,
        },
        {
          name: "Electric Consumed (WBSECDL)",
          value: `${dashboardData.performanceParameters.electricConsumedWBSEDCL} units`,
        },
        {
          name: "Electric Consumed (Solar)",
          value: `${dashboardData.performanceParameters.electricConsumedSolar} units`,
        },
        {
          name: "Total Production",
          value: `${dashboardData.performanceParameters.totalProduction.toFixed(
            2
          )} mT`,
        },
      ];
      setParameters(newParameters);

      // Fetch performance history for charts
      const [steamRes, unitRes] = await Promise.all([
        fetch(
          `/api/solvent/performance-history?startDate=${startDate}&endDate=${endDate}&operatorName=${
            filter.operator || "All"
          }&metric=steamPerTon`
        ),
        fetch(
          `/api/solvent/performance-history?startDate=${startDate}&endDate=${endDate}&operatorName=${
            filter.operator || "All"
          }&metric=unitPerTon`
        ),
      ]);

      const [steamData, unitData] = await Promise.all([
        steamRes.json(),
        unitRes.json(),
      ]);

      // Format chart data
      const productionChart = dashboardData.hourlyProduction.map(
        (value, index) => ({
          name: `${String(index).padStart(2, "0")}:00`,
          value,
        })
      );

      const steamChart = steamData.map((item) => ({
        name: new Date(item.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        value: item.value,
      }));

      const unitChart = unitData.map((item) => ({
        name: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
        }),
        value: item.value,
      }));

      setCharts([productionChart, steamChart, unitChart]);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        // Get the date range for fetching relevant data
        let startDate, endDate;
        if (dateRange.startDate && dateRange.endDate) {
          startDate = dateRange.startDate;
          endDate = dateRange.endDate;
        } else {
          const today = new Date();
          startDate = today.toISOString().split("T")[0];
          endDate = today.toISOString().split("T")[0];
        }

        // Fetch operators and shift details
        const [operatorsRes, shiftDetailsRes] = await Promise.all([
          fetch(
            `/api/solvent/available-operators?startDate=${startDate}&endDate=${endDate}`
          ),
          fetch(
            `/api/solvent/shift-details?startDate=${startDate}&endDate=${endDate}`
          ),
        ]);

        if (!operatorsRes.ok || !shiftDetailsRes.ok) {
          throw new Error("Failed to fetch dropdown data");
        }

        const operators = await operatorsRes.json();
        const shiftDetails = await shiftDetailsRes.json();

        setOperators(["All", ...operators]);
        setShiftHours(["All", ...shiftDetails.shiftHours]);

        // Update shift names based on the selected hours
        if (filter.hours && shiftDetails.shiftTimings[filter.hours]) {
          setShiftNames(["All", ...shiftDetails.shiftTimings[filter.hours]]);
        } else {
          setShiftNames(["All"]);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        // Set default values if API fails
        setOperators(["All"]);
        setShiftHours(["All", "8", "12", "16", "24"]);
        setShiftNames(["All"]);
      }
    };
    fetchDropdowns();
  }, [dateRange, filter.hours]); // Re-fetch when date range or shift hours change

  const handleExport = async () => {
    try {
      // Get selected metrics
      const metrics = Object.entries(selectedMetrics)
        .filter(([_, selected]) => selected)
        .map(([metric]) => metric)
        .join(",");

      // Build query parameters
      const queryParams = new URLSearchParams({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
        operatorName: filter.operator || "All",
        shiftHours: filter.hours || "All",
        metrics,
        format: exportFormat,
      });

      // Make request to export endpoint
      const response = await fetch(`/api/solvent/export?${queryParams}`);

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `solvent_report.${
        exportFormat === "excel" ? "xlsx" : "csv"
      }`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error exporting report:", error);
      // You might want to show an error toast/notification here
    }
  };

  const ExportDialog = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        exportDialog ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Export Report</h3>

        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Select Format</p>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">CSV</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="excel"
                  checked={exportFormat === "excel"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Excel</span>
              </label>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Select Metrics</p>
            <div className="space-y-2">
              {Object.entries(selectedMetrics).map(([metric, selected]) => (
                <label key={metric} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() =>
                      setSelectedMetrics((prev) => ({
                        ...prev,
                        [metric]: !prev[metric],
                      }))
                    }
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2">
                    {metric
                      .replace(/([A-Z])/g, " $1")
                      .charAt(0)
                      .toUpperCase() +
                      metric.replace(/([A-Z])/g, " $1").slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setExportDialog(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleExport();
              setExportDialog(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 mt-25">
      <ExportDialog />
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Solvent Report
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setExportDialog(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters
          operators={operators}
          shiftHours={shiftHours}
          shiftNames={shiftNames}
          filter={filter}
          setFilter={setFilter}
        />
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading data...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Parameters Table */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">
                      Performance Parameters
                    </h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {parameters.map((param, idx) => (
                    <div
                      key={idx}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {param.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            {param.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="xl:col-span-2 space-y-8">
              {/* Chart 1 - Total Production */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Total Production
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={charts[0]}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      opacity={1}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Charts 2 & 3 - Side by Side for Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart 2 - Steam Used In Per Ton Production */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Steam Used In Per Ton Production
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={charts[1]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#059669"
                        strokeWidth={2.5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Chart 3 - Unit Used in Per Ton Production */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Unit Used in Per Ton Production
                    </h3>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={charts[2]}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        opacity={1}
                      />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#7c3aed"
                        strokeWidth={2.5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolventReport;
