// src/models/SessionModel.ts
// Purpose: Handles CRUD operations for study sessions, stored in localStorage.
import { StorageService } from "./StorageService";

const STORAGE_KEY = "studyTrackerData";

export interface SessionData {
  title: string;
  subject: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  duration: number;   // minutes
}

export interface Session extends SessionData {
  id: string;
  completed: boolean;
  createdAt: string; // ISO timestamp
}

// JSON Storage Schema
interface StorageSchema {
  sessions: Session[];
  settings: {
    remindersEnabled: boolean;
  };
}

// Default state for first-time users
const DEFAULT_DATA: StorageSchema = {
  sessions: [],
  settings: {
    remindersEnabled: true
  }
};

// Logic Helpers

const timeToMinutes = (timeStr: string): number => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const validateSessionRules = (newSession: SessionData, existingSessions: Session[], excludeId?: string) => {
  // 1. Field Format Validation
  if (!newSession.title) throw new Error("Title is required");
  if (!newSession.subject) throw new Error("Subject is required");
  if (newSession.duration <= 0) throw new Error("Duration must be > 0");
  
  // 2. Cross Midnight Check
  const startMin = timeToMinutes(newSession.startTime);
  const endMin = startMin + newSession.duration;
  if (endMin > 1440) throw new Error("Sessions cannot cross midnight");

  // 3. Overlap Prevention
  const sessionsOnDate = existingSessions.filter(s => s.date === newSession.date);
  for (const s of sessionsOnDate) {
    // Skip the session being edited 
    if (excludeId && s.id === excludeId) continue;
    const sStart = timeToMinutes(s.startTime);
    const sEnd = sStart + s.duration;
    // Overlap logic: (StartA < EndB) and (EndA > StartB)
    if (startMin < sEnd && endMin > sStart) {
      throw new Error(`Overlaps with session: ${s.title}`);
    }
  }
};

// Helper: Get the full JSON Object from LocalStorage
const getStorage = (): StorageSchema => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw){
    // Initialize if empty
    setStorage(DEFAULT_DATA);
    return DEFAULT_DATA;
  }
  try {
    return JSON.parse(raw)
  } catch(error){
    console.error("Corrupt storage data, resetting.", error);
    return DEFAULT_DATA;
  }
};

// Helper: Write the full JSON Object to LocalStorage
const setStorage = (data: StorageSchema): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error){
    console.error("Failed to save to localStorage", error);
  }
};


export const SessionModel = {
  createSession(sessionData: SessionData): Session {
    // Validate basic check 
    const data = StorageService.readData();
    validateSessionRules(sessionData, data.sessions);

    // Create new session object
    const newSession: Session = {
      ...sessionData,
      id: crypto.randomUUID(), // Generates a unique ID
      completed: false,
      createdAt: new Date().toISOString()
    };

    // Add the session and save in local storage
    data.sessions.push(newSession);
    StorageService.writeData(data);
    return newSession;
  },

  updateSession(id: string, updatedData: Partial<Session>): void {
    // Preconditions: id exists in current session list
    // Postconditions: session updated and persisted
    const data = getStorage();
    const index = data.sessions.findIndex(s => s.id === id);

    if (index === -1) {
      throw new Error(`Session with id ${id} not found.`);
    }
    const currentSession = data.sessions[index];

    // Create the "Candidate" session (Merge old data with new data)
    // We need the full object to run validation (e.g., if only duration changed, we need startTime)
    const candidateSession: Session = {
      ...currentSession,
      ...updatedData
    };

    // Validate the Candidate (passing the ID to exclude self-collision)
    validateSessionRules(candidateSession, data.sessions, id);

    // Save
    data.sessions[index] = candidateSession;
    setStorage(data);
  },

  deleteSession(id: string): void {
    // Preconditions: id exists
    // Postconditions: session removed from storage
    const data = getStorage();
    const initialLength = data.sessions.length;

    // Filter out the session with the given ID
    data.sessions = data.sessions.filter(s => s.id !== id);

    if (data.sessions.length === initialLength) {
      console.warn(`Attempted to delete non-existent session: ${id}`);
      return;
    }

    setStorage(data);
  },

  getSessionsByDate(date: string): Session[] {
    // Returns: array of sessions for the given date
    const data = getStorage();
    return data.sessions.filter(s => s.date === date);
  },

  getSessionsByWeek(startDate: string, endDate: string): Session[] {
    // Returns: array of sessions between startDate and endDate inclusive
    const data = getStorage();
    return data.sessions.filter(s => s.date >= startDate && s.date <= endDate);

  },

  getAllSessions(): Session[] {
    // Returns: all sessions from storage
    return getStorage().sessions;
  },
};
