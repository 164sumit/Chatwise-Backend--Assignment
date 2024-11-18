// import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const {logout, user,isAuthenticated} = useAuth()
    const navigation = useNavigate()

    // Function to get initials from name
    const getInitials = (name:string) => {
        if (!name) return "U";  // Default initial if no name
        const nameParts = name.split(" ");
        if (nameParts.length === 1) {
            return name.charAt(0).toUpperCase();
        }
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }

    return (
        <div className='flex flex-row justify-around items-center py-3 bg-[#E6E6E6]'>
            <h1 onClick={() => navigation('/posts')} className='text-3xl text-[#2B3D46] font-semibold cursor-pointer hover:text-orange-700'>
                Chatwise
            </h1>
            {isAuthenticated&&<Link to={'/addfeed'}>
                <h1 className='text-3xl text-[#2B3D46] font-semibold cursor-pointer hover:text-orange-700'>
                    Add Feeds
                </h1>
            </Link>}
            {isAuthenticated&&<div className='flex items-center gap-4'>
                
                <h1 
                    className='text-3xl text-[#2B3D46] font-semibold cursor-pointer hover:text-orange-700'
                    onClick={() => {
                        localStorage.removeItem('token');
                        logout();
                        navigation('/login')
                    }}
                >
                    Logout
                </h1>
                <div onClick={() => navigation('/profile')} className='w-10 h-10 rounded-full bg-[#2B3D46] text-white flex items-center justify-center cursor-pointer font-semibold'>
                    {getInitials(user?.username)}
                </div>
                <h1 
                    className='text-3xl text-[#2B3D46] font-semibold cursor-pointer hover:text-orange-700'
                    onClick={() => {
                       
                        navigation('/profile')
                    }}
                >
                    Profile
                </h1>
            </div>}
        </div>
    )
}

export default Header