import React from 'react';

const CreatePost = () => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <textarea placeholder="What's on your mind?" className="w-full p-2 border rounded mb-2"></textarea>
    <button className="bg-blue-600 text-white px-4 py-1 rounded">Post</button>
  </div>
);

export default CreatePost;
