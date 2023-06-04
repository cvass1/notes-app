const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

describe('NotesClient',() => {
    it('fetches notes from the server', (done) => {
        const client = new NotesClient();

        fetch.mockResponseOnce(JSON.stringify(
            ["test note"]
        ));

        client.loadNotes((notesData) =>{
            expect(notesData).toEqual(['test note']);
            done();
        });
    });

    it('posts new notes to the server',(done) =>{
        const client = new NotesClient();
        const url = "http://localhost:3000/notes";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content: "third test note"}),
            };

        fetch.mockResponseOnce(JSON.stringify(
            ['first test note', 'second test note', 'third test note']
        ));
        
        const note = 'third test note';
        
        client.createNote(note, (data) => {
            expect(fetch).toHaveBeenCalledWith(url,options);
            expect(data).toEqual(['first test note', 'second test note', 'third test note']);
            done();
        });
    });

    it('resets all notes', (done)=>{
        const client = new NotesClient();
        const url = "http://localhost:3000/notes";
        const options = {
            method: "DELETE",
            };

        fetch.mockResponseOnce(JSON.stringify(
            ['']
            ));
        
        client.resetNotes((data)=>{
            expect(fetch).toHaveBeenCalledWith(url,options);
            expect(data).toEqual(['']);
            done();
        });

    });
});