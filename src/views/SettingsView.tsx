// SettingsView.tsx
// Purpose: Displays settings toggles and allows users to update preferences.

import React from "react";

interface SettingsViewProps {
  remindersEnabled: boolean;
  darkModeEnabled: boolean;
  motivationalMessagesEnabled: boolean;
  quickAddEnabled: boolean;
  onToggleReminders: (enabled: boolean) => void;
  onToggleDarkMode: (enabled: boolean) => void;
  onToggleMotivationalMessages: (enabled: boolean) => void;
  onToggleQuickAdd: (enabled: boolean) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({
  remindersEnabled,
  darkModeEnabled,
  motivationalMessagesEnabled,
  quickAddEnabled,
  onToggleReminders,
  onToggleDarkMode,
  onToggleMotivationalMessages,
  onToggleQuickAdd,
}) => {
  const renderToggle = (
    label: string,
    description: string,
    enabled: boolean,
    onToggle: () => void
  ) => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 ${
            enabled
              ? "bg-blue-600 border-blue-600"
              : "bg-gray-200 border-gray-300"
          }`}
          aria-pressed={enabled}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
              enabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Customize how your study tracker behaves on this device.
        </p>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        {renderToggle(
          "Session Reminders",
          "Show a popup when a study session ends (while this tab is open).",
          remindersEnabled,
          () => onToggleReminders(!remindersEnabled)
        )}

        {renderToggle(
          "Dark Mode",
          "Use a darker theme that's easier on the eyes at night.",
          darkModeEnabled,
          () => onToggleDarkMode(!darkModeEnabled)
        )}

        {renderToggle(
          "Motivational Messages",
          "Show a quick motivational message when you mark sessions complete.",
          motivationalMessagesEnabled,
          () => onToggleMotivationalMessages(!motivationalMessagesEnabled)
        )}

        {renderToggle(
          "Quick Add",
          "Enable a one-click button to add a default study block for today.",
          quickAddEnabled,
          () => onToggleQuickAdd(!quickAddEnabled)
        )}
      </div>

      <div className="text-xs text-gray-500 pt-2">
        <p>• All settings are stored locally in this browser only.</p>
        <p>• Clearing browser data will reset your preferences.</p>
      </div>
    </div>
  );
};

export default SettingsView;
