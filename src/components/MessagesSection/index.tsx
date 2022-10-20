import NewMessageForm from '../NewMessageForm';
import MessageCard from '../MessageCard';
interface Message {
    username: string,
    text: string
}

interface MessageProps {
    messages: Message[],
    socket: WebSocket
}

function MessagesSection({ messages, socket }: MessageProps) {
    return (
        <>
            <h1 className='messages-section-title'>Messages</h1>
            <div className='messages-list'>
                {
                    messages.length > 0 && messages.map(message => {
                        return <MessageCard username={message.username} text={message.text} />
                    })
                }
            </div>
            <NewMessageForm socket={socket}/>
        </>
    )
}

export default MessagesSection;