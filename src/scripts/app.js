import { NoteStore } from "./NoteStore.js";
import { NoteView } from "./NoteView.js";

function app() {
  const noteStore = new NoteStore();
  const noteView = new NoteView();

  noteView.renderNotes()

  noteStore.eventManager.subscribe('*', noteView)

  const noteTitleField = document.getElementById('note-title-field')
  const noteAddButton = document.getElementById('add-note')

  noteAddButton.addEventListener('click', (e) => {
    const titleNoteValue = noteTitleField.value;

    if (!titleNoteValue.trim()) return;

    noteStore.createNote({id: Date.now(), title: titleNoteValue})
    noteTitleField.value = ''
  })
}

app();
