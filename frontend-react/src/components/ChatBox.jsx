function Message({role, text}) {
    return(
        <div className={role === "user" ? "user" : "ai"}>
            <span>{text}</span>
        </div>
    );
}

export default Message;