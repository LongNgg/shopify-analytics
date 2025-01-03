// Import necessary React hooks and Recharts components for data visualization
import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "./App.css";

// Define the structure of our analytics data points
interface DataPoint {
    date: string;
    clicks: number;
    revenue: number;
    conversionRate: number;
}

function App() {
    // State management for data and UI controls
    const [data, setData] = useState<DataPoint[]>([]); // Stores the analytics data
    const [loading, setLoading] = useState(true); // Controls loading state
    const [startDate, setStartDate] = useState("2023-12-01"); // Filter start date
    const [endDate, setEndDate] = useState("2023-12-05"); // Filter end date

    // Load data from JSON file when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await import("./data.json");
                setData(response.default);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter data based on selected date range
    const filteredData = data.filter(
        (item) => item.date >= startDate && item.date <= endDate
    );

    // Calculate summary metrics from filtered data
    const calculateSummary = () => {
        if (filteredData.length === 0)
            return { totalClicks: 0, totalRevenue: 0, avgConversionRate: 0 };

        const totalClicks = filteredData.reduce(
            (sum, item) => sum + item.clicks,
            0
        );
        const totalRevenue = filteredData.reduce(
            (sum, item) => sum + item.revenue,
            0
        );
        const avgConversionRate =
            filteredData.reduce((sum, item) => sum + item.conversionRate, 0) /
            filteredData.length;

        return { totalClicks, totalRevenue, avgConversionRate };
    };

    // Format date strings for display in chart
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const summary = calculateSummary();

    // Define color scheme for different metrics in the chart
    const chartColors = {
        clicks: "#10b981", // emerald-500
        revenue: "#ec4899", // pink-500
        conversion: "#f59e0b", // amber-500
    };

    // Show loading state while data is being fetched
    if (loading) {
        return <div className="loading">Loading</div>;
    }

    return (
        <div className="App">
            {/* Header section */}
            <header className="header">
                <h1>Shopify Upsell Analytics</h1>
            </header>

            {/* Date range filter controls */}
            <div className="date-filter">
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Summary metrics display */}
            <div className="summary-section">
                <div className="metric-card">
                    <h3>Total Clicks</h3>
                    <p>{summary.totalClicks.toLocaleString()}</p>
                </div>
                <div className="metric-card">
                    <h3>Total Revenue</h3>
                    <p>${summary.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="metric-card">
                    <h3>Avg Conversion Rate</h3>
                    <p>{summary.avgConversionRate.toFixed(2)}%</p>
                </div>
            </div>

            {/* Line chart visualization */}
            <div className="chart-container">
                <h2>Performance Trends</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            stroke="#64748b"
                        />
                        {/* Left Y-axis for clicks and revenue */}
                        <YAxis yAxisId="left" stroke="#64748b" />
                        {/* Right Y-axis for conversion rate */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#64748b"
                        />
                        {/* Tooltip configuration for better data readability */}
                        <Tooltip
                            formatter={(value, name) => {
                                if (name === "conversionRate")
                                    return `${Number(value).toFixed(2)}%`;
                                if (name === "revenue")
                                    return `$${Number(value).toLocaleString()}`;
                                return Number(value).toLocaleString();
                            }}
                            labelFormatter={formatDate}
                            contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                borderRadius: "0.5rem",
                                border: "none",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                paddingTop: "1rem",
                            }}
                        />
                        {/* Individual line configurations for each metric */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="clicks"
                            stroke={chartColors.clicks}
                            strokeWidth={2}
                            dot={false}
                            name="Clicks"
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            stroke={chartColors.revenue}
                            strokeWidth={2}
                            dot={false}
                            name="Revenue ($)"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="conversionRate"
                            stroke={chartColors.conversion}
                            strokeWidth={2}
                            dot={false}
                            name="Conversion Rate (%)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default App;
