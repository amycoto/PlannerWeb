import React, { useState, useEffect } from "react";
import type { Session, SessionData } from "../models/SessionModel";
import { SessionController } from "../controllers/SessionController";
import SessionForm from "./SessionForm";

const CalendarView: React.FC = () => {
  // State: Track the Sunday of the current view
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = today.getDate() - day; // Calculate back to Sunday
    return new Date(today.setDate(diff));
  });

  const [sessions, setSessions] = useState<Session[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  // Date Formatting Helper (YYYY-MM-DD)
  const formatDateStr = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Load Data for the specific week
  const loadData = () => {
    const dateStr = formatDateStr(currentWeekStart);
    // The Controller handles fetching Sunday -> Saturday based on this start date
    const weekSessions = SessionController.loadSessionsForWeek(dateStr);
    setSessions(weekSessions);
  };

  // Reload when week changes
  useEffect(() => {
    loadData();
  }, [currentWeekStart]);

  // 4. Navigation Handlers
  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  // 5. Form Handlers (Reusing logic from TodayView)
  const handleFormSubmit = (data: SessionData) => {
    if (editingSession) {
      SessionController.handleEditSession(editingSession.id, data);
    } else {
      SessionController.handleCreateSession(data);
    }
    setIsFormOpen(false);
    setEditingSession(null);
    loadData();
  };

  const openEdit = (session: Session) => {
    setEditingSession(session);
    setIsFormOpen(true);
  };

  // 6. Generate the 7 days for the columns
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + index);
    return {
      dateObj: d,
      dateStr: formatDateStr(d),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }), // "Sun", "Mon"
      dayNumber: d.getDate()
    };
  });

  return (
    <div className="p-4">
      {/* Header: Title & Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Week of {currentWeekStart.toLocaleDateString()}
        </h2>
        <div className="flex gap-2">
          <button onClick={handlePrevWeek} className="px-3 py-1 border rounded hover:bg-gray-100">
            &larr; Prev
          </button>
          <button onClick={handleNextWeek} className="px-3 py-1 border rounded hover:bg-gray-100">
            Next &rarr;
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 border-t border-gray-200 pt-4 min-w-[800px] overflow-x-auto">
        {weekDays.map((day) => {
            // Filter sessions for this specific column
            const daySessions = sessions.filter(s => s.date === day.dateStr);
            const isToday = day.dateStr === formatDateStr(new Date());

            return (
              <div key={day.dateStr} className={`min-h-[400px] flex flex-col ${isToday ? "bg-blue-50 rounded" : ""}`}>
                {/* Column Header */}
                <div className="text-center mb-2 border-b pb-1">
                  <span className="block font-bold text-gray-600">{day.dayName}</span>
                  <span className={`block text-xl ${isToday ? "text-blue-600 font-bold" : ""}`}>
                    {day.dayNumber}
                  </span>
                </div>

                {/* Sessions List for this Day */}
                <div className="flex-1 space-y-2 p-1">
                  {daySessions.map(session => (
                    <div 
                      key={session.id}
                      onClick={() => openEdit(session)}
                      className={`p-2 text-xs rounded border cursor-pointer hover:shadow-md transition-shadow ${
                        session.completed 
                          ? "bg-gray-100 text-gray-500 border-gray-200" 
                          : "bg-white border-blue-200 text-gray-800"
                      }`}
                    >
                      <div className="font-bold truncate">
                        {session.completed && "✓ "}{session.startTime}
                      </div>
                      <div className={`truncate ${session.completed ? "line-through" : ""}`}>
                        {session.title}
                      </div>
                      <div className="text-gray-500 truncate">{session.subject}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
        })}
      </div>

      {/* Reuse the Modal Form */}
      {isFormOpen && (
        <SessionForm 
          initialData={editingSession} 
          onSubmit={handleFormSubmit}
          onCancel={() => { setIsFormOpen(false); setEditingSession(null); }}
        />
      )}
    </div>
  );
};

export default CalendarView;