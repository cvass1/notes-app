/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');


describe('Notes View', () => {
    it('displays all the notes', () =>{
        document.body.innerHTML = fs.readFileSync('./index.html')
        model = new NotesModel();
        view = new NotesView(model);

        model.addNote("test note");
        model.addNote("second test note");
        view.displayNotes();
        let allNoteDivs = document.querySelectorAll('div.note');
        expect(allNoteDivs.length).toBe(2);
        
    });
});