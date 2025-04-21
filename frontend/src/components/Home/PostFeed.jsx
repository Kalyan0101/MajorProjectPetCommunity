import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Replace with your API endpoint
        setPosts(response.data); // Assuming the response is an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Post Feed</h2>
      
      {loading ? (
        <p>Loading posts...</p> // Loading indicator
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded shadow p-4 mb-4">
            <p className="text-gray-800 font-medium">{post.author}</p>
            <p className="text-gray-600">{post.caption}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-auto rounded mt-2"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostFeed;
