import { useEffect, useMemo, useState } from "react";
import NavigationView from "./views/NavigationView";
import TodayView from "./views/TodayView";
import CalendarView from "./views/CalendarView";
import AnalyticsView from "./views/AnalyticsView";
import SettingsView from "./views/SettingsView";
import ReminderView from "./views/ReminderView";

import { SessionController } from "./controllers/SessionController";
import { SettingsController } from "./controllers/SettingsController";
import { ReminderController } from "./controllers/ReminderController";

import type { Session } from "./models/SessionModel";
import type { Settings } from "./models/SettingsModel";

interface AnalyticsData {
  subject: string;
  totalMinutes: number;
}

// Sunday of current week
const getCurrentWeekStartDate = (): string => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day;
  const sunday = new Date(today);
  sunday.setDate(diff);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const date = String(sunday.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

const MOTIVATION_MESSAGES = [
  "Nice work — you’re building great habits 💪",
  "Session done! Future you says thank you ✨",
  "You showed up today. That matters a lot 📚",
  "Another block finished — keep the momentum going 🚀",
];

function App() {
  const [activeTab, setActiveTab] = useState("today");

  const [settings, setSettings] = useState<Settings>(() =>
    SettingsController.loadSettings()
  );

  const [reminderSession, setReminderSession] = useState<Session | null>(null);

  // For re-computing analytics when sessions change
  const [analyticsVersion, setAnalyticsVersion] = useState(0);

  const weekStart = getCurrentWeekStartDate();

  const analyticsData: AnalyticsData[] = useMemo(() => {
    const sessions = SessionController.loadSessionsForWeek(weekStart);
    const totals = new Map<string, number>();

    for (const s of sessions) {
      const prev = totals.get(s.subject) ?? 0;
      totals.set(s.subject, prev + s.duration);
    }

    return Array.from(totals.entries()).map(([subject, totalMinutes]) => ({
      subject,
      totalMinutes,
    }));
  }, [weekStart, analyticsVersion]);

  // Listen for session updates so analytics refreshes
  useEffect(() => {
    const handleUpdated = () => {
      setAnalyticsVersion((v) => v + 1);
    };

    window.addEventListener("session-updated", handleUpdated);
    return () => window.removeEventListener("session-updated", handleUpdated);
  }, []);

  // Hook up reminder controller
  useEffect(() => {
    ReminderController.registerHandler((session) => {
      setReminderSession(session);
    });
    ReminderController.startReminderTimer();

    return () => {
      ReminderController.stopReminderTimer();
      ReminderController.registerHandler(null);
    };
  }, []);

  const handleToggleReminders = (enabled: boolean) => {
    SettingsController.toggleReminders(enabled);
    setSettings((prev) => ({ ...prev, remindersEnabled: enabled }));
  };

  const handleToggleDarkMode = (enabled: boolean) => {
    SettingsController.toggleDarkMode(enabled);
    setSettings((prev) => ({ ...prev, darkModeEnabled: enabled }));
  };

  const handleToggleMotivational = (enabled: boolean) => {
    SettingsController.toggleMotivationalMessages(enabled);
    setSettings((prev) => ({ ...prev, motivationalMessagesEnabled: enabled }));
  };

  const handleToggleQuickAdd = (enabled: boolean) => {
    SettingsController.toggleQuickAdd(enabled);
    setSettings((prev) => ({ ...prev, quickAddEnabled: enabled }));
  };

  const handleReminderConfirm = () => {
    if (reminderSession) {
      SessionController.markSessionComplete(reminderSession.id, true);
      window.dispatchEvent(new Event("session-updated"));

      if (settings.motivationalMessagesEnabled) {
        const msg =
          MOTIVATION_MESSAGES[
            Math.floor(Math.random() * MOTIVATION_MESSAGES.length)
          ];
        window.setTimeout(() => {
          alert(msg);
        }, 100);
      }
    }
    setReminderSession(null);
  };

  const handleReminderDismiss = () => {
    setReminderSession(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "calendar":
        return <CalendarView />;
      case "today":
        return (
          <TodayView
            quickAddEnabled={settings.quickAddEnabled}
            motivationalMessagesEnabled={settings.motivationalMessagesEnabled}
          />
        );
      case "analytics":
        return <AnalyticsView data={analyticsData} />;
      case "settings":
        return (
          <SettingsView
            remindersEnabled={settings.remindersEnabled}
            darkModeEnabled={settings.darkModeEnabled}
            motivationalMessagesEnabled={settings.motivationalMessagesEnabled}
            quickAddEnabled={settings.quickAddEnabled}
            onToggleReminders={handleToggleReminders}
            onToggleDarkMode={handleToggleDarkMode}
            onToggleMotivationalMessages={handleToggleMotivational}
            onToggleQuickAdd={handleToggleQuickAdd}
          />
        );
      default:
        return <TodayView />;
    }
  };

  const rootBg =
    settings.darkModeEnabled === true
      ? "bg-slate-900 text-slate-100"
      : "bg-gray-50 text-gray-900";

  const cardBg = settings.darkModeEnabled ? "bg-slate-800" : "bg-white";
  const headerBg = settings.darkModeEnabled ? "bg-slate-900" : "bg-blue-600";

  return (
    <div className={`min-h-screen font-sans ${rootBg}`}>
      {/* Header */}
      <header className={`${headerBg} text-white p-4 shadow-md`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">My Study Tracker</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-6 p-4">
        <div className="mb-6">
          <NavigationView activeTab={activeTab} onChangeTab={setActiveTab} />
        </div>

        <div className={`${cardBg} rounded-lg shadow min-h-[400px]`}>
          {renderContent()}
        </div>
      </main>

      {settings.remindersEnabled && reminderSession && (
        <ReminderView
          session={reminderSession}
          onConfirm={handleReminderConfirm}
          onDismiss={handleReminderDismiss}
        />
      )}
    </div>
  );
}

export default App;
