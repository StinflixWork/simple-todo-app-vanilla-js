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

  toggleNoteStatus(id, isDone) {
    const noteIndex = this.#notes.findIndex(note => note.id === id)
    if (noteIndex === -1) return;

    const updatedNotes = [...this.#notes]
    updatedNotes[noteIndex].isDone = isDone;
    this.#notes = [...updatedNotes];

    this.#saveChange('update')
  }

  getAllNotes() {
    return [...this.#notes];
  }
}
