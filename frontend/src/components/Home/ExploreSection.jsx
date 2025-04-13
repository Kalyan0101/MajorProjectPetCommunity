import React from "react";

const ExploreSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Explore</h2>
      <ul className="space-y-2 text-blue-600">
        <li className="hover:underline cursor-pointer">Nearby Pet Events</li>
        <li className="hover:underline cursor-pointer">Popular Pet Groups</li>
        <li className="hover:underline cursor-pointer">Adoption Listings</li>
        <li className="hover:underline cursor-pointer">Pet Care Tips</li>
      </ul>
    </div>
  );
};

export default ExploreSection;
