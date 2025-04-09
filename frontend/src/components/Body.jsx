import React from 'react';

const Body = ({ children }) => {
  return (
    <main className="flex-1 bg-gradient-to-b from-gray-50 to-gray-100 p-6 min-h-screen">
      {children}
    </main>
  );
};

export default Body;
