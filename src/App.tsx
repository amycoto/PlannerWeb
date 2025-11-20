import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SessionModel } from './models/SessionModel.ts'

function App() {
  const [count, setCount] = useState(0)

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

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
