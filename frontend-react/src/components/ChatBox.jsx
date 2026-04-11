import Message from "./Message";

function ChatBox({ messages, chatEndRef}) {
    return (
        <div className="chat-box">
            {messages.map((msg, index) => (
                <Message key={index} role={msg.role} text={msg.text} />
            ))}
            <div ref={chatEndRef}></div>
        </div>
    );
}

export default ChatBox;