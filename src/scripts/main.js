import { NoteService } from "./noteService.js";
import { LocalStorageService } from './localStorageService.js'

class Notes {
  #notes = [];
  #noteListElement;

  constructor() {
    this.#noteListElement = document.getElementById('notes-list');
    this.localStorageService = new LocalStorageService();
    this.#notes = this.localStorageService.getItem('notes');
  }

  update(notes) {
    this.#notes = [...notes]
    this.renderNotes()
  }

  renderNotes() {
    if (this.#notes.length === 0) {
      this.#noteListElement.innerHTML = '<li class="empty">Немає нотаток</li>';
      return;
    }

    this.#noteListElement.innerHTML = this.#notes
      .map(note => `<li class="note">${note.title}</li>`)
      .join('');
  }

}

function main() {
  const noteService = new NoteService();
  const notes = new Notes();

  notes.renderNotes()

  noteService.eventManager.subscribe(notes)

  const noteTitleField = document.getElementById('note-title-field')
  const noteAddButton = document.getElementById('add-note')

  noteAddButton.addEventListener('click', (e) => {
    const titleNoteValue = noteTitleField.value;
    noteService.createNote({id: Date.now(), title: titleNoteValue})
    noteTitleField.value = ''
  })
}

main();
