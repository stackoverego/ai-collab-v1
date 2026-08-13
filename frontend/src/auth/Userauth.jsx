import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/usercontext'

const Userauth = ({ children }) => {

    const { User } = useContext(UserContext)
    const [ loading, setLoading ] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()




    useEffect(() => {
        if (User) {
            setLoading(false)
        }

        if (!token) {
            navigate('/login')
        }

        if (!User) {
            navigate('/login')
        }

    }, [])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <>
            {children}</>
    )
}

export default Userauth