// AnalyticsView.tsx
// Purpose: Displays a cute bar chart summarizing total minutes per subject for the current week.

import React from "react";

interface AnalyticsData {
  subject: string;
  totalMinutes: number;
}

interface AnalyticsViewProps {
  data: AnalyticsData[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-1">Weekly Analytics</h2>
        <p className="text-gray-500 text-sm">
          No study sessions found for this week yet. Add some sessions to see
          your study streak 💪
        </p>
      </div>
    );
  }

  const maxMinutes = Math.max(...data.map((d) => d.totalMinutes)) || 1;
  const totalMinutesWeek = data.reduce(
    (sum, d) => sum + d.totalMinutes,
    0
  );
  const topItem = data.reduce((best, current) =>
    current.totalMinutes > best.totalMinutes ? current : best
  );

  return (
    <div className="p-6 space-y-4">
      {/* Header + summary */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Weekly Analytics</h2>
          <p className="text-sm text-gray-600">
            Total minutes studied per subject this week 📚
          </p>
        </div>

        <div className="text-right text-sm">
          <div className="font-semibold text-gray-800">
            Total: {totalMinutesWeek} min
          </div>
          <div className="text-xs text-gray-600 mt-1">
            ⭐ Top subject:{" "}
            <span className="font-medium">
              {topItem.subject} ({topItem.totalMinutes} min)
            </span>
          </div>
        </div>
      </div>

      {/* Bar chart card */}
      <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 shadow-sm">
        <div className="space-y-4">
          {data.map((item) => {
            const widthPercent = Math.max(
              8,
              (item.totalMinutes / maxMinutes) * 100
            );
            const isTop = item.subject === topItem.subject;

            return (
              <div
                key={item.subject}
                className={`space-y-1 rounded-xl p-2 transition-transform duration-150 hover:scale-[1.01] ${
                  isTop ? "bg-white/60" : ""
                }`}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-blue-700 border border-blue-100 shadow-sm">
                      {isTop && <span className="mr-1">⭐</span>}
                      {item.subject}
                    </span>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {item.totalMinutes} min
                  </span>
                </div>

                <div className="w-full bg-white/70 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ease-out ${
                      isTop
                        ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500"
                        : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    }`}
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
