import React, { useState, useEffect } from "react";
import type { SessionData, Session } from "../models/SessionModel";

interface SessionFormProps {
  // For Edit mode, we pass existing data. For Create, this is null.
  initialData?: Session | null;
  // The parent (TodayView) passes the specific controller function to use
  onSubmit: (data: SessionData) => void;
  onCancel: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ initialData, onSubmit, onCancel }) => {
  // Local state for form fields
  const [formData, setFormData] = useState<SessionData>({
    title: "",
    subject: "",
    date: new Date().toISOString().split("T")[0], // Default to today
    startTime: "12:00",
    duration: 60,
  });

  // Local state for inline errors
  const [error, setError] = useState<string | null>(null);

  // If editing, populate fields
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        subject: initialData.subject,
        date: initialData.date,
        startTime: initialData.startTime,
        duration: initialData.duration,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // 1. Attempt to save via the Parent's handler (which calls Controller)
      onSubmit(formData);
    } catch (err: unknown) {
      // 2. CATCH THE MODEL ERRORS HERE
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    // UPDATE 1: Overlay - Added dark background with opacity, blur, and z-index
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      
      {/* UPDATE 2: Modal Card - Added explicit background colors for Light/Dark mode */}
      <div className="p-6 rounded-lg border shadow-xl w-full max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
        
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Session" : "New Session"}
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 text-sm border border-red-300 dark:border-red-800 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              // UPDATE 3: Inputs - Added dark mode background and border colors
              className="w-full border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Chapter 4 Review"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Math"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-2 rounded cursor-pointer bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border p-2 rounded cursor-pointer bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              // UPDATE 4: Cancel Button - Added dark mode styling
              className="px-4 py-2 rounded cursor-pointer transition-colors bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-700 transition-colors shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;