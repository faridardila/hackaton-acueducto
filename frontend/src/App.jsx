import React, { useState } from 'react'
import { MobileHome } from './Components/CommonUserView'
import Dashboard from './Components/OperatorView/Dashboard'

function App() {
  const [view, setView] = useState('common') 
  return (
    <>
      <button onClick={() => setView('common')}>Usuario</button>
      <button onClick={() => setView('operator')}>Operador</button>

      {view === 'common' ? <MobileHome /> : <Dashboard />}
    </>
  )
}

export default App