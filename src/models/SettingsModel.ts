// SettingsModel.ts
// Purpose: Manages user preferences such as reminder settings and UI options.

import { StorageService } from "./StorageService";

export interface Settings {
  remindersEnabled: boolean;
  darkModeEnabled: boolean;
  motivationalMessagesEnabled: boolean;
  quickAddEnabled: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  remindersEnabled: true,
  darkModeEnabled: false,
  motivationalMessagesEnabled: true,
  quickAddEnabled: true,
};

export const SettingsModel = {
  getSettings(): Settings {
    const data = StorageService.readData();

    // If settings don't exist yet, start from defaults
    const raw = (data as any).settings ?? {};

    return {
      ...DEFAULT_SETTINGS,
      ...raw,
    };
  },

  updateSettings(updatedSettings: Settings): void {
    const current = StorageService.readData();
    StorageService.writeData({
      ...current,
      settings: updatedSettings,
    });
  },
};
