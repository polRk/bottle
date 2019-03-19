import * as React from 'react'
import { INoteList } from '../../shared'
import {
  noteCN,
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
      <div className={noteCN('Content')}>
        <div
          className={noteCN('Header')}
          style={{
            backgroundColor: color ? color.color : undefined,
          }}
        >
          {note.items.map(item => (
            <span key={item.text}>{item.text}</span>
          ))}
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
NoteList.displayName = 'NoteList'
