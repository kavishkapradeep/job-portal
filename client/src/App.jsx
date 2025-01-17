import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Applyjob from './pages/Applyjob'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ViewApplication from './pages/ViewApplication'
import ManageJobs from './pages/ManageJobs'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const {showRecruiterLogin,companyToken}= useContext(AppContext)
  return (
    <div  >
      {showRecruiterLogin &&<RecruiterLogin/>}
      <ToastContainer/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/apply-job/:id' element={<Applyjob/>}/>
          <Route path='/applications' element={<Application/>}/>
          <Route path='/dashboard' element={<Dashboard/>}>
            {companyToken? <>
            <Route path='add-job' element={<AddJob/>}/>
            <Route path='view-applications' element={<ViewApplication/>}/>
            <Route path='manage-jobs' element={<ManageJobs/>}/>
            </>
            :<></>}
          </Route>
      </Routes>
    </div>
  )
}

export default App
