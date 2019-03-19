import * as React from 'react'
import { INoteImage } from '../../shared'
import {
  noteCN,
  renderAttachments,
  renderReminder,
  renderTags,
  renderTimestamp,
} from './index'
import { useGlobalState } from '../../store'

export const NoteImage: React.FC<{ note: INoteImage }> = ({ note }) => {
  const [tags] = useGlobalState('tags')
  const [colors] = useGlobalState('colors')
  const color = colors.find(color => color.id === note.color)

  return (
    <>
      {renderReminder(note)}
      <div
        className={noteCN('Content')}
        style={{
          backgroundColor: color ? color.color : undefined,
        }}
      >
        <div className={noteCN('Header')}>
          <img src={note.url} alt={note.url} />
        </div>
        <div className={noteCN('Footer')}>
          {renderTags(note, tags)}
          {renderTimestamp(note)}
        </div>
      </div>
      {renderAttachments(note)}
    </>
  )
}
NoteImage.displayName = 'NoteImage'
