
class NotesView {
    constructor(model, client) {
        this.model = model;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');
        this.inputEl = document.querySelector('#user-input');
        this.addNoteButton = document.querySelector('#add-note-button');
        this.addNoteButton.addEventListener('click', () =>{
            this.addNewNote();
            this.inputEl.value = "";
        })
        this.resetNotesButton = document.querySelector('#reset-notes-button');
        this.resetNotesButton.addEventListener('click', () => {
            this.client.resetNotes(()=>{
                this.displayNotesFromApi();
            });
        });
    }

    addNewNote() {
        this.model.addNote(this.inputEl.value);
        this.client.createNote(this.inputEl.value,(data) => {
            console.log(data);
        },
        ()=>{
            this.displayError();
        });
        this.displayNotes();
    }

    displayNotes() {
        this.clearNotes();
        this.model.getNotes().forEach( note => {
            let newDiv = document.createElement('div');
            newDiv.textContent = note;
            newDiv.className = 'note';
            this.mainContainerEl.append(newDiv);
        });
    }

    clearNotes() {
        const allNoteDivs = document.querySelectorAll('div.note');
        allNoteDivs.forEach((div) => {
            div.remove();
        })
    }

    displayNotesFromApi() {
        this.client.loadNotes((notesData)=>{
            this.model.setNotes(notesData);
            console.log(`notes from model: ${this.model.getNotes()}`)
            this.displayNotes();
        },
        ()=>{
            this.displayError();
        });
    }

    displayError() {
        this.clearNotes();
        let newDiv = document.createElement('div');
        newDiv.textContent = "Oops, something went wrong!";
        newDiv.className = 'error';
        this.mainContainerEl.append(newDiv);

    }

};

module.exports = NotesView;