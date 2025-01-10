import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ViewApplication from './pages/ViewApplication'
import ManageJobs from './pages/ManageJobs'
import 'quill/dist/quill.snow.css'

const App = () => {
  const {showRecruiterLogin}= useContext(AppContext)
  return (
    <div  >
      {showRecruiterLogin &&<RecruiterLogin/>}
      
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/apply-job/:id' element={<Applyjob/>}/>
          <Route path='/applications' element={<Application/>}/>
          <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='view-applications' element={<ViewApplication/>}/>
          <Route path='manage-jobs' element={<ManageJobs/>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default App
