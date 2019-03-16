import * as React from 'react'
import { render } from 'react-dom'
import { GlobalStateProvider } from './store'
import App from './components/App'

render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root')
)
