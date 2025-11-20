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
      // This satisfies the requirement: "Show an inline error that names the missing field"
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Session" : "New Session"}
        </h2>

        {/* Requirement: Inline Error Display */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="e.g. Chapter 4 Review"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Subject</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="e.g. Math"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Date (YYYY-MM-DD)</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-2 cursor-pointer rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Start Time (24h)</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border p-2 cursor-pointer rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 cursor-pointer rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-700"
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