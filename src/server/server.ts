import { app } from './app'

app.listen(process.env.PORT || 8000, () => {
  console.log(`Api server listening on port ${process.env.PORT || 8000}!`)
})
