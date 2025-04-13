import React from 'react';
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

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 flex flex-col gap-4">
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
              <CreatePost />
              <Feed />
              <TrendingTopics />
            </div>

            {/* Right Column */}
            <div className="space-y-4 col-span-1">
              <FriendList />
              <MessagesPanel />
              <NotificationPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
