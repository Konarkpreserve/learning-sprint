import { useState } from "react";

function App() {
  const[message, setmessage]=useState("");
  return (
    <div>
      <h2>AI CHAT N</h2>
      <input
      value={message}
      onChange={(e) => setmessage(e.target.value)} 
      placeholder="Type Something...." />
      <button onClick={() => alert(message)}>Send</button>
    </div>
  );
}
export default App;