interface MessageProps {
    username: string,
    text: string
}
function MessageCard({ username, text }: MessageProps) {
    return (
        <div className="message">
            <b className="message-username">{username}</b>
            <p className="message-text">{text}</p>
        </div>
    )
}
export default MessageCard;