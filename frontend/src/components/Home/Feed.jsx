import React from 'react';

const Feed = () => (
  <div className="space-y-4">
    {[1, 2, 3].map(post => (
      <div key={post} className="bg-white p-4 shadow rounded">
        <h4 className="font-semibold">PetPost #{post}</h4>
        <p>This is a cute pet moment shared by someone.</p>
      </div>
    ))}
  </div>
);

export default Feed;
