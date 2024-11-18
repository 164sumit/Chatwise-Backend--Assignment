"use client"
import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { LoginUser } from '@/actions/user.action';
import { useRouter } from 'next/navigation';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Router=useRouter();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call API to login user
    const response =await LoginUser({email,password});
    if(response.message ==='Logged in successfully'){
        alert(response.message);
        // Redirect to dashboard page
        localStorage.setItem('token',response.token);
        Router.push('/posts');

    }
    else{
        alert(response.message);
    }
    console.log(response);
    
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <div className="max-w-md p-4 rounded-lg shadow-md bg-white md:px-8 lg:px-12 xl:px-16">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="mt-4">
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
