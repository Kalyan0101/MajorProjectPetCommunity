// components/Home/CreatePost.js
import React, { useRef, useState } from 'react';
import Post from '../../backend/post.backend.js';
import Loading from '../Loading.jsx';
import { useDispatch } from 'react-redux';
import { setPosts } from '../../store/postsSlice.js'

const CreatePost = () => {

    const [postData, setPostData] = useState({
        caption: "",
        image: null
    });

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const handelInput = (e) => {

        const { name, value } = e.target;

        if (name === "image") {
            setPostData(prev => (
                {
                    ...prev,
                    [name]: fileInputRef.current.files[0]
                }
            ))
        } else {
            setPostData(prev => (
                {
                    ...prev,
                    [name]: value
                }
            ))

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        Post.createPost(postData)
        .then((res) => {
            if (res.success) {
                Post.getAllPost()
                .then((posts) => {

                    if(posts.success){
                        dispatch(setPosts(posts.data))
                    }
                })
                .catch(err => {
                    console.log(err);                    
                })
            }

            // clean UI and state
            setPostData({
                caption: "",
                image: null
            })
            fileInputRef.current.value = null;
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    };

    return (
        <>
            {
                loading && <Loading />
            }
            <div className="bg-white p-4 shadow-md rounded-md mt-4">
                <h2 className="text-xl font-semibold mb-2">Create a Post</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-5">
                    <textarea
                        name='caption'
                        className="w-full p-2 border rounded-md"
                        placeholder="What's on your pet's mind?"
                        value={postData.caption}
                        onChange={handelInput}
                    />
                    <input type="file" name='image' ref={fileInputRef} accept="image/*" onChange={handelInput} className='self-start' />
                    <button
                        disabled={!postData.caption || !postData.image}
                        className={` text-white px-6 py-2 rounded font-semibold  ${(!postData.caption || !postData.image) ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        Post
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreatePost;
