const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

describe('NotesClient',() => {
    it('fetches notes from the server', (done) => {
        const client = new NotesClient();

        fetch.mockResponseOnce(JSON.stringify({
            note: "test note",
        }));

        client.loadNotes((notesData) =>{
            expect(notesData.note).toBe('test note');
            done();
        });
    });
});