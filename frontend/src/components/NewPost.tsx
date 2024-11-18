import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackendUrl } from '../lib';



const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const [postText, setPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation=useNavigate()

  // Handle post submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postText.trim()) {
      setError('Post text is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const {data} = await axios.post(`${BackendUrl}/api/v1/post`, {
        text: postText,
      },{
        headers:{
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
      });
      if(data.success) {
        alert('Post successfully created');
        setPostText('')

      }
      else{
        alert('Failed to create post. Please try again.');
      }

      setPostText('');
      
      
      
      navigate('/posts'); // Redirect to posts page after successful creation
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Text Input */}
          <div className="mb-6">
            <label 
              htmlFor="postText" 
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              What's on your mind?
            </label>
            <textarea
              id="postText"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] resize-none"
              placeholder="Share your thoughts..."
              maxLength={500} // Optional: add maximum character limit
            />
            {/* Optional: Character count */}
            <div className="text-sm text-gray-500 text-right mt-1">
              {postText.length}/500 characters
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/posts')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !postText.trim()}
              className={`px-6 py-2 rounded-lg text-white ${
                isLoading || !postText.trim()
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Posting...
                </div>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;