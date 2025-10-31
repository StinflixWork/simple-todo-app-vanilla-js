import { StorageService } from "./StorageService.js";
import { escapeHTML } from "./utils/escapeHtml.js";

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
      .map(note => `<li class="note" data-note-id=${note.id}>
        <p>${escapeHTML(note.title)}</p>
        <div class='note__actions'>
            <button class='note__action'>
                <img src='./src/assets/icons/trash.svg' alt="delete note">
            </button>
        </div>
      </li>`)
      .join('');
  }
}
