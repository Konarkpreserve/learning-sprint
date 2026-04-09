import "./App.css";
import { useState } from "react";
import {useEffect, useRef} from "react";

function App() {

  const chatEndRef=useRef(null);
  const[loading, setLoading] = useState(false);
  const[message, setmessage]=useState("");
  // const[response, setresponse]=useState("");  only single response
  const[messages, setMessages]=useState([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [messages]);
  async function askAI()
  {
    // console.log("sending req", message);
    if(!message.trim()) return;
    setLoading(true);

    const newMessages=[...messages, {role: "user", text: message}];
    setMessages(newMessages)

    setMessages([
      ...newMessages,
      {role:"ai", text: "Thinking...."}
    ]);

    try{
      let res = await fetch(`http://127.0.0.1:8000/ask?q=${encodeURIComponent(message)}`);
      // console.log("raw res", res);
      let data = await res.json();
      // console.log("data rec", data);

      setMessages([
        ...newMessages,
        {role: "ai", text: data.answer}
      ]);
      setLoading(false);
      setmessage("")
      
      // setresponse(data.answer);  single response
      // setmessage("");  
    } catch (err){
      // console.log("error", err);
      // setresponse("err occured");
      setMessages([
        ...newMessages,
        {role: "ai", text: "Err Occured"}
      ]);
      setLoading(false);

    }
  }

  return (
    <div className="chat-container">
      <h2>AI CHAT N</h2>

    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={msg.role === "user" ? "user" : "ai"} >
           <span>{msg.text}</span>
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>

    <div className="input-box">
       <input
       value={message}
       onChange={(e) => setmessage(e.target.value)}
       onKeyDown={(e) => {
        if(e.key == "Enter"){
          askAI();
        }
       }}
       placeholder="Type Your Thoughts..."
       />

      <button onClick={askAI} disabled={loading}>{loading ? "..." : "Send"}</button>

      </div>

      {/* <p><b>AI:</b> {response}</p>  */} 
    </div>
  );
}
export default App;