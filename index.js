const NotesClient = require('./notesClient');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

model = new NotesModel();
client = new NotesClient();
view = new NotesView(model, client);

view.displayNotesFromApi();

