class NotesClient {
    constructor() {

    }

    loadNotes(callback, errorCallback) {
        fetch('http://localhost:3000/notes')
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }).catch( () => {
            errorCallback();
        });
    }

    createNote(note, callback, errorCallback) {
        fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content: note}),})
        .then((response) => response.json())
        .then((data) => {
            callback(data)
        }).catch( () => {
            errorCallback();
        });
    }

};

module.exports = NotesClient;