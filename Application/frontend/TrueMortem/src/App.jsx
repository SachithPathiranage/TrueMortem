import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = () => {
  return (
    <div>
      <h2>Card Component</h2>
    </div>
  )
}

const App = () => {
  return (
    <div><h2>Functional</h2>
      <Card />
      <Card />

    </div>
  )
}

export default App

