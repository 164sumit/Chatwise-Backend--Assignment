import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginPage from './components/Login'
import SignUpPage from './components/Signup'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Posts from './components/Posts'
import Header from './components/Header'
import NewPost from './components/NewPost'
import Post from './components/Post'
import UserDashboard from './components/UserDashboard'

const App = () => {
  return (
    <div>
      <AuthProvider>

      <BrowserRouter>
        <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/Posts" element={<ProtectedRoute><Posts/></ProtectedRoute>} />
        <Route path="/Post/:postId" element={<ProtectedRoute><Post/></ProtectedRoute>} />
        <Route path="/addfeed" element={<ProtectedRoute><NewPost/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
       

      </Routes>
    </BrowserRouter>
    </AuthProvider>

    </div>
  )
}

export default App