import { EventEmitter } from './EventEmitter.js'
import { StorageService } from './StorageService.js'

export class NoteStore {
  #notes = [];

  constructor() {
    this.eventManager = new EventEmitter();
    this.localStorageService = new StorageService();
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
