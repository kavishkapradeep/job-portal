import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const ManageJobs = () => {

  const navigate = useNavigate();
  const [jobs,setJobs] =useState([])
  const {backend_url,companyToken}= useContext(AppContext)

  const fetchCompanyData = async ()=>{
    try {
      const {data} =await axios.get(backend_url+'/api/company/list-jobs',{headers:{token:companyToken}})
      if (data.success) {
          setJobs(data.jobsData.reverse())
          console.log(data.jobsData);
          
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  //change visibility
  const changeVisibility = async (id)=>{
    try {
      const {data} =await axios.post(backend_url+"/api/company/change-visibility",{id},
        {headers:{token:companyToken}}
      )
      if (data.success) {
          toast.success(data.message)
          fetchCompanyData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
useEffect(()=>{
  if (companyToken) {
    fetchCompanyData()  
  }
  
},[companyToken])
  return (
    <div className=' container p-4 max-w-5xl'>
      <div className=' overflow-x-auto'>
        <table className=' min-w-full bg-white border border-gray-200 max-sm:text-sm'>
            <thead>
            <tr>
                <th className=' py-2 px-4 border-b text-left max-sm:hidden'>#</th>
                <th className=' py-2 px-4 border-b text-left'>Job Title</th>
                <th className=' py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
                <th className=' py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
                <th className=' py-2 px-4 border-b text-left'>Applicants</th>
                <th className=' py-2 px-4 border-b text-left'>Visible</th>
            </tr>
            </thead>
            <tbody>
                 {jobs.map((job,index)=>(
                  <tr key={index} className=' text-gray-700'>
                      <td className=' py-2 px-4 border-b text-left max-sm:hidden'>{index+1}</td>
                      <td className=' py-2 px-4 border-b text-left'>{job.title}</td>
                      <td className=' py-2 px-4 border-b text-left max-sm:hidden'>{moment(job.date).fromNow('ll')}</td>
                      <td className=' py-2 px-4 border-b text-left max-sm:hidden'>{job.location}</td>
                      <td className=' py-2 px-4 border-b  text-center'>{job.applicants}</td>
                      <td className=' py-2 px-4 border-b text-left'>
                        <input onChange={()=>changeVisibility(job._id)} type="checkbox" className=' scale-125 ml-4'  checked={job.visible}/>
                      </td>
                  </tr>
                 ))

                 }
            </tbody>
        </table>
      </div>
                 <div className='mt-4 flex justify-end'>
                   <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>ADD New Job</button>
                 </div>
    </div>
  )
}

export default ManageJobs
