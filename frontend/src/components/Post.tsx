import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackendUrl } from '../lib';
import { useAuth } from '../context/AuthContext';

interface IPost {
  _id: string;
  text: string;
  author: {
    _id: string;
    username: string;
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

const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const {user}=useAuth()

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/v1/post/${postId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
      });
      console.log(response);
      
      setPost(response.data);
      setLoading(false);
    } catch (err:any) {
        console.log(err.response.data.message);;
        
      setError(err.response.data.message||'Failed to fetch post');
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`${BackendUrl}/api/v1/post/${postId}/comments`, {
        text: newComment,},{
            headers:{
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
          });
      console.log(response);
      // response.data.author.username=user.username;
      
      

      // Update the post with the new comment
      setPost((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          comments: [...prevPost.comments, response.data],
        };
      });
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
      
      // Remove the deleted comment from the state
      setPost((prevPost) => {
        if (!prevPost) return null;
        return {
          ...prevPost,
          comments: prevPost.comments.filter((comment) => comment._id !== commentId),
        };
      });
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
    {/* <div>
        {JSON.stringify(post    )}
    </div> */}
      {/* Back Button */}
      <button
        onClick={() => navigate('/posts')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Posts
      </button>

      {/* Post Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <p className="text-xl mb-4">{post.text}</p>
          <div className="text-gray-600">
            Posted by: <span className="font-semibold">{post.author.username}</span>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Comments ({post.comments.length})</h2>
          
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                disabled={!newComment.trim()}
              >
                Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment:any,index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="mb-2">{comment.text}</p>
                    <p className="text-sm text-gray-600">
                      By: <span className="font-semibold">{comment.author.username||user.username}</span>
                    </p>
                  </div>
                  {/* Only show delete button if the current user is the comment author */}
                  {comment.author._id === 'current-user-id' && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;