
class NotesView {
    constructor(model) {
        this.model = model;
        this.mainContainerEl = document.querySelector('#main-container');
    }

    displayNotes() {
        this.model.getNotes().forEach( note => {
            let newDiv = document.createElement('div');
            newDiv.textContent = note;
            newDiv.className = 'note';
            this.mainContainerEl.append(newDiv);
        });
    }

};

module.exports = NotesView;