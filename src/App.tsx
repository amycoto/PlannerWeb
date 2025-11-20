import { useState } from 'react';
import NavigationView from './views/NavigationView';
import TodayView from './views/TodayView';
import CalendarView from './views/CalendarView';

// Placeholder components for tabs we haven't built yet
// This prevents the app from crashing when you click other tabs
const AnalyticsPlaceholder = () => <div className="p-4 text-center text-gray-500">Analytics View (Coming Soon)</div>;
const SettingsPlaceholder = () => <div className="p-4 text-center text-gray-500">Settings View (Coming Soon)</div>;

function App() {
  // State to track which view is currently visible
  // Defaults to "today" as per requirements
  const [activeTab, setActiveTab] = useState("today");

  // Helper function to render the correct component based on state
  const renderContent = () => {
    switch (activeTab) {
      case "calendar":
        return <CalendarView />;
      case "today":
        return <TodayView />;
      case "analytics":
        return <AnalyticsPlaceholder />;
      case "settings":
        return <SettingsPlaceholder />;
      default:
        return <TodayView />;
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header / Title Area */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">My Study Tracker</h1>
        </div>
      </header>

      {/* Main Layout Container */}
      <main className="max-w-4xl mx-auto mt-6 p-4">
        
        {/* 1. Navigation Bar */}
        <div className="mb-6">
          <NavigationView 
            activeTab={activeTab} 
            onChangeTab={setActiveTab} 
          />
        </div>

        {/* 2. The Active View */}
        <div className="bg-white rounded-lg shadow min-h-[400px]">
          {renderContent()}
        </div>

      </main>
    </div>
  );
}

export default App;

/* SessionModel Test Code
  try {
    console.log("Initial Sessions:", SessionModel.getAllSessions());

    const newSession = SessionModel.createSession({
      title: "Test Session",
      subject: "CS123",
      date:"2025-11-20",
      startTime:"10:00",
      duration:60
    });
    console.log("Created Session:", newSession);

    console.log("Sessions after creation:", SessionModel.getAllSessions());

    SessionModel.updateSession(newSession.id, { completed: true });
    console.log("Updaed Completed Session:", SessionModel.getAllSessions());

  } catch(e){
    console.error(e);
  }

*/
