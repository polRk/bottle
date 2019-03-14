export interface IData {
  tags: ITag[];
  colors: IColor[];
  notes: Partial<INoteDirty>[];
}

export interface IState extends IData {
  loading: boolean;
}

export interface ITag {
  id: number;
  tag: string;
}

export interface IColor {
  id: number;
  color: string;
}

export enum INoteType {
  'list',
  'text',
  'image'
}

export enum INoteSize {
  's',
  'm',
  'l'
}

export interface INote {
  type: INoteType;
  title: string;
  text: string;
  url: string;
  attachments: Array<{ type: 'link' | 'image'; url: string }>;
  items: Array<{ text: string; checked: boolean }>;
  size: INoteSize;
  reminder: number;
  created: number;
}

export interface INoteDirty extends INote {
  tags: number[];
  color: number;
}

export interface INoteProcessed extends INote {
  tags: ITag[];
  color: IColor;
}

export class Notes {
  notes: Partial<INoteProcessed>[] = []

  static factory (data: IData): Partial<INoteProcessed>[] {
    return data.notes.map(note => ( {
      ...note,
      tags: data.tags.filter(tag => ( note.tags || [] ).includes(tag.id)),
      color: data.colors.find(color => color.id === note.color),
    } ))
  }

  constructor (data: IData) {
    this.notes = Notes.factory(data)
  }

  private getNoteSize (note: Partial<INoteProcessed>): INoteSize {
    const assert = {
      [ INoteType.list ]: INoteSize.l,
      [ INoteType.image ]: INoteSize.m,
      [ INoteType.text ]: INoteSize.s,
    }

    return assert[ note.type || INoteType.text ]
  }

  addNote (note: Partial<INoteProcessed>): void {
    this.notes.push({
      ...note,
      size: note.size ? note.size : this.getNoteSize(note),
    })
  }

  toArray (): Partial<INoteProcessed>[] {
    return { ...this.notes }
  }
}