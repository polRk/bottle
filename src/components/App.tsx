import * as React from 'react'
import { Main } from './Main'
import { Header } from './Header'
import { cn } from '@bem-react/classname'
import { Footer } from './Footer'

const appCN = cn('App')

const App: React.FC = () => {
  return (
    <div className={appCN()}>
      <div className={appCN('Header')}>
        <Header />
      </div>
      <div className={appCN('Main')}>
        <Main />
      </div>
      <div className={appCN('Footer')}>
        <Footer />
      </div>
    </div>
  )
}

export default App
