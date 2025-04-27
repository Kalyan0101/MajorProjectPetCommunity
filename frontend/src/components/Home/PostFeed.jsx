import React from 'react';
import Feed from './Feed';

const PostFeed = () => {
  return (
    <div className="max-w-2xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold mb-6">Your Feed</h2>
      <Feed />
    </div>
  );
};

export default PostFeed;
