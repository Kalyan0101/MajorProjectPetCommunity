import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/notifications");
  //       setNotifications(res.data);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      <ul className="space-y-2 text-gray-700 text-sm">
        {notifications.length > 0 ? (
          notifications.map((note, idx) => <li key={idx}>{note.message}</li>)
        ) : (
          <li className="text-gray-500">No notifications yet.</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationPanel;
