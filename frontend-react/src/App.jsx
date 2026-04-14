import "./App.css";
import { useState } from "react";
import {useEffect, useRef} from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";

function App() {

  const chatEndRef=useRef(null);
  const[loading, setLoading] = useState(false);
  const[message, setmessage]=useState("");
  // const[response, setresponse]=useState("");  only single response
  const[messages, setMessages]=useState(() => {
    const saved = localStorage.getItem("messages");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [messages]);
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  function clearChat() {
    setMessages([]);
    localStorage.removeItem("messages");
  }

  async function askAI() {

  if (!message.trim()) return;

  const userMessage = { role: "user", text: message };

  setLoading(true);

  // 1️⃣ Add user message safely
  setMessages(prev => [...prev, userMessage]);

  // 2️⃣ Add "Thinking..."
  setMessages(prev => [
    ...prev,
    userMessage,
    { role: "ai", text: "Thinking..." }
  ]);

  try {
    let res = await fetch(
      `http://127.0.0.1:8000/ask?q=${encodeURIComponent(message)}`
    );
    let data = await res.json();

    // 3️⃣ Replace last "Thinking..." with real response
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: "ai",
        text: data.answer
      };
      return updated;
    });

    setMessage("");
    setLoading(false);

  } catch (err) {

    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        role: "ai",
        text: "Error Occurred"
      };
      return updated;
    });

    setLoading(false);
  }
}

  return (
    <div className="chat-container">
      <h2>AI CHAT N</h2>

      <ChatBox messages={messages} chatEndRef={chatEndRef} />

      <InputBox
      message={message}
      setmessage={setmessage}
      askAI={askAI}
      loading={loading}
      />
      <button onClick={clearChat}>Clear</button>
    </div>

  );
}
export default App;