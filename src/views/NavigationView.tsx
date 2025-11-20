// src/views/NavigationView.tsx
import React from "react";

interface NavigationViewProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const NavigationView: React.FC<NavigationViewProps> = ({ activeTab, onChangeTab }) => {
  const getTabClass = (tabName: string) => {
    // Added 'hover:text-blue-600' for better interaction feedback
    const baseClass = "px-4 py-2 font-medium rounded-md transition-all duration-200 border"; 
    
    if (activeTab === tabName) {
      // Active: Blue background, Blue text, Blue Border
      return `${baseClass} bg-blue-50 text-blue-700 border-blue-200 shadow-sm`;
    }
    // Inactive: White background, Gray text, Transparent border (prevents layout jump)
    return `${baseClass} bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900`;
  };

  return (
    <nav className="flex gap-2 border-b border-gray-200 pb-2">
      <button 
        onClick={() => onChangeTab("calendar")} 
        className={getTabClass("calendar")}
      >
        Calendar
      </button>
      <button 
        onClick={() => onChangeTab("today")} 
        className={getTabClass("today")}
      >
        Today
      </button>
      <button 
        onClick={() => onChangeTab("analytics")} 
        className={getTabClass("analytics")}
      >
        Analytics
      </button>
      <button 
        onClick={() => onChangeTab("settings")} 
        className={getTabClass("settings")}
      >
        Settings
      </button>
    </nav>
  );
};

export default NavigationView;