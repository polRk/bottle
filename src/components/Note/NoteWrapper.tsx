import * as React from 'react'
import { INoteImage, INoteList, INoteText, Note, NoteType } from '../../shared'
import { noteCN, NoteImage, NoteList, NoteText } from './index'
import { dispatch } from '../../store'
import { SELECT_NOTE } from '../../store/constants'

export const NoteWrapper: React.FC<{ note: Note }> = ({ note }) => {
  const noteType = {
    [NoteType.text]: <NoteText note={note as INoteText} />,
    [NoteType.image]: <NoteImage note={note as INoteImage} />,
    [NoteType.list]: <NoteList note={note as INoteList} />,
  }

  return (
    <section
      className={noteCN({ type: note.type, size: note.size })}
      tabIndex={0}
      onClick={() => dispatch({ type: SELECT_NOTE, payload: { note: note } })}
      onKeyDown={event =>
        event.key === 'Enter' &&
        dispatch({ type: SELECT_NOTE, payload: { note: note } })
      }
    >
      {noteType[note.type]}
    </section>
  )
}
NoteWrapper.displayName = 'NoteWrapper'
