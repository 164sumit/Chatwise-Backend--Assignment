import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { BackendUrl } from '../lib';

const UserDashboard = () => {
    const { user } = useAuth();
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchFriendRequests();
    }, []);

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/v1/friendrequests/friend/${user._id}`,{
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            setFriendRequests(response.data.friendRequests);
        } catch (error) {
            console.error('Error fetching friend requests', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/v1/friendrequests/search?query=${searchQuery}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            setSearchResults(response.data.users);
        } catch (error) {
            console.error('Error searching friends', error);
        }
    };

    const handleFriendRequestAction = async (requestId:string, action:string) => {
        try {
            const url = `${BackendUrl}/api/v1/friendrequests/${action}/${requestId}`;
            const response = await axios.put(url, {}, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            fetchFriendRequests();
            alert(response.data.message);
        } catch (error) {
            console.error(`Error ${action === 'accept' ? 'accepting' : 'rejecting'} friend request`, error);
        }
    };

    const sendFriendRequest = async (requestId:string) => {
        try {
            const response = await axios.post(`${BackendUrl}/api/v1/friendrequests/send`, { receiverId: requestId }, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
        } catch (error) {
            console.error('Error sending friend request', error);
        }
    };

    return (
        <div className="dashboard p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome, {user.username}</h1>

            <div className="search-friends mb-6">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { handleSearch(); } }}
                        placeholder="Search friends by username or email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Search
                    </button>
                </div>
                <div className="mt-4">
                    {searchResults.map((result:any) => (
                        <div key={result._id} className="search-result p-4 bg-white shadow-md rounded-md mb-4 flex items-center justify-between">
                            <p>{result.username} ({result.email})</p>
                            <button onClick={() => sendFriendRequest(result._id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Send Friend Request
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Friends</h2>
                {friendRequests.filter((request:any) => request.status === 'accepted').map((request:any) => (
                    <div key={request._id} className="friend-request p-4 bg-white shadow-md rounded-md mb-4">
                        <p>{request.sender.username}</p>
                    </div>
                ))}
            </div>

            <div className="friend-requests mt-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Friend Requests</h2>
                {friendRequests.filter((request:any) => request.status === 'pending' && request.sender._id !== user._id).map((request:any) => (
                    <div key={request._id} className="friend-request p-4 bg-white shadow-md rounded-md mb-4 flex items-center justify-between">
                        <p>{request.sender.username} wants to be your friend.</p>
                        <div className="flex space-x-2">
                            <button onClick={() => handleFriendRequestAction(request._id, 'accept')} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                Accept
                            </button>
                            <button onClick={() => handleFriendRequestAction(request._id, 'reject')} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
