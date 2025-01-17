import {createContext, useEffect, useState} from 'react';

import axios from 'axios'
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';
export const AppContext = createContext();


export const AppContextProvider =(props)=>{
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const {user} = useUser()
    const {getToken} =useAuth()
    
    const [searchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })
    const [isSearched,setIsSearched]= useState(false)
    const [jobs,setJobs]=useState([])
    const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    const [companyToken,setCompanyToken] =useState(null)
    const [companyData,setCompanyData] =useState(null)
    const [userData,setUserData]=useState(null)
    const [userApplication,setUserApplication]= useState([])

    //Function to fetch jobs
    const fetchJobs = async ()=>{
        try {
            const  {data} =await axios.get(backend_url+'/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    

    
    //function to fetch company data
    const fetchCompanyData = async ()=>{
        try {
            const {data} = await axios.get(backend_url+'/api/company/company',{headers:{token:companyToken}})
            if (data.success) {
                setCompanyData(data.company)
                console.log(data);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to fetch user data
    const fetchUserData= async ()=>{
        try {
            const token = await getToken();
            const {data}= await  axios.get(backend_url+'/api/user/user',{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to fetch user's applied application data
    const fetchUserApplications =async ()=>{
        
        try {
            const token = await getToken()
            const {data}= await axios.get(backend_url+'/api/user/applications',{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                setUserApplication(data.applications)
            }else{
                toast.error(data.message)
            }    
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchJobs()

        const storedToken = localStorage.getItem('companyToken')
        if (storedToken) {
            setCompanyToken(storedToken)
        }
    },[])
    useEffect(()=>{
        fetchCompanyData()
    },[companyToken])

    useEffect(()=>{
        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    },[user])
    const value ={
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,backend_url,
        userData,setUserData,userApplication,setUserApplication,fetchUserData,
        fetchUserApplications
    }

    return <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
}


