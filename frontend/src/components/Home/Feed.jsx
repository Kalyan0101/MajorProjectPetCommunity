// components/Home/Feed.jsx
import React, { useState, useEffect } from 'react';
import { FaRegThumbsUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../store/postsSlice.store.js';
import Post from "../../backend/post.backend.js"


const Feed = ({ post }) => {

	const [isLiked, setIsLiked] = useState(false);

	const user = useSelector(state => state.auth)

	const dispatch = useDispatch();

	const owner = post?.owner;

	const handleLike = () => {
		Post.lovePost(post?._id)
		.then(() => {
			Post.getAllPost()
			.then((posts) => {

				if (posts.success) {
					dispatch(setPosts(posts.data))
				}
			})
			.catch(err => {
				console.log(err);
			});
		})
		.catch(err => {
			console.log(err);
		});
	};

	useEffect(() => {
		const loves = post.loves;

		const like = loves.some(love => user?.userData?._id === love?.lovedBy);

		setIsLiked(like);

	}, [post.loves, user.userData, post])

	return (
		<div className="space-y-6 my-2">
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
					{user?.status &&
						<button
							onClick={handleLike}
							className={`flex items-center gap-1 hover:underline ${ isLiked ? "text-blue-600" : "text-black" }`}
						>
							<FaRegThumbsUp /> Like
						</button>
					}
					<span className="text-gray-600">{post?.totalLoves} likes</span>
				</div>
			</div>
		</div>
	);
};

export default Feed;
