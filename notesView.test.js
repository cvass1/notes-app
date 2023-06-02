/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

jest.mock('./notesClient');


describe('Notes View', () => {
    it('displays all the notes', () =>{
        document.body.innerHTML = fs.readFileSync('./index.html')
        const model = new NotesModel();
        const view = new NotesView(model);

        model.addNote("test note");
        model.addNote("second test note");
        view.displayNotes();
        const allNoteDivs = document.querySelectorAll('div.note');
        expect(allNoteDivs.length).toBe(2);
        
    });

    it('allows user to input a new note', () =>{
        document.body.innerHTML = fs.readFileSync('./index.html')
        const model = new NotesModel();
        const view = new NotesView(model);

        const addNoteButton = document.querySelector('#add-note-button');
        const inputEl = document.querySelector('#user-input');
        inputEl.value = "this is a user input test";
        addNoteButton.click();

        const allNoteDivs = document.querySelectorAll('div.note');
        expect(allNoteDivs.length).toBe(1);
        expect(allNoteDivs[0].textContent).toBe("this is a user input test");

    });

    it('allows user to input multiple notes', () =>{
        document.body.innerHTML = fs.readFileSync('./index.html')
        const model = new NotesModel();
        const view = new NotesView(model);

        const addNoteButton = document.querySelector('#add-note-button');
        const inputEl = document.querySelector('#user-input');
        
        inputEl.value = "this is the first user input test";
        addNoteButton.click();
        
        inputEl.value = "this is the second user input test";
        addNoteButton.click();

        const allNoteDivs = document.querySelectorAll('div.note');
        expect(allNoteDivs.length).toBe(2);
        expect(allNoteDivs[0].textContent).toBe("this is the first user input test");
        expect(allNoteDivs[1].textContent).toBe("this is the second user input test");
        expect(inputEl.value).toBe("");

    });

    it('displays notes from the API',()=>{
        NotesClient.mockClear();
        document.body.innerHTML = fs.readFileSync('./index.html');
        const model = new NotesModel();
        const mockClient = new NotesClient();
        const view = new NotesView(model, mockClient);
        
        mockClient.loadNotes.mockImplementation((callback) => {
            callback(['test note']);
        });

        view.displayNotesFromApi();

        const allNoteDivs = document.querySelectorAll('div.note');
        expect(allNoteDivs.length).toBe(1);
        expect(allNoteDivs[0].textContent).toBe("test note");

    });
});