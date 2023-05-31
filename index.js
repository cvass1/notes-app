const NotesModel = require('./notesModel');

model = new NotesModel();
model.addNote('Buy milk');
model.addNote('Go to the gym');

console.log(model.getNotes());