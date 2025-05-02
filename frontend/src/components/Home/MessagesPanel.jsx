import React, { useEffect, useState } from "react";
import axios from "axios";

const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/messages");
  //       setMessages(res.data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   fetchMessages();
  // }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Messages</h2>
      <div className="space-y-3">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <p className="font-medium">{msg.sender}</p>
                <span className="text-sm text-gray-500">{msg.timeAgo}</span>
              </div>
              <div className="text-sm text-gray-600">{msg.text}</div>
              {idx < messages.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default MessagesPanel;
