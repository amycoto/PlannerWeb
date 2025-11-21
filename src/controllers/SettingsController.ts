// SettingsController.ts
// Purpose: Manages user settings and updates preferences in the UI.

import { SettingsModel, type Settings } from "../models/SettingsModel";

export const SettingsController = {
  loadSettings(): Settings {
    return SettingsModel.getSettings();
  },

  toggleReminders(enabled: boolean): void {
    const current = SettingsModel.getSettings();
    SettingsModel.updateSettings({ ...current, remindersEnabled: enabled });
  },

  toggleDarkMode(enabled: boolean): void {
    const current = SettingsModel.getSettings();
    SettingsModel.updateSettings({ ...current, darkModeEnabled: enabled });
  },

  toggleMotivationalMessages(enabled: boolean): void {
    const current = SettingsModel.getSettings();
    SettingsModel.updateSettings({
      ...current,
      motivationalMessagesEnabled: enabled,
    });
  },

  toggleQuickAdd(enabled: boolean): void {
    const current = SettingsModel.getSettings();
    SettingsModel.updateSettings({ ...current, quickAddEnabled: enabled });
  },
};
