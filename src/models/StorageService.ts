// StorageService.ts
// Purpose: Handles reading and writing structured data to localStorage.
import type { Session } from "./SessionModel";
import type { Settings } from "./SettingsModel";

const STORAGE_KEY = "studyTrackerData";
export interface StoredData {
  sessions: Session[];
  settings: Settings;
}

const DEFAULT_DATA: StoredData = {
  sessions: [],
  settings: {
    remindersEnabled: true,
    darkModeEnabled: false,
    motivationalMessagesEnabled: false,
    quickAddEnabled: true,
  },
};

export const StorageService = {
readData(): StoredData {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      this.writeData(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error("Data corrupt, resetting", error);
      return DEFAULT_DATA;
    }
  },

  writeData(data: StoredData): void {
    // Preconditions: data matches defined schema
    // Postconditions: data serialized to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  clearData(): void {
    // Postconditions: removes studyTrackerData key from localStorage
    localStorage.removeItem(STORAGE_KEY);
  },
};
