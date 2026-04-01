async function askAI() {
            let btn = document.getElementById("sendbtn");
            btn.disabled = true;

            let q = document.getElementById("ques").value;

            let chat = document.getElementById("chat");

            if(!q.trim()) {
                btn.disabled=false;
                return;                                  // prevent empty input
            }

            chat.innerHTML += `<p><b>Me:</b> ${q}</p>`;            //show user message
            chat.scrollTop = chat.scrollHeight;

            let loadingId = "loading-" + Date.now();
            chat.innerHTML += `<p id="${loadingId}"><b>AI:</b> Thinking..... </p>`;
            chat.scrollTop = chat.scrollHeight;
        try{

            let res = await fetch(`http://127.0.0.1:8000/ask?q=${encodeURIComponent(q)}`);
            let data = await res.json()

            chat.innerHTML="";

            data.history.forEach(msg => {
                if(msg.user){
                    chat.innerHTML += `<p><b>Me:</b> ${msg.user}</p>`
                } else {    
                    chat.innerHTML += `<p><b>Me:</b> ${msg.ai}</p>`
                }
                
            });
           
            // document.getElementById(loadingId).innerHTML = `<b>AI:</b> ${data.answer}`;
            chat.scrollTop = chat.scrollHeight;
        } catch(err){
            
            document.getElementById(loadingId).innerHTML = `<b>AI:</b> Error Occured`;
        }

            document.getElementById("ques").value = "";
            btn.disabled=false;

        }
        function clearChat(){
            document.getElementById("chat").innerHTML = "";
        }