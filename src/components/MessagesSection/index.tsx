import './MessagesSection.css';
function MessagesSection() {
    return (
        <>
            <p className='messages-section-title'>Messages</p>
            <div id="create-message">
                <h2>create-message</h2>
                <form name="createMessageForm" id="create-message-form">
                    <label htmlFor="create-message-text" id="create-message-label">Send message</label><br></br>
                    <input type="text" name="create-message-text" id="create-message-text" />
                    <input type="button" value="Send" name="create-message-button" id="create-message-button" />
                </form>
            </div>
        </>
    )
}

export default MessagesSection;