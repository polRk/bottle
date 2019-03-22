import * as request from 'supertest'
import { app } from '../server/app'
import { INoteText, NoteType } from '../shared'

let testNote: INoteText = {
  created: Date.now(),
  color: 0,
  tags: [],
  type: NoteType.text,
  text: 'New text',
}

describe('Api', () => {
  test('It should response all GET methods', async () => {
    const response = await request(app).get('/api')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      notes: '/api/notes',
      colors: '/api/colors',
      tags: '/api/tags',
    })
  })

  test('it should response 404 Page not found', async () => {
    const response = await request(app).get(`/api/${Math.random()}`)

    expect(response.status).toBe(404)
    expect(response.text).toBe('<h1>Page not found</h1>')
  })

  test('It should response all notes', async () => {
    const response = await request(app).get('/api/notes')

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          text: expect.any(String),
          created: expect.any(Number),
        }),
      ])
    )
  })

  test('It should response the card with ID', async () => {
    const newNote = (await request(app)
      .post('/api/notes')
      .send({
        created: Date.now(),
        color: 0,
        tags: [],
        type: NoteType.text,
        text: 'New text',
      })).body

    const response = await request(app).get(`/api/notes/${newNote.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(newNote)
  })

  test('It should create a note', async () => {
    const response = await request(app)
      .post('/api/notes')
      .send(testNote)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({ ...testNote, id: expect.any(Number) })
  })

  test('It should update a note', async () => {
    const newRequest = await request(app)
      .post('/api/notes')
      .send(testNote)
    const newNote: INoteText = newRequest.body

    const newText = 'New text 2'

    const response = await request(app)
      .patch(`/api/notes/${newNote.id}`)
      .send({ ...newNote, text: newText })
      .set('Accept', 'application/json')

    const checkRequest = await request(app).get(`/api/notes/${newNote.id}`)
    const checkNote: INoteText = checkRequest.body

    expect(response.status).toBe(200)
    expect(checkNote.text).not.toBe(newNote.text)
    expect(checkNote.text).toBe(newText)
  })

  test('It should delete a note', async () => {
    const newRequest = await request(app)
      .post('/api/notes')
      .send(testNote)
    const newNote: INoteText = newRequest.body

    const response = await request(app).delete(`/api/notes/${newNote.id}`)
    const checkRequest = await request(app).get(`/api/notes/${newNote.id}`)

    expect(response.status).toBe(200)
    expect(checkRequest.status).toBe(404)
  })
})
