import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { IColor, ITag, Note, Notes } from '../shared'

export const app = express()
const api = express.Router()

const data: {
  notes: Note[]
  colors: IColor[]
  tags: ITag[]
} = require('./input.json')
const notes = new Notes(Notes.factory(data.notes))

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use('/api/*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

api.get('/', (req, res) => {
  res.json({
    notes: '/api/notes',
    colors: '/api/colors',
    tags: '/api/tags',
  })
})

api.get('/colors', (req, res) => {
  res.json(data.colors)
})

api.get('/tags', (req, res) => {
  res.json(data.tags)
})

api.get('/notes/:id', (req, res) => {
  const { id } = req.params

  const note = notes.toArray().find(c => c.id === parseInt(id))

  if (note) {
    return res.json(note)
  }
  return res.sendStatus(404)
})

api.get('/notes', (req, res) => {
  const { color, archived } = req.query
  if (color && !data.colors.find(c => c.id == color)) {
    res.status(400).json({ message: 'Incorrect color' })
  } else {
    let filteredByArchived = archived
      ? notes.filter(note => note.archived || false)
      : notes

    let filteredByColor = color
      ? filteredByArchived.filter(note => note.color == color)
      : filteredByArchived

    res.json(filteredByColor.toArray())
  }
})

api.post('/notes', (req, res) => {
  const note: Note = Object.assign({}, req.body, req.params, req.query)
  const newNote = notes.addNote(note)
  res.send(newNote)
})

api.delete('/notes/:id', (req, res) => {
  if (notes.deleteNote(parseInt(req.params.id))) {
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

api.patch('/notes/:id', (req, res) => {
  const note: Note = Object.assign({}, req.body, req.params, req.query)
  delete note.id

  if (notes.updateNote(parseInt(req.params.id), note)) {
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

app.use('/api', api, (req, res) => {
  res.statusCode = 404
  res.send(`<h1>Page not found</h1>`)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
