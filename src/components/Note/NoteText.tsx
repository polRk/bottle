import * as React from 'react'
import { hex2rgba, INoteText } from '../../shared'
import {
  noteCN,
  renderActions,
  renderAttachments,
  renderReminder,
  renderTags,
  renderTimestamp,
} from './index'
import { useGlobalState } from '../../store'

export const NoteText: React.FC<{ note: INoteText }> = ({ note }) => {
  const [tags] = useGlobalState('tags')
  const [colors] = useGlobalState('colors')
  const color = colors.find(color => color.id === note.color)

  return (
    <>
      {renderReminder(note)}
      <div className={noteCN('ContentOverlay')}>
        <div
          className={noteCN('Content')}
          style={{
            backgroundColor: color ? hex2rgba(color.color, 0.4) : undefined,
          }}
        >
          <div className={noteCN('Header')}>
            {note.title && <h2>{note.title}</h2>}
            {note.text && <p>{note.text}</p>}
          </div>
          <div className={noteCN('Footer')}>
            {renderTags(note, tags)}
            {renderActions(note)}
            {renderTimestamp(note)}
          </div>
        </div>
      </div>

      {renderAttachments(note)}
    </>
  )
}
NoteText.displayName = 'NoteText'
