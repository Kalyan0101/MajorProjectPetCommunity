import React from "react";

const TrendingTopics = () => {
  const topics = [
    "#PetAdoption",
    "#DogTraining",
    "#CuteCats",
    "#PetHealth",
    "#PetFest2025",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Trending Topics</h2>
      <ul className="space-y-2 text-blue-600">
        {topics.map((topic, idx) => (
          <li key={idx} className="hover:underline cursor-pointer">{topic}</li>
        ))}
      </ul>
      <p>hello world </p>
    </div>

  );
};

export default TrendingTopics;
