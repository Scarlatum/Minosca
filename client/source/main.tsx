import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

import { CanvasComponent } from '~/views/canvas/canvas.component'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CanvasComponent backgroundColor='black' width={ 400 } height={ 400 }/>
  </React.StrictMode>
)
