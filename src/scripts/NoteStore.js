import { EventEmitter } from './EventEmitter.js'
import { StorageService } from './StorageService.js'

export class NoteStore {
  #notes = [];

  constructor() {
    this.eventManager = new EventEmitter();
    this.localStorageService = new StorageService();
    this.#notes = this.localStorageService.getItem('notes');
  }

  #saveChange(event) {
    this.localStorageService.saveItem('notes', this.#notes);
    this.eventManager.notify(event, this.#notes)
  }

  createNote(note) {
    this.#notes.push(note);
    this.#saveChange('create')
  }

  deleteNote(id) {
    this.#notes = this.#notes.filter(note => note.id !== id);
    this.#saveChange('delete')
  }

  getAllNotes() {
    return [...this.#notes];
  }
}
