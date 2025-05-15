import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ProfileCard from '../components/Home/ProfileCard';
import SettingsPanel from '../components/Home/SettingsPanel';
import CreatePost from '../components/Home/CreatePost';
import Feed from '../components/Home/Feed';
import FriendList from '../components/layout/FriendList';
import NotificationPanel from '../components/Home/NotificationPanel';
import PetGallery from '../components/Home/PetGallery';
import TrendingTopics from '../components/Home/TrendingTopics';
import { useSelector } from 'react-redux';

const Home = () => {
  const [posts, setPosts] = useState([]);
  
  const user = useSelector(state => state.auth);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <div className="flex">
        <main className="flex-1 p-4 flex flex-col gap-4 relative">
          <div className="grid grid-cols-5 gap-4">
            {/* Left Column */}
            <div className="space-y-4 col-span-1">
              {/* <Sidebar /> */}
              { user.status && <ProfileCard { ...user } /> }
            </div>

            {/* Center Column */}
            <div className="col-span-2 space-y-4">

              { user?.status && <CreatePost addPost={addPost} /> }
              <Feed posts={posts} user={user} />
              <TrendingTopics />
            </div>

            {/* Right Column */}
            <div className="space-y-4 col-span-1">
              <FriendList />
              <NotificationPanel />
            </div>
          </div>          
        </main>
      </div>
    </div>
  )
};

export default Home;
