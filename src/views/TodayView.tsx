// TodayView.tsx
// Purpose: Displays today's study sessions sorted by start time.

import React from "react";
import type { Session } from "../models/SessionModel";

interface TodayViewProps {
  sessions: Session[];
  onMarkComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodayView: React.FC<TodayViewProps> = ({ sessions, onMarkComplete, onDelete }) => {
  // Displays today's sessions sorted by startTime
  // Provides buttons to mark complete and delete

  return (
    <div>
      <h2>Today's Schedule</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <span>{session.startTime} - {session.title}</span>
            <button onClick={() => onMarkComplete(session.id)}>Complete</button>
            <button onClick={() => onDelete(session.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayView;
