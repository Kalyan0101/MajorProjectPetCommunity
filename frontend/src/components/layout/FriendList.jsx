import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  // useEffect(() => {
  //   // Fetch friend list from API when component mounts
  //   axios.get('https://api.example.com/friends') // Replace with your API URL
  //     .then((response) => {
  //       setFriends(response.data); // Assuming the API response is an array of friends
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the friend list:", error);
  //     });
  // }, []);

  const handleClick = (friend) => {
    alert(`You clicked on ${friend.name}`);
  };

  return (
    <div className="w-64 bg-white p-4 shadow-md h-screen sticky top-0">
      <h2 className="text-lg font-semibold mb-4">Friends</h2>
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
              className="w-8 h-8 rounded-full"
            />
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
