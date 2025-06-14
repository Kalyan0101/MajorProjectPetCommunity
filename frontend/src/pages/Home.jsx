import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/Home/ProfileCard';
import CreatePost from '../components/Home/CreatePost';
import Feed from '../components/Home/Feed';
import FriendList from '../components/layout/FriendList';
import TrendingTopics from '../components/Home/TrendingTopics';
import { useDispatch, useSelector } from 'react-redux';
import Post from "../backend/post.backend.js";
import { setPosts } from '../store/postsSlice.store.js';

const Home = () => {
  
  const user = useSelector(state => state.auth);
  const posts = useSelector(state => state.posts)

  const dispatch = useDispatch();

  useEffect(() => {
    Post.getAllPost()
        .then((posts) => {

            if(posts.success){
                dispatch(setPosts(posts.data))
            }
        })
        .catch(err => {
            console.log(err);                    
        });
  }, [user.status, user.userData])

  console.log(posts.posts)

  return (
    <div>
      <div className="flex">
        <main className="flex-1 p-4 flex flex-col gap-4 relative">
          <div className="grid grid-cols-4 gap-4 justify-between">
            {/* Left Column */}
            <div className="space-y-4 col-span-1">
              {/* <Sidebar /> */}
              { user.status && <ProfileCard { ...user } /> }
            </div>

            {/* Center Column */}
            <div className="col-span-2 space-y-4">

              { user?.status && <CreatePost /> }
              {
                !posts.isEmpty 
                ?
                    ( posts.posts.map(post => <Feed key={post._id} post={post} />) )
                : 
                    "No post available yet..."
              }
              <TrendingTopics />
            </div>

            {/* Right Column */}
            <div className="space-y-4 col-span-1">
              {/* <FriendList /> */}
            </div>
          </div>          
        </main>
      </div>
    </div>
  )
};

export default Home;
