function InputBox({message, setmessage, askAI, loading}) {
    return (
        <div className="input-box">
            <input 
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter") askAI();
            }}
            placeholder="Type Something..." />

            <button onClick={askAI} disable = {loading}>
                {loading ? "..." : "Send"}
            </button>
        </div>
    );
}

export default InputBox;