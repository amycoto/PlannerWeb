// ReminderView.tsx
// Purpose: Displays a popup reminder for a session when it ends.

import React from "react";
import type { Session } from "../models/SessionModel";

interface ReminderViewProps {
  session: Session;
  onConfirm: () => void;
  onDismiss: () => void;
}

const ReminderView: React.FC<ReminderViewProps> = ({
  session,
  onConfirm,
  onDismiss,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Session Complete</h3>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">{session.title}</span>{" "}
          {session.subject && (
            <span className="text-gray-500">({session.subject})</span>
          )}
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onDismiss}
            className="px-3 py-1 rounded border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
          >
            Dismiss
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderView;
