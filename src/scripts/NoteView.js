import { StorageService } from "./StorageService.js";

export class NoteView {
  #notes = [];
  #noteListElement;

  constructor() {
    this.#noteListElement = document.getElementById('notes-list');
    this.localStorageService = new StorageService();
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
