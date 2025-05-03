import React, { useState, useEffect } from 'react';

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Dummy pet friend data
    const dummyPets = [
      {
        name: 'Buddy 🐶',
        avatar: 'https://placedog.net/80/80?id=1',
      },
      {
        name: 'Whiskers 🐱',
        avatar: 'https://placekitten.com/80/80',
      },
      {
        name: 'Charlie 🐶',
        avatar: 'https://placedog.net/80/80?id=2',
      },
      {
        name: 'Mittens 🐱',
        avatar: 'https://placekitten.com/81/80',
      },
      {
        name: 'Rex 🐾',
        avatar: 'https://placedog.net/80/80?id=3',
      },
    ];

    setFriends(dummyPets);
  }, []);

  const handleClick = (friend) => {
    alert(`You clicked on ${friend.name}`);
  };

  return (
    <div className="w-64 bg-white p-4 shadow-md h-screen sticky top-0">
      <h2 className="text-lg font-semibold mb-4">Pet Friends</h2>
      <ul className="space-y-2">
        {friends.map((friend, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer"
            onClick={() => handleClick(friend)}
          >
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
