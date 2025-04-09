import React from 'react';
import Sidebar from '../components/Home/Sidebar';
import ProfileCard from '../components/Home/ProfileCard';
import SettingsPanel from '../components/Home/SettingsPanel';
import CreatePost from '../components/Home/CreatePost';
import Feed from '../components/Home/Feed';
import FriendList from '../components/Home/FriendList';

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-4 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <ProfileCard />
            <SettingsPanel />
          </div>

          <div className="col-span-1">
            <CreatePost />
            <Feed />
          </div>

          <div>
            <FriendList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
