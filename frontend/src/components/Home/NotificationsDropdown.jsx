import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md w-80 absolute right-4 top-16 z-50 p-4">
      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <li key={note.id} className="text-sm py-2 border-b">
              <div className="font-medium">{note.message}</div>
              <div className="text-gray-400 text-xs">{note.time}</div>
            </li>
          ))
        ) : (
          <li className="text-sm py-2">No notifications yet.</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationsDropdown;
