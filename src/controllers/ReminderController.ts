// ReminderController.ts
// Purpose: Manages study session reminders and notification popups.

import { SessionModel, type Session } from "../models/SessionModel";
import { SettingsModel } from "../models/SettingsModel";

type ReminderHandler = (session: Session) => void;

let reminderTimerId: number | null = null;
let handler: ReminderHandler | null = null;

// Helper: today's date as YYYY-MM-DD (local)
const getLocalTodayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper: "HH:mm" → minutes since midnight
const timeToMinutes = (timeStr: string): number => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

export const ReminderController = {
  // App will register a callback so the controller
  // can tell React when to show a popup.
  registerHandler(callback: ReminderHandler | null): void {
    handler = callback;
  },

  startReminderTimer(): void {
    // Preconditions: App tab is active
    // Actions: Starts interval that checks session end times every minute
    // Postconditions: checkForSessionEnd() executes periodically
    if (reminderTimerId !== null) {
      window.clearInterval(reminderTimerId);
    }

    // Run once now, then every minute
    this.checkForSessionEnd();
    reminderTimerId = window.setInterval(() => {
      this.checkForSessionEnd();
    }, 60_000);
  },

  stopReminderTimer(): void {
    if (reminderTimerId !== null) {
      window.clearInterval(reminderTimerId);
      reminderTimerId = null;
    }
  },

  checkForSessionEnd(): void {
    // Preconditions: Timer is active and sessions exist
    // Actions: Compares current time to session end times
    // Postconditions: If match found, triggers reminder popup
    const settings = SettingsModel.getSettings();
    if (!settings.remindersEnabled) return;
    if (!handler) return;

    const now = new Date();
    const today = getLocalTodayDate();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const todaysSessions = SessionModel.getSessionsByDate(today);

    for (const session of todaysSessions) {
      if (session.completed) continue;

      const startMinutes = timeToMinutes(session.startTime);
      const endMinutes = startMinutes + session.duration;

      if (currentMinutes === endMinutes) {
        this.triggerReminderPopup(session);
      }
    }
  },

  triggerReminderPopup(session: Session): void {
    // Preconditions: Session end time matches current time and reminders are enabled
    // Actions: Notifies React so the view can show a popup
    // Postconditions: User can confirm or dismiss popup in the UI
    if (handler) {
      handler(session);
    }
  },
};
