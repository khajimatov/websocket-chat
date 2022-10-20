import { useRef } from 'react'

interface NewMessageFormProps {
    socket: WebSocket
}
function NewMessageForm({ socket }: NewMessageFormProps) {

    const inputEl = useRef<HTMLInputElement>(null);

    const onClickSendMessage = () => {
        const sendingNewMessage = { "type": "CREATE_MESSAGE", "message": inputEl.current && inputEl.current.value };
        if (inputEl.current) inputEl.current.value = "";
        socket.send(JSON.stringify(sendingNewMessage));
    }

    return (
        <>
            <hr />
            <form className="new-message-form">
                <label htmlFor="new-message-text">Send message</label>
                <input ref={inputEl} type="text" name="new-message-text" id="new-message-text" placeholder="Type your message to everyone" />
                <input onClick={onClickSendMessage} type="button" value="Send new message" name="new-message-button" id="new-message-button" />
            </form>
        </>

    )
}

export default NewMessageForm;