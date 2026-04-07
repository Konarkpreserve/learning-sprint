import { useState } from "react";

function App() {
  const[message, setmessage]=useState("");
  // const[response, setresponse]=useState("");  only single response
  const[messages, setMessages]=useState([]);

  async function askAI()
  {
    // console.log("sending req", message);
    if(!message.trim()) return;

    const newMessages=[...messages, {role: "user", text: message}];
    setMessages(newMessages)

    try{
      let res = await fetch(`http://127.0.0.1:8000/ask?q=${encodeURIComponent(message)}`);
      // console.log("raw res", res);
      let data = await res.json();
      // console.log("data rec", data);

      setMessages([
        ...newMessages,
        {role: "ai", text: data.answer}
      ]);
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

    }
  }

  return (
    <div>
      <h2>AI CHAT N</h2>

    <div>
      {messages.map((msg, index) => (
        <p key={index}>
          <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.text}
        </p>
      ))}
    </div>

      <input
      value={message}
      onChange={(e) => setmessage(e.target.value)} 
      placeholder="Type Something...." />
      
      <button onClick={askAI}>Send</button>

      {/* <p><b>AI:</b> {response}</p>  */} 
    </div>
  );
}
export default App;