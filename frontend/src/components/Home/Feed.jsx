// components/Home/Feed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = ({ posts }) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    setLikes(posts.map(post => post.likes || 0)); // Set like count from passed posts
  }, [posts]);

  const handleLike = async (index, postId) => {
    const newLikes = [...likes];
    newLikes[index]++;
    setLikes(newLikes);

    try {
      await axios.patch(`http://localhost:5000/api/posts/${postId}/like`);
    } catch (error) {
      console.error('Failed to update like count:', error);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div key={post._id} className="bg-white p-4 shadow rounded">
          <h4 className="font-semibold mb-1">🐶 {post.caption || 'PetPost'}</h4>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Pet"
              className="w-full h-auto max-h-64 object-cover rounded mb-2"
            />
          )}
          <p className="text-gray-700 mb-2">{post.description || 'This is a cute pet moment shared by someone.'}</p>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleLike(i, post._id)} 
              className="text-blue-500 hover:underline text-sm"
            >
              ❤️ Like
            </button>
            <span className="text-gray-600 text-sm">{likes[i]} likes</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
