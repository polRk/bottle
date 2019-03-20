import * as React from 'react'
import { hex2rgba, INoteList } from '../../shared'
import {
  noteCN,
  renderActions,
  renderAttachments,
  renderReminder,
  renderTags,
  renderTimestamp,
} from './index'
import { useGlobalState } from '../../store'

export const NoteList: React.FC<{ note: INoteList }> = ({ note }) => {
  const [tags] = useGlobalState('tags')
  const [colors] = useGlobalState('colors')
  const color = colors.find(color => color.id === note.color)

  return (
    <>
      {renderReminder(note)}
      <div className={noteCN('ContentOverlay')}>
        <div className={noteCN('Content')}>
          <div
            className={noteCN('Header')}
            style={{
              backgroundColor: color ? hex2rgba(color.color, 0.4) : undefined,
            }}
          >
            <h2>{note.title}</h2>
            {note.items.map(item => (
              <span key={item.text}>{item.text}</span>
            ))}
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
NoteList.displayName = 'NoteList'
