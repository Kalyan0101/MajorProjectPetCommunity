import React from "react";

const MessagesPanel = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Messages</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-medium">John & Luna 🐶</p>
          <span className="text-sm text-gray-500">2 mins ago</span>
        </div>
        <div className="text-sm text-gray-600">Hey! Let's plan a dog walk 🐾</div>
        <hr />
        <div className="flex items-center justify-between">
          <p className="font-medium">Mia & Fluffy 🐱</p>
          <span className="text-sm text-gray-500">10 mins ago</span>
        </div>
        <div className="text-sm text-gray-600">See the new catnip toy?</div>
      </div>
    </div>
  );
};

export default MessagesPanel;
