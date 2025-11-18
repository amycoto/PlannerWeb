// ReminderView.tsx
// Purpose: Displays a popup reminder for a session when it ends.

import React from "react";
import type { Session } from "../models/SessionModel";

interface ReminderViewProps {
  session: Session;
  onConfirm: () => void;
  onDismiss: () => void;
}

const ReminderView: React.FC<ReminderViewProps> = ({ session, onConfirm, onDismiss }) => {
  // Displays reminder popup with session title

  return (
    <div className="reminder-popup">
      <h3>Session Complete</h3>
      <p>{session.title} ({session.subject})</p>
      <button onClick={onConfirm}>Mark Complete</button>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  );
};

export default ReminderView;
