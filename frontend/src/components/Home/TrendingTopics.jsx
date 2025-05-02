import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TrendingTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trending topics on component mount
  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/trending-topics'); // Replace with your actual API endpoint
  //       setTopics(response.data);
  //     } catch (error) {
  //       console.error("Error fetching trending topics:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTopics();
  // }, []);

  if (loading) {
    return <p>Loading trending topics...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Trending Topics</h2>
      <ul className="space-y-2 text-blue-600">
        {topics.map((topic, idx) => (
          <li key={idx} className="hover:underline cursor-pointer">
            <Link to={`/topic/${topic.replace('#', '')}`}>{topic}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;
