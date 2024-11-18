import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { BackendUrl } from '../lib';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

interface IPost {
  _id: string;
  text: string;
  author: {
    _id: string;
    name: string;
  };
  comments: IComment[];
}

interface IComment {
  _id: string;
  text: string;
  author: {
    _id: string;
    name: string;
  };
}
const Posts: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {user}=useAuth()
  const navigate=useNavigate()
    useEffect(() => {
      fetchPosts();
    }, [user]);
  
    const fetchPosts = async () => {
      try {
       
    
    const {data}=await axios.post(`${BackendUrl}/api/v1/feed`,{
        userId:user._id,
      },{
        headers:{
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
      });
    
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-3xl font-bold">Posts</h1> */}
        <h1 className="text-3xl font-bold mb-6">Posts: {posts?posts.length:0}</h1>
        <button
          onClick={() => navigate('/addfeed')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Post
        </button>
      </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <p className="text-lg mb-2">{post.text}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  {/* <span>By: {post.author.name}</span> */}
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default Posts;