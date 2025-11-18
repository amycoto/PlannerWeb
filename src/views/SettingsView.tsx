// SettingsView.tsx
// Purpose: Displays reminder toggle and allows users to update settings.

import React from "react";

interface SettingsViewProps {
  remindersEnabled: boolean;
  onToggleReminders: (enabled: boolean) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ remindersEnabled, onToggleReminders }) => {
  // Displays reminders toggle and saves preference changes

  return (
    <div>
      <h2>Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={remindersEnabled}
          onChange={(e) => onToggleReminders(e.target.checked)}
        />
        Enable Reminders
      </label>
    </div>
  );
};

export default SettingsView;
