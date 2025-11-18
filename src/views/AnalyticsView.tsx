// AnalyticsView.tsx
// Purpose: Displays a bar chart summarizing total minutes per subject for the current week.

import React from "react";

interface AnalyticsData {
  subject: string;
  totalMinutes: number;
}

interface AnalyticsViewProps {
  data: AnalyticsData[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ data }) => {
  // Displays bar chart of total minutes per subject for current week

  return (
    <div>
      <h2>Weekly Analytics</h2>
      {/* Placeholder for bar chart */}
      <ul>
        {data.map((item) => (
          <li key={item.subject}>
            {item.subject}: {item.totalMinutes} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsView;
