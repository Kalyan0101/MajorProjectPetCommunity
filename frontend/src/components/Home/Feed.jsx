// components/Home/Feed.jsx
import React, { useState, useEffect } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const dummyPosts = [
  {
    _id: "1",
    author: "Tara Singh",
    avatar: "https://i.pravatar.cc/150?img=32",
    caption: "Snow looking majestic today 🐶",
    imageUrl: "https://images.unsplash.com/photo-1556228453-efd4b8be31b4?auto=format&fit=crop&w=800&q=80",
    description: "The sun was setting just right 🌇",
    time: "5 mins ago",
    likes: 8,
  },
  {
    _id: "2",
    author: "Debangan Majumder",
    avatar: "https://i.pravatar.cc/150?img=20",
    caption: "Evening walks with Snow 🌾",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1fc0f1d?auto=format&fit=crop&w=800&q=80",
    description: "He’s getting stronger every day.",
    time: "12 mins ago",
    likes: 15,
  },
  {
    _id: "3",
    author: "Sourindra Das",
    avatar: "https://i.pravatar.cc/150?img=45",
    caption: "Momo and Chowmein date night 🍜",
    imageUrl: "https://images.unsplash.com/photo-1604503468501-1fca4d885f0d?auto=format&fit=crop&w=800&q=80",
    description: "Don't judge. We're romantic like that.",
    time: "1 hour ago",
    likes: 21,
  },
  {
    _id: "4",
    author: "Aadila Farm",
    avatar: "https://i.pravatar.cc/150?img=52",
    caption: "Farm dogs chasing butterflies 🐾",
    imageUrl: "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=800&q=80",
    description: "Freedom has never looked better.",
    time: "2 hours ago",
    likes: 12,
  },
  {
    _id: "5",
    author: "Tanmoy Roy",
    avatar: "https://i.pravatar.cc/150?img=33",
    caption: "Cuteness overload 😍",
    imageUrl: "https://images.unsplash.com/photo-1601758123927-1964e5f3b1c9?auto=format&fit=crop&w=800&q=80",
    description: "Found this puppy outside college today!",
    time: "3 hours ago",
    likes: 6,
  },
  {
    _id: "6",
    author: "Rumi Das",
    avatar: "https://i.pravatar.cc/150?img=47",
    caption: "Who says cats aren’t cuddly?",
    imageUrl: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80",
    description: "She's basically a furball of love 💕",
    time: "4 hours ago",
    likes: 9,
  },
  {
    _id: "7",
    author: "Jayanta Ghosh",
    avatar: "https://i.pravatar.cc/150?img=51",
    caption: "Bruno’s first swim 🏊",
    imageUrl: "https://images.unsplash.com/photo-1601758124013-6ec2a652a1b7?auto=format&fit=crop&w=800&q=80",
    description: "Little scared, a lot brave.",
    time: "Today at 10AM",
    likes: 19,
  },
  {
    _id: "8",
    author: "Sreya Dutta",
    avatar: "https://i.pravatar.cc/150?img=37",
    caption: "Even grumpy dogs deserve love 😂",
    imageUrl: "https://images.unsplash.com/photo-1619983081563-430f6360276a?auto=format&fit=crop&w=800&q=80",
    description: "Don't let his face fool you.",
    time: "Yesterday",
    likes: 5,
  },
  {
    _id: "9",
    author: "Tuhin Sarkar",
    avatar: "https://i.pravatar.cc/150?img=28",
    caption: "Morning yoga with Max 🧘",
    imageUrl: "https://images.unsplash.com/photo-1607290817800-798aebc0f3a2?auto=format&fit=crop&w=800&q=80",
    description: "Downward dog never looked so good!",
    time: "Yesterday",
    likes: 14,
  },
  {
    _id: "10",
    author: "Sneha Banerjee",
    avatar: "https://i.pravatar.cc/150?img=29",
    caption: "Tiny paws, big heart 💓",
    imageUrl: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80",
    description: "She’s the reason I smile every morning.",
    time: "2 days ago",
    likes: 11,
  },
  // Add 5 more similarly
  {
    _id: "11",
    author: "Koustav Bose",
    avatar: "https://i.pravatar.cc/150?img=56",
    caption: "Meet Pixel!",
    imageUrl: "https://images.unsplash.com/photo-1604467715871-693fb761b1c7?auto=format&fit=crop&w=800&q=80",
    description: "The new baby of the house 🐕‍🦺",
    time: "3 days ago",
    likes: 18,
  },
  {
    _id: "12",
    author: "Rhea Mitra",
    avatar: "https://i.pravatar.cc/150?img=36",
    caption: "Dewy mornings and wet noses",
    imageUrl: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    description: "There’s something poetic about this calm.",
    time: "4 days ago",
    likes: 7,
  },
  {
    _id: "13",
    author: "Arjun Dey",
    avatar: "https://i.pravatar.cc/150?img=40",
    caption: "The eyes say it all.",
    imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80",
    description: "He knows when I’m down and cheers me up every time.",
    time: "5 days ago",
    likes: 13,
  },
  {
    _id: "14",
    author: "Mou Chakraborty",
    avatar: "https://i.pravatar.cc/150?img=30",
    caption: "Chilling in the balcony 😎",
    imageUrl: "https://images.unsplash.com/photo-1559070158-12260c40d7c3?auto=format&fit=crop&w=800&q=80",
    description: "Lazy Saturdays with Leo 🐕",
    time: "6 days ago",
    likes: 4,
  },
  {
    _id: "15",
    author: "Anik Dutta",
    avatar: "https://i.pravatar.cc/150?img=49",
    caption: "Tiny tongue moment 👅",
    imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80",
    description: "Caught mid-yawn 😂",
    time: "Last week",
    likes: 10,
  },
];

const Feed = ({ post }) => {
  const [likes, setLikes] = useState([]);

  const user = useSelector(state => state.auth)

  const owner = post.owner;

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index]++;
    setLikes(newLikes);
  };

  return (
    <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center mb-3">
            <img
              src={owner?.avatar?.url || null}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{owner.fullName}</p>
              <p className="text-sm text-gray-500">{post.time} time </p>
            </div>
          </div>
          <h4 className="text-lg font-semibold mb-1">{post.text}</h4>
          <img
            src={post.image.url}
            alt="Post"
            className="w-full h-auto object-cover max-h-[400px] rounded-lg mb-2"
          />

          <div className="flex items-center gap-2 text-sm">
            { user?.status &&
              <button
              onClick={() => handleLike()}
              className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <FaRegThumbsUp /> Like
              </button>
            }
            <span className="text-gray-600">{likes} likes</span>
          </div>
        </div>
    </div>
  );
};

export default Feed;
