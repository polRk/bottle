import * as React from 'react'
import { hex2rgba, ICardImage } from '../../shared'
import {
  noteCN,
  renderActions,
  renderAttachments,
  renderReminder,
  renderTags,
  renderTimestamp,
} from './index'
import { useGlobalState } from '../../store'

export const NoteImage: React.FC<{ note: ICardImage }> = ({ note }) => {
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
            <img src={note.url} alt={note.url} />
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
NoteImage.displayName = 'NoteImage'
