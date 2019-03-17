export interface ITag {
  id: number
  tag: string
}

export interface IColor {
  id: number
  color: string
}

export interface INote {
  created: number
  title?: string
  attachments?: Array<NoteAttachment>
  size?: NoteSize
  reminder?: number
}

export interface INoteText extends INote {
  type: NoteType.text
  text: string
}

export interface INoteList extends INote {
  type: NoteType.list
  items: Array<{ text: string; checked: boolean }>
}

export interface INoteImage extends INote {
  type: NoteType.image
  url: string
}

export enum NoteAttachmentType {
  'link',
  'image',
}

export interface INoteAttachmentLink {
  type: NoteAttachmentType.link
  url: string
}

export interface INoteAttachmentImage {
  type: NoteAttachmentType.image
  url: string
}

export type NoteAttachment = INoteAttachmentLink | INoteAttachmentImage

export enum NoteType {
  'list',
  'text',
  'image',
}

export enum NoteSize {
  's',
  'm',
  'l',
}

export type Note = INoteText | INoteList | INoteImage
