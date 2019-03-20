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
import { Checkbox } from '../Checkbox'

export const NoteList: React.FC<{ note: INoteList }> = ({ note }) => {
  const [tags] = useGlobalState('tags')
  const [colors] = useGlobalState('colors')
  const color = colors.find(color => color.id === note.color)

  return (
    <>
      {renderReminder(note)}
      <div className={noteCN('ContentOverlay')}>
        <div className={noteCN('Content', { type: 'list' })}>
          <div
            className={noteCN('Header')}
            style={{
              backgroundColor: color ? hex2rgba(color.color, 0.4) : undefined,
            }}
          >
            <h2>{note.title}</h2>
            {note.items
              .filter(item => !item.checked)
              .map(item => (
                <Checkbox
                  key={item.text}
                  isChecked={item.checked}
                  text={item.text}
                  onChange={console.log}
                />
              ))}
          </div>
          <div className={noteCN('ToDoList')}>
            {note.items
              .filter(item => item.checked)
              .map(item => (
                <Checkbox
                  key={item.text}
                  isChecked={item.checked}
                  text={item.text}
                  onChange={console.log}
                />
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
