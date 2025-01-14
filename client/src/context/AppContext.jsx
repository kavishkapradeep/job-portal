import {createContext, useEffect, useState} from 'react';
import { jobsData } from '../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify';
export const AppContext = createContext();


export const AppContextProvider =(props)=>{

    
    const [searchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })
    const [isSearched,setIsSearched]= useState(false)
    const [jobs,setJobs]=useState([])
    const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    const [companyToken,setCompanyToken] =useState(null)
    const [companyData,setCompanyData] =useState(null)
    
    const backend_url = import.meta.env.VITE_BACKEND_URL
    //Function to fetch jobs
    const fetchJobs = async ()=>{
        setJobs(jobsData)
    }
    

    useEffect(()=>{
        fetchJobs()

        const storedToken = localStorage.getItem('companyToken')
        if (storedToken) {
            setCompanyToken(storedToken)
        }
    },[])
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

    useEffect(()=>{
        fetchCompanyData()
    },[companyToken])
    const value ={
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,backend_url
    }

    return <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
}


