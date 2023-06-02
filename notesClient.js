class NotesClient {
    constructor() {

    }

    loadNotes(callback) {
        fetch('http://localhost:3000/notes')
        .then((response) => response.json())
        .then((notesData) => {
            callback(notesData);
        })
    }

};

module.exports = NotesClient;