import React, { useState, useEffect } from "react";
import type { Session, SessionData } from "../models/SessionModel";
import { SessionController } from "../controllers/SessionController";
import SessionForm from "./SessionForm";

const TodayView: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const loadData = () => {
    setSessions(SessionController.loadSessionsForToday());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateForm = () => {
    setEditingSession(null);
    setIsFormOpen(true);
  };

  const openEditForm = (session: Session) => {
    setEditingSession(session);
    setIsFormOpen(true);
  };

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

  const handleMarkComplete = (id: string, currentStatus: boolean) => {
    SessionController.markSessionComplete(id, !currentStatus);
    loadData(); 
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      SessionController.handleDeleteSession(id);
      loadData();
    }
  };

  // Shared styles for all action buttons to ensure uniformity
  const baseButtonClass = "text-sm px-3 py-1 rounded border font-medium transition-colors cursor-pointer shadow-sm";

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Today's Schedule</h2>
        <button 
          onClick={openCreateForm} 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition shadow cursor-pointer font-medium"
        >
          + Add Session
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-gray-500 text-center py-10 bg-gray-50 rounded border border-dashed">
          No sessions scheduled for today.
        </div>
      ) : (
        <ul className="space-y-3">
          {sessions.map((session) => (
            <li 
              key={session.id} 
              className={`p-4 border rounded-lg shadow-sm flex justify-between items-center transition-all ${
                session.completed ? "bg-gray-50 opacity-75" : "bg-white"
              }`}
            >
              <div 
                onClick={() => openEditForm(session)}
                className="cursor-pointer flex-grow"
              >
                <div className="flex items-center gap-2">
                  {session.completed && <span className="text-green-600 font-bold">✓</span>}
                  <span className={`font-semibold text-lg ${session.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {session.title}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">{session.startTime}</span> 
                  <span className="mx-2">•</span> 
                  {session.subject} ({session.duration} min)
                </div>
              </div>

              <div className="flex gap-2 items-center">
                
                {/*Edit Button (Neutral Gray) */}
                <button 
                  onClick={() => openEditForm(session)}
                  className={`${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400`}
                >
                  Edit
                </button>

                {/* Complete Button (Blue for active, Gray for undo) */}
                <button 
                  onClick={() => handleMarkComplete(session.id, session.completed)}
                  className={`${baseButtonClass} ${
                    session.completed 
                      ? "border-gray-300 text-gray-500 hover:bg-gray-100" 
                      : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  {session.completed ? "Undo" : "Complete"}
                </button>
                
                {/* Delete Button (Red) */}
                <button 
                  onClick={(e) => {
                     e.stopPropagation(); 
                     handleDelete(session.id);
                  }}
                  className={`${baseButtonClass} border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

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

export default TodayView;