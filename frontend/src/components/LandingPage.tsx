
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const LandingPage: NextPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Head>
        <title>Social Media App</title>
      </Head>
      <div className="max-w-md p-4 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-bold text-gray-700">Welcome to Social Media App</h1>
        <p className="text-lg text-gray-600">Join our community and connect with others!</p>
        <div className="flex justify-center mt-4">
          <Link href="/signup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </Link>
          <Link href="/login" className="ml-4">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
