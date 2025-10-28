import { EventManager } from './eventManager.js'
import { LocalStorageService } from './localStorageService.js'

export class NoteService {
  #notes = [];

  constructor() {
    this.eventManager = new EventManager();
    this.localStorageService = new LocalStorageService();
    this.#notes = this.localStorageService.getItem('notes');
  }

  createNote(note) {
    this.#notes.push(note);
    this.localStorageService.saveItem('notes', this.#notes);
    this.eventManager.notify(this.#notes)
  }

  getAllNotes() {
    return [...this.#notes];
  }
}
