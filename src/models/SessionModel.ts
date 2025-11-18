// SessionModel.ts
// Purpose: Handles CRUD operations for study sessions, stored in localStorage.

export interface SessionData {
  title: string;
  subject: string;
  date: string;       // ISO or YYYY-MM-DD format
  startTime: string;  // HH:mm
  duration: number;   // in minutes
}

export interface Session extends SessionData {
  id: string;
  completed: boolean;
}

export const SessionModel = {
  createSession(sessionData: SessionData): Session {
    // Preconditions: sessionData includes valid title, subject, date, startTime, duration
    // Postconditions: session added to localStorage and returned with unique id
    throw new Error("Not implemented");
  },

  updateSession(id: string, updatedData: Partial<Session>): void {
    // Preconditions: id exists in current session list
    // Postconditions: session updated and persisted
    throw new Error("Not implemented");
  },

  deleteSession(id: string): void {
    // Preconditions: id exists
    // Postconditions: session removed from storage
    throw new Error("Not implemented");
  },

  getSessionsByDate(date: string): Session[] {
    // Returns: array of sessions for the given date
    throw new Error("Not implemented");
  },

  getSessionsByWeek(startDate: string, endDate: string): Session[] {
    // Returns: array of sessions between startDate and endDate inclusive
    throw new Error("Not implemented");
  },

  getAllSessions(): Session[] {
    // Returns: all sessions from storage
    throw new Error("Not implemented");
  },
};
