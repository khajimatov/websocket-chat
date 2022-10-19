function NewUserForm() {
    return (
        <section className="new-user-section">
            <form id="new-user-form">
                <label htmlFor="new-user-name" id="new-user-label">{'Your username'}</label><br />
                <input type="text" name="new-user-name" id="new-user-name" />
                <input type="button" value="Send" name="new-user-button" id="new-user-button" />
            </form>
        </section>
    )
}

export default NewUserForm;