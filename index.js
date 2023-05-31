const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

model = new NotesModel();
view = new NotesView(model);

model.addNote('This is an example note');
view.displayNotes();


console.log(model.getNotes());