// SessionController.ts
// Purpose: Handles session management logic between the view and SessionModel.

import { SessionModel, type Session, type SessionData } from "../models/SessionModel";

// Helper: Get local date string in YYYY-MM-DD format
const getLocalTodayDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  // Month is 0-indexed, padStart ensures "05" instead of "5"
  const month = String(now.getMonth() + 1).padStart(2, "0"); 
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const SessionController = {
  handleCreateSession(formData: SessionData): Session {
    // Preconditions: formData contains valid session fields
    // Actions: Calls SessionModel.createSession and updates the UI
    // Postconditions: New session is created, stored, and reflected in the view
    return SessionModel.createSession(formData);
  },

  handleEditSession(id: string, updatedData: Partial<Session>): void {
    // Preconditions: id exists in storage
    // Actions: Updates session details using SessionModel.updateSession
    // Postconditions: Session changes persisted and UI refreshed
    SessionModel.updateSession(id, updatedData);
  },

  handleDeleteSession(id: string): void {
    // Preconditions: id exists in session list
    // Actions: Removes session and updates UI
    // Postconditions: Session deleted and removed from localStorage
    SessionModel.deleteSession(id);
  },

  markSessionComplete(id: string, completed: boolean): void {
    // Preconditions: id exists in current sessions
    // Actions: Updates completed flag for the session
    // Postconditions: UI reflects updated completion state
    SessionModel.updateSession(id, { completed });
  },

  loadSessionsForToday(): Session[] {
    // Returns: Array of sessions matching today's date
    // Used by TodayView component to render daily sessions
    const today = getLocalTodayDate();
    const sessions = SessionModel.getSessionsByDate(today);
    return sessions.sort((a, b) => a.startTime.localeCompare(b.startTime));
  },

  loadSessionsForWeek(startDate: string): Session[] {
    // Returns: Array of sessions within the week starting from startDate
    // Used by CalendarView and AnalyticsView
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const endDate = end.toISOString().split("T")[0];
    const sessions = SessionModel.getSessionsByWeek(startDate, endDate);
    return sessions.sort((a,b) => {
      if(a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });
  },
};
