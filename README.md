# Student Study Tracker (MVP)

The Student Study Tracker is a lightweight, single-page web application designed to help undergraduate students plan, track, and analyze their study sessions. This project is an academic MVP built with **React**, **TypeScript**, and **Vite**.

## Project Overview

College students often struggle to manage study time effectively using tools that are either too complex or too generic. This application provides a focused environment to schedule study blocks and track completion, aiming to reduce procrastination and establish consistent study habits.

The application follows a **Client-Side MVC (Model-View-Controller)** architecture and runs entirely in the browser. It does not require user accounts or a remote server; all data is persisted locally on the user's device using `localStorage`.

## Key Features

### Session Management

* **CRUD Operations:** Users can create, edit, and delete study sessions containing a Title, Subject, Date, Start Time, and Duration.
* **Views:**
    * **Today's Schedule:** A list view of the current day's sessions, sorted by time.
    * **Weekly Calendar:** A 7-day column view (Sunday-Saturday) for broader planning.

### Business Logic & Validation

* **Overlap Prevention:** The system automatically validates inputs to prevent scheduling conflicting sessions.
* **Data Integrity:** Ensures valid dates and prevents sessions that cross midnight (MVP constraint).
* **Immediate Persistence:** All changes are instantly saved to the browser's local storage.

### Analytics & Tracking

* **Subject Analytics:** A weekly bar chart visualizes the total minutes studied per subject.
* **Completion Tracking:** Users can mark sessions as "Complete," visually distinguishing them with a strikethrough and opacity change.
* **Reminders:** An optional setting triggers a browser popup when a session ends (if the application tab is active).

## Technical Architecture

* **Framework:** React + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Architecture Pattern:** Client-Side MVC
    * **Models:** Handle data validation (overlap checks), CRUD logic, and storage interfacing.
    * **Views:** React components responsible for UI rendering and user interaction.
    * **Controllers:** Orchestrate communication between Models and Views.
* **Data Storage:** Browser `localStorage` using a specific JSON schema.

## Getting Started

### Prerequisites

* Node.js installed on your machine.

### Installation

1. Clone the repository.
2. Install project dependencies:

```bash
npm install
```

## Running the Application

Start the local development server:


```bash
npm run dev
```

Open your browser to the local URL provided (typically http://localhost:5173).


## MVP Limitations

As defined in the requirements, this MVP has the following constraints:

* Local Storage Only: Clearing the browser cache will delete all application data. Data does not sync between devices.
* Cross-Midnight Sessions: Sessions must start and end on the same calendar day.
* Single User: The application supports one user profile per browser instance.