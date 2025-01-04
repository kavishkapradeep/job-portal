import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Application from './pages/Application'

const App = () => {
  return (
    <div  >
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/apply-job/:id' element={<Applyjob/>}/>
          <Route path='/applications' element={<Application/>}/>
      </Routes>
    </div>
  )
}

export default App
