import {NoteStore} from "./NoteStore.js";
import {NoteView} from "./NoteView.js";

function app() {
  const noteStore = new NoteStore();
  const noteView = new NoteView();

  noteView.renderNotes()

  noteStore.eventManager.subscribe('*', noteView)

  const notesList = document.getElementById('notes-list')
  const noteTitleField = document.getElementById('note-title-field')
  const noteAddButton = document.getElementById('add-note')

  function addNewNote(e) {
    const titleNoteValue = noteTitleField.value;

    if (!titleNoteValue.trim()) return;

    noteStore.createNote({id: Date.now(), title: titleNoteValue})
    noteTitleField.value = ''
  }

  noteAddButton.addEventListener('click', addNewNote)

  noteTitleField.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      addNewNote(e)
    }
  })

  notesList.addEventListener('click', (e) => {
    const noteElement = e.target.closest('.note');
    const selectField = e.target.closest('.note__select-note');
    const deleteButton = e.target.closest('.note__action');

    if (!noteElement) return;

    const noteId = +noteElement.dataset.noteId;

    if (deleteButton) {
      noteElement.classList.add('removing')

      noteElement.addEventListener('transitionend', (e) => {
        noteStore.deleteNote(noteId);
      }, {once: true})

      console.log(noteElement)
    }

    if (selectField) {
      if (selectField.checked) {
        noteElement.classList.add('done')
      } else {
        noteElement.classList.remove('done')
      }
    }
  })
}

app();
