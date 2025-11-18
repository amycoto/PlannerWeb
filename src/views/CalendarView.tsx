// CalendarView.tsx
// Purpose: Displays sessions for the selected week and allows navigation between weeks.

import React from "react";
import type { Session } from "../models/SessionModel";

interface CalendarViewProps {
  sessions: Session[];
  onNextWeek: () => void;
  onPrevWeek: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ sessions, onNextWeek, onPrevWeek }) => {
  // Displays sessions for the selected week
  // Includes Next and Prev buttons to navigate weeks

  return (
    <div>
      <h2>Weekly Calendar</h2>
      <button onClick={onPrevWeek}>Previous Week</button>
      <button onClick={onNextWeek}>Next Week</button>

      {/* Placeholder for session display */}
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.date} - {session.title} ({session.subject})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
