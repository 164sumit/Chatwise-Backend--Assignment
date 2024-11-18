import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BackendUrl } from '../lib';


const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation=useNavigate();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call API to sign up user
    const response=await fetch(`${BackendUrl}/api/v1/user/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
    // console.log(await response.json());
    // console.log(response);
    const data=await response.json();
    if(response.status===201){
      alert("User registered successfully");
      navigation("/login");
    }
    else if(response.status===500){
      alert(data.message)
    }
    else{
      alert("Somting went wrong on registration");
    }
    
    
    // const {data} =await axios.post(`${BackendUrl}/api/v1/user/register`,{
    //   username,
    //   password,
    //   email,
    // });
    // console.log(data)
    // if(response.status===201){
    //   alert("User registered successfully");
    //   navigation("/login");
    // }
    // else if(response.status===500){
    //   alert(response.data.message);
    // }
    
    // alert(response.data.message);
    // if(response.statusText==="Created"){
    //   navigation("/login");
      
    // }
    // else{
    //   alert("Failed to register user");
    // }
   
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <head>
        <title>Sign Up</title>
      </head>
      <div className="max-w-md p-4 rounded-lg shadow-md bg-white md:px-8 lg:px-12 xl:px-16">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full p-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full p-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full p-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="block w-full p-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
