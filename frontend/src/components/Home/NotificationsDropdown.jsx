import React from 'react';

const NotificationsDropdown = () => {
  const notifications = [
    { id: 1, message: 'Toby got a new friend!', time: '2m ago' },
    { id: 2, message: 'You received 2 likes on your post.', time: '10m ago' },
  ];

  return (
    <div className="bg-white shadow-md rounded-md w-80 absolute right-4 top-16 z-50 p-4">
      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
      <ul>
        {notifications.map((note) => (
          <li key={note.id} className="text-sm py-2 border-b">
            <div className="font-medium">{note.message}</div>
            <div className="text-gray-400 text-xs">{note.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsDropdown;
