export interface ITag {
  id: number
  tag: string
}

export interface IColor {
  id: number
  color: string
}

export interface INoteBase {
  created: number
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

export const hex2rgba = (hex: string, alpha = 1) => {
  const rgb = hex.match(/\w\w/g)
  if (rgb) {
    const [r, g, b] = rgb.map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${alpha})`
  } else {
    return undefined
  }
}
