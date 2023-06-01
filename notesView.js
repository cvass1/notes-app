
class NotesView {
    constructor(model) {
        this.model = model;
        this.mainContainerEl = document.querySelector('#main-container');
        this.inputEl = document.querySelector('#user-input');
        this.addNoteButton = document.querySelector('#add-note-button');
        this.addNoteButton.addEventListener('click', () =>{
            this.addNewNote();
            this.inputEl.value = "";
        })
    }

    addNewNote() {
        this.model.addNote(this.inputEl.value);
        this.displayNotes();
    }

    displayNotes() {
        this.clearNotes()
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

};

module.exports = NotesView;