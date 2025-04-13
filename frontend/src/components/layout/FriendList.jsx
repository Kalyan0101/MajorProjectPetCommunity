import React from 'react';

const FriendList = () => {
  const friends = ['Alice', 'Debangan', 'Sourindra'];

  return (
    <div className="w-64 bg-white p-4 shadow-md h-screen sticky top-0">
      <h2 className="text-lg font-semibold mb-4">Friends</h2>
      <ul className="space-y-2">
        {friends.map((friend, index) => (
          <li key={index} className="hover:text-blue-500 cursor-pointer">
            {friend}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
