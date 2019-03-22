import { unionBy } from 'lodash'

export interface ITag {
  id: number
  tag: string
}

export interface IColor {
  id: number
  color: string
}

export interface INoteBase {
  id?: number
  created: number
  archived?: boolean
  title?: string
  attachments?: Array<NoteAttachment>
  size?: NoteSize
  reminder?: number
  color?: number
  tags?: number[]
}

export interface INoteText extends INoteBase {
  type: NoteType.text
  text: string
}

export interface INoteList extends INoteBase {
  type: NoteType.list
  items: Array<{ text: string; checked: boolean }>
}

export interface INoteImage extends INoteBase {
  type: NoteType.image
  url: string
}

export enum NoteAttachmentType {
  link = 'link',
  image = 'image',
  sep = 'sep',
}

export interface INoteAttachmentLink {
  type: NoteAttachmentType.link
  url: string
}

export interface INoteAttachmentImage {
  type: NoteAttachmentType.image
  url: string
}

export type NoteAttachment =
  | INoteAttachmentLink
  | INoteAttachmentImage
  | { type: NoteAttachmentType.sep }

export enum NoteType {
  list = 'list',
  text = 'text',
  image = 'image',
}

export enum NoteSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type Note = INoteText | INoteList | INoteImage

const random = () => Math.ceil(Math.random() * 10000)

export class Notes implements Iterable<Note> {
  private readonly notes: Note[] = []

  constructor(notes: Note[]) {
    this.notes = [...notes]
  }

  static factory(notes: Note[]): Note[] {
    return notes.map(note => {
      return {
        ...note,
        id: random(),
        size: note.size ? note.size : NoteSize.m,
      }
    })
  }

  private getNoteSize(note: Note): NoteSize {
    switch (note.type) {
      case NoteType.list:
        return NoteSize.l
      case NoteType.image:
        return NoteSize.m
      case NoteType.text:
        return NoteSize.s
      default:
        return NoteSize.m
    }
  }

  addNote(note: Note, archived = false): Note {
    const newNote = {
      ...note,
      id: random(),
      archived,
      size: note.size ? note.size : this.getNoteSize(note),
    }

    this.push(newNote)
    return newNote
  }

  deleteNote(id: number): boolean {
    const ind = this.notes.findIndex(note => note.id === id)
    if (ind > -1) {
      this.notes.splice(ind, 1)
      return true
    }
    return false
  }

  updateNote(id: number, note: Note): boolean {
    const ind = this.notes.findIndex(note => note.id === id)
    if (ind > -1) {
      delete note.id
      this.notes[ind] = { ...note, id }
      return true
    }
    return false
  }

  toArray(): Note[] {
    return [...this.notes]
  }

  push(...notes: Note[]): number {
    return this.notes.push(...notes)
  }

  entries() {
    return this.notes.entries()
  }

  map<U>(
    callbackfn: (value: Note, index: number, array: Notes) => U,
    thisArg?: any
  ): U[] {
    const result: U[] = []

    for (const [index, note] of this.entries()) {
      result.push(callbackfn(note, index, new Notes(this.toArray())))
    }

    return result
  }

  foreach(
    callbackfn: (value: Note, index: number, array: Notes) => void,
    thisArg?: any
  ): void {
    for (const [index, note] of [...this.notes].entries()) {
      callbackfn(note, index, new Notes(this.toArray()))
    }
  }

  filter(
    callbackfn: (value: Note, index: number, array: Notes) => boolean
  ): Notes {
    const result: Note[] = []

    for (const [index, note] of [...this.notes].entries()) {
      const rb = callbackfn(note, index, new Notes(this.toArray()))
      if (rb) {
        result.push(note)
      }
    }

    return new Notes(Notes.factory(result))
  }

  *[Symbol.iterator]() {
    for (const note of this.notes) {
      yield note
    }
  }
}

export const hex2rgba = (hex: string, alpha = 1) => {
  const rgb = hex.match(/\w\w/g)
  if (rgb) {
    const [r, g, b] = rgb.map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
  } else {
    return undefined
  }
}
