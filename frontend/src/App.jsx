import React from 'react'
import Approutes from './routes/approutes'
import UserContextProvider from './context/usercontext'

const App = () => {
  return (
    <UserContextProvider>
      <Approutes/>
    </UserContextProvider>
  )
}

export default App