import { useState } from "react";

function App() {
  const[message, setmessage]=useState("");
  const[response, setresponse]=useState("");

  async function askAI()
  {
    console.log("sending req", message);
    try{
      let res = await fetch(`http://127.0.0.1:8000/ask?q=${encodeURIComponent(message)}`);
      console.log("raw res", res);
      let data = await res.json();
      console.log("data rec", data);
      
      setresponse(data.answer);
      setmessage("");
    } catch (err){
      console.log("error", err);
      setresponse("err occured");

    }
  }

  return (
    <div>
      <h2>AI CHAT N</h2>
      <input
      value={message}
      onChange={(e) => setmessage(e.target.value)} 
      placeholder="Type Something...." />
      
      <button onClick={askAI}>Send</button>

      <p><b>AI:</b> {response}</p>
    </div>
  );
}
export default App;