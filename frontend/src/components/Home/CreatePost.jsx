// components/Home/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ addPost }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption && !image) {
      alert('Please add a caption or an image.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    if (image) {
      formData.append('image', image);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="What's on your pet's mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
