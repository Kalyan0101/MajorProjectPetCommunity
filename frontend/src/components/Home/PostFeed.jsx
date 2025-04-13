import React from 'react';

const dummyPosts = [
  {
    id: 1,
    caption: 'Bruno enjoyed his first bath!',
    image: '/bruno_bath.jpg',
    author: 'Alice & Bruno',
  },
  {
    id: 2,
    caption: 'Lazy Sunday vibes with Snow.',
    image: '/snow_lazy.jpg',
    author: 'Debangan & Snow',
  },
];

const PostFeed = () => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Post Feed</h2>
      {dummyPosts.map((post) => (
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
      ))}
    </div>
  );
};

export default PostFeed;
