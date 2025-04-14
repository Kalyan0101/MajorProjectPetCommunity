import React, { useState } from 'react';

const Feed = () => {
  const [likes, setLikes] = useState([0, 0, 0]); // for 3 sample posts

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index]++;
    setLikes(newLikes);
  };

  return (
    <div className="space-y-4">
      {[1, 2, 3].map((post, i) => (
        <div key={post} className="bg-white p-4 shadow rounded">
          <h4 className="font-semibold mb-1">🐶 PetPost #{post}</h4>
          <p className="text-gray-700 mb-2">This is a cute pet moment shared by someone.</p>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleLike(i)} 
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
