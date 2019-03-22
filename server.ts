import * as express from 'express'
import * as path from 'path'
import { IColor, ITag, Note, Notes } from './src/shared'

const app = express()
const api = express.Router()
const data: {
  notes: Note[]
  colors: IColor[]
  tags: ITag[]
} = require('./input.json')
const notes = new Notes(Notes.factory(data))

app.use(express.static('dist'))
app.use('/api/*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

api.get('/cards', (req, res) => {
  const { color, archived } = req.query
  if (color && !data.colors.find(c => c.id == color)) {
    res.status(400).json({ message: 'Incorrect color' })
  } else {
    let filteredByAcrhived = archived
      ? notes.filter(note => note.archived)
      : notes

    let filteredByColor = color
      ? filteredByAcrhived.filter(note => note.color == color)
      : filteredByAcrhived

    res.json(filteredByColor)
  }
})

api.post('/cards', (req, res) => {
  const note: Note = Object.assign({}, req.body, req.params, req.query)
  res.send({
    note: notes.addNote(note),
  })
})

api.delete('/cards/:id', (req, res) => {
  const noteInd = notes.findIndex(note => note.id === parseInt(req.params.id))

  if (noteInd > -1) {
    notes.splice(noteInd, 1)
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

api.patch('/cards/:id', (req, res) => {
  const noteInd = notes.findIndex(note => note.id === req.params.id)
  if (noteInd > -1) {
    notes[noteInd] = req.body
    res.sendStatus(200)
  } else {
    res.sendStatus(404)
  }
})

app.use('/api', api)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(8000)
