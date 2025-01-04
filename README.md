# Shopify Upsell Analytics Dashboard

A modern React-based analytics dashboard for visualizing Shopify upsell performance metrics. The dashboard provides real-time insights into clicks, revenue, and conversion rates through an interactive interface.

## Features

-   **Interactive Date Range Filter**: Easily analyze data for specific time periods
-   **Key Performance Metrics**:
    -   Total Clicks
    -   Total Revenue
    -   Average Conversion Rate
-   **Visual Data Representation**:
    -   Multi-axis line chart showing trends
    -   Color-coded metrics for easy differentiation
    -   Interactive tooltips with formatted values

## Technology Stack

-   React
-   TypeScript
-   Recharts for data visualization
-   Modern CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Format

The application expects data in the following JSON format:

```json
{
  "date": "YYYY-MM-DD",
  "clicks": number,
  "revenue": number,
  "conversionRate": number
}
```

## Customization

-   Color scheme can be modified in the `chartColors` object
-   Date format can be adjusted in the `formatDate` function
-   Chart dimensions and styling can be modified through the Recharts components

## Contributing

Feel free to submit issues and pull requests for additional features or improvements.

## License

MIT License
