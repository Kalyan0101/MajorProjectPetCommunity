import React from "react";

const NotificationPanel = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      <ul className="space-y-2 text-gray-700 text-sm">
        <li>🐶 Max liked your post!</li>
        <li>🐾 Bella sent you a friend request</li>
        <li>🐱 Whiskers commented on your photo</li>
        <li>📅 Join the Puppy Yoga Event tomorrow</li>
      </ul>
    </div>
  );
};

export default NotificationPanel;
