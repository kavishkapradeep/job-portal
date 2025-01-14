import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLevel, JobLocations } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddJob = () => {
  const [title,setTitle] =useState('')
  const [location,setLocation] =useState('Bangalore')
  const [category,setCategory] =useState('Programming')
  const [level,setLevel] =useState('Beginner Level')
  const [salary,setSalary] =useState(0)


  const editRef =useRef(null)
  const quillRef =useRef(null)
  const {backend_url,companyToken}=useContext(AppContext)

  
  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    try {
      const description =quillRef.current.root.innerHTML
      const {data}= await axios.post(backend_url+'/api/company/post-job',{title,description,salary,level,location,category},
        {headers:{token:companyToken}}
      )
      if (data.success) {
        toast.success(data.message),
        setTitle(''),
        setSalary(0),
        quillRef.current.root.innerHTML =""
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
     if (!quillRef.current &&editRef.current) {
        quillRef.current = new Quill(editRef.current,{
            theme:'snow'
        })
     }
  },[])  
  return (
        
    <form onSubmit={onSubmitHandler} className=' container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input type="text" placeholder='Title' onChange={e=>setTitle(e.target.value)} value={title} required
        className=' w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'/>
      </div>
      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div ref={editRef}></div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
         <div >
            <p className=' mb-2'>Job Category</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setCategory(e.target.value)}>
                {
                    JobCategories.map((category,index)=>(
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
         </div>
         <div>
            <p className=' mb-2'>Job Location</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLocation(e.target.value)}>
                {
                    JobLocations.map((location,index)=>(
                        <option key={index} value={location}>{location}</option>
                    ))
                }
            </select>
         </div>
         <div>
            <p className=' mb-2'>Job Level</p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLevel(e.target.value)}>
                {
                    JobLevel.map((level,index)=>(
                        <option key={index} value={level}>{level}</option>
                    ))
                }
            </select>
         </div>
      </div>
      <div>
        <p className=' mb-2'> Job Salary</p>
        <input min={0} className='w-full px-3 py-2 border-2 border-gray-300  rounded sm:w-[120px]' type="Number" required placeholder='2500' onChange={e=>setSalary(e.target.value)}  />
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>Add</button>
    </form>
  )
}

export default AddJob
