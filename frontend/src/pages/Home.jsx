// Home.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ProfileCard from '../components/Home/ProfileCard';
import SettingsPanel from '../components/Home/SettingsPanel';
import CreatePost from '../components/Home/CreatePost';
import Feed from '../components/Home/Feed';
import FriendList from '../components/layout/FriendList';
import Navbar from '../components/layout/Navbar';
import ExploreSection from '../components/Home/ExploreSection';
import MessagesPanel from '../components/Home/MessagesPanel';
import NotificationPanel from '../components/Home/NotificationPanel';
import PetGallery from '../components/Home/PetGallery';
import TrendingTopics from '../components/Home/TrendingTopics';
import axios from 'axios';
import { useSelector } from 'react-redux'


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  const userData = useSelector(state => state.userData)

  // console.log(userData);
  

  const toggleMessagesPanel = () => {
    setShowMessages(prev => !prev);
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/posts');
  //       setPosts(res.data);
  //     } catch (error) {
  //       console.error('Failed to fetch posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <Navbar toggleMessagesPanel={toggleMessagesPanel} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 flex flex-col gap-4 relative">
          <div className="grid grid-cols-4 gap-4">
            {/* Left Column */}
            <div className="space-y-4 col-span-1">
              <ProfileCard />
              <SettingsPanel />
              <ExploreSection />
              <PetGallery />
            </div>

            {/* Center Column */}
            <div className="col-span-2 space-y-4">
              <CreatePost addPost={addPost} />
              <Feed posts={posts} />
              <TrendingTopics />
            </div>

            {/* Right Column */}
            <div className="space-y-4 col-span-1">
              <FriendList />
              <NotificationPanel />
            </div>
          </div>

          {/* Slide-in Messages Panel */}
          {showMessages && (
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold text-lg">Messages</h3>
                <button onClick={toggleMessagesPanel} className="text-red-500 font-bold text-xl">&times;</button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
                <MessagesPanel />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
