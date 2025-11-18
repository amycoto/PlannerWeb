// NavigationView.tsx
// Purpose: Renders navigation bar and handles tab switching without page reload.

import React from "react";

interface NavigationViewProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const NavigationView: React.FC<NavigationViewProps> = ({ activeTab, onChangeTab }) => {
  // Renders navigation bar with four tabs
  // Handles tab change without page reload

  return (
    <nav>
      <button onClick={() => onChangeTab("calendar")} disabled={activeTab === "calendar"}>
        Calendar
      </button>
      <button onClick={() => onChangeTab("today")} disabled={activeTab === "today"}>
        Today
      </button>
      <button onClick={() => onChangeTab("analytics")} disabled={activeTab === "analytics"}>
        Analytics
      </button>
      <button onClick={() => onChangeTab("settings")} disabled={activeTab === "settings"}>
        Settings
      </button>
    </nav>
  );
};

export default NavigationView;
