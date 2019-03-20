import * as React from 'react'
import { cn } from '@bem-react/classname'
import './index.scss'
import {
  INoteAttachmentImage,
  INoteAttachmentLink,
  ITag,
  Note,
  NoteAttachmentType,
} from '../../shared'
import { NoteText } from './NoteText'
import { NoteImage } from './NoteImage'
import { NoteList } from './NoteList'
import * as moment from 'moment'
import 'moment/locale/ru'
import { Attachment, AttachmentContainer } from '../Attachment'

export const noteCN = cn('Note')

export const renderReminder = (note: Note) => {
  if (note.reminder) {
    return (
      <header className={noteCN('Reminder')}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.316 2.00522C10.9923 2.03298 10.6698 2.07234 10.3489 2.12322C5.91585 2.86401 2.51834 6.46593 2.0375 10.9347C1.9875 11.3577 1.9875 12.6428 2.0375 13.0648C2.31452 15.3829 3.25956 17.382 4.84464 19.0041C6.47372 20.6692 8.54583 21.6762 10.9349 21.9612C11.357 22.0112 12.643 22.0112 13.0651 21.9612C15.4542 21.6762 17.5263 20.6692 19.1554 19.0041C20.7404 17.382 21.6855 15.3839 21.9625 13.0658C22.0125 12.6427 22.0125 11.3577 21.9625 10.9357C21.6855 8.61755 20.7404 6.61745 19.1554 4.99637C17.5293 3.33428 15.4492 2.32223 13.0751 2.04022C12.4891 2.00376 11.9019 1.99208 11.315 2.00522H11.316ZM11.4528 4.00417C11.1938 4.02638 10.9358 4.05787 10.6791 4.09858C7.13268 4.69121 4.41467 7.57274 4.03 11.1477C3.99 11.4861 3.99 12.5142 4.03 12.8518C4.25161 14.7063 5.00765 16.3056 6.27571 17.6033C7.57898 18.9353 9.23666 19.741 11.148 19.969C11.4856 20.009 12.5144 20.009 12.852 19.969C14.7633 19.741 16.421 18.9353 17.7243 17.6033C18.9923 16.3056 19.7484 14.7071 19.97 12.8526C20.01 12.5142 20.01 11.4861 19.97 11.1485C19.7484 9.29404 18.9923 7.69396 17.7243 6.39709C16.4234 5.06743 14.7593 4.25779 12.86 4.03218C12.3913 4.003 11.9215 3.99366 11.452 4.00417H11.4528ZM13.2505 9.99622V13.9962H10.7485V5.99622H13.2505V9.99622ZM12.3025 15.5522C12.7275 15.6532 13.0895 16.0132 13.2025 16.4492C13.2415 16.6002 13.2415 16.9032 13.2025 17.0552C13.0853 17.4947 12.742 17.838 12.3025 17.9552C12.2365 17.9712 12.1045 17.9852 11.9995 17.9852C11.6455 17.9852 11.3785 17.8742 11.1275 17.6232C10.8881 17.3979 10.757 17.0807 10.7675 16.7522C10.7675 16.4172 10.8755 16.1412 11.1005 15.9042C11.4175 15.5712 11.8505 15.4442 12.3025 15.5522Z"
            fill="white"
          />
        </svg>
        Осталось {moment.unix(note.reminder / 1000).fromNow(true)}
      </header>
    )
  }
}

export const renderAttachments = (note: Note) => {
  const images: INoteAttachmentImage[] = []
  const links: INoteAttachmentLink[] = []

  if (note.attachments) {
    note.attachments.forEach(attachment => {
      attachment.type === NoteAttachmentType.image
        ? images.push(attachment)
        : undefined
      attachment.type === NoteAttachmentType.link
        ? links.push(attachment)
        : undefined
    })

    const renderLinksList = () => {
      return links.reduce(
        (previousValue, currentValue, currentIndex) => {
          previousValue.push(currentValue)

          if (
            (currentIndex !== 0 || links.length > 1) &&
            currentIndex % 2 === 0
          ) {
            previousValue.push({
              type: NoteAttachmentType.sep,
              url: currentIndex,
            })
          }
          return previousValue
        },
        [] as Array<
          INoteAttachmentLink | { type: NoteAttachmentType.sep; url: number }
        >
      )
    }

    return (
      <footer className={noteCN('Attachments')}>
        {images.length > 0 && (
          <AttachmentContainer type={NoteAttachmentType.image}>
            {images.map(image => (
              <Attachment attachment={image} key={image.url} />
            ))}
          </AttachmentContainer>
        )}
        {links.length > 0 && (
          <AttachmentContainer type={NoteAttachmentType.link}>
            {renderLinksList().map(link => (
              <Attachment attachment={link} key={link.url} />
            ))}
          </AttachmentContainer>
        )}
      </footer>
    )
  }
}

export const renderTags = (note: Note, tags: ITag[]) => {
  return note.tags ? (
    <div className={noteCN('TagList')}>
      {note.tags.map(tag => {
        const finedTag = tags.find(t => t.id === tag)
        return finedTag ? (
          <span className={noteCN('Tag')} key={finedTag.id}>
            {finedTag.tag}
          </span>
        ) : (
          undefined
        )
      })}
    </div>
  ) : (
    undefined
  )
}

export const renderTimestamp = (note: Note) => {
  return (
    <p className={noteCN('Timestamp')}>
      {moment.unix(note.created / 1000).fromNow()}
    </p>
  )
}

export const renderActions = (note: Note) => {
  return (
    <div className={noteCN('Actions')}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        fillOpacity="0.3"
      >
        <path
          d="M14.623 0L5.473 13.174L1.186 8.574L0 10.03L5.62 16L16 1.27L14.623 0Z"
          fill="black"
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        fillOpacity="0.3"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.561 14.9985H1.31924C1.14293 14.9985 1 14.8596 1 14.6793V12.4375C1 12.2612 1.10063 12.0176 1.2215 11.8968L9.73926 3.379C9.86159 3.25667 10.0633 3.26001 10.1868 3.3835L12.615 5.81173C12.7398 5.93655 12.7404 6.13837 12.6195 6.25924L4.10175 14.777C3.97942 14.8993 3.74133 14.9985 3.561 14.9985ZM14.0238 4.85498C13.9038 4.97491 13.6999 4.97647 13.5751 4.85165L11.1469 2.42342C11.0234 2.29992 11.0205 2.09772 11.1435 1.97474L11.8809 1.23733C12.2138 0.924376 12.5334 0.917422 12.841 1.23733L14.7612 3.1575C15.0849 3.47776 15.074 3.80892 14.7612 4.11758L14.0238 4.85498Z"
          fill="black"
        />
      </svg>
    </div>
  )
}

export { NoteText, NoteList, NoteImage }
