import { useRef, useState } from 'react';

interface NewUserProps {
    socket: WebSocket
}

function NewUserForm({ socket }: NewUserProps) {

    const inputEl = useRef<HTMLInputElement>(null);

    const [display, setDisplay] = useState('block');

    const onClickSubmit = () => {
        const sendingNewUsername = { "type": "SET_USERNAME", "username": inputEl.current && inputEl.current.value };
        if (inputEl.current) inputEl.current.value = "";
        socket.send(JSON.stringify(sendingNewUsername));
        setDisplay('none');
    }

    return (
        <section style={{ display: display }} className="new-user-section">
            <form id="new-user-form">
                <label htmlFor="new-user-name" id="new-user-label">{'Your username'}</label><br />
                <input ref={inputEl} type="text" name="new-user-name" id="new-user-name" />
                <input onClick={onClickSubmit} type="button" value="Send" name="new-user-button" id="new-user-button" />
            </form>
        </section>
    )
}

export default NewUserForm;