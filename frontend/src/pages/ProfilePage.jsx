import React, { useState, useEffect } from 'react';
import PostFeed from '../components/Home/PostFeed.jsx'; // Posts by this user
import { useDispatch, useSelector } from 'react-redux';
import config from '../backend/config.js';
import { successAlert } from '../components/alert/success.alert.js'
import { errorAlert } from "../components/alert/error.alert.js"
import authService from '../backend/auth.js';
import { login as storeLogin } from '../store/authSlice.store.js';
import PetCard from '../components/pet/PetCard.jsx';
import Pet from "../backend/pet.backend.js"
import { confirmation } from '../components/alert/confirmation.js';
import PetForm from '../components/pet/PetForm.jsx';

const ProfilePage = () => {
	const user = useSelector(state => state.auth);
	const [loading, setLoading] = useState(true);
	const [petLists, setPetLists] = useState(null);
	const [userformData, setUserFormData] = useState({});
	const [isEditingUser, setIsEditingUser] = useState(false);
	const [isAddPet, setIsAddPet] = useState(false);

	const dispatch = useDispatch();


	useEffect(() => {
		if (user.status) {
			setPetLists(user.userData.allPets);
			setUserFormData(user.userData);
			setLoading(false);

			setUserFormData(prev => ({ ...prev, avatar: null }))
		}
	}, [user.status, user.userData]);

	const handelInput = (e) => {
		const { name, value, files } = e.target;

		if (name === 'avatar') {
			setUserFormData(prev => (
				{
					...prev,
					[name]: files[0]
				}
			));
		} else {
			setUserFormData((prevState) => (
				{
					...prevState,
					[name]: value
				}
			));
		}
	};

	const updateUserInfo = async (e) => {
		e.preventDefault();

		config.updateDetails(userformData)
			.then(async (res) => {
				if (res.success) {
					const user = await authService.getCurrentUser();
					dispatch(storeLogin(user.data));
					successAlert(res.message);
					setLoading(true);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsEditingUser(false)
			});
	}

	const addNewPet = (petFormData) => {

		setLoading(true);

		Pet.registerPet(petFormData)
			.then(async (res) => {

				if (res.success) {
					const user = await authService.getCurrentUser();
					dispatch(storeLogin(user.data));
					successAlert(res.message);
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			})

		addPetFormPopUp();
	}

	const addPetFormPopUp = () => {
		setIsAddPet(prev => !prev);
	}

	const deletePet = async (id) => {
		const isConfirm = await confirmation();

		setLoading(true);

		if (isConfirm) {
			const res = await Pet.deletePet(id);
			successAlert(res.message);
			setPetLists(prev => prev.filter(pet => pet._id !== id));
		}

		setLoading(false);
	};

	if (loading) return <p className="text-center mt-8">Loading profile...</p>;

	return (
		<div className="max-w-5xl mx-auto">
			{/* Cover Banner */}
			<div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-100 to-pink-100 rounded-b-lg overflow-hidden shadow-md">
				<img
					src={user?.coverImage}
					alt="Cover"
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Profile Section */}
			<div className="relative px-6 mt-[-50px]">
				<div className="flex items-center gap-6">
					{/* Profile Picture */}
					<div className="w-28 h-28 sm:w-32 sm:h-32">
						<img
							src={user.userData?.avatar?.url}
							alt="Profile"
							className="w-full h-full rounded-full border-4 border-white shadow-md object-cover"
						/>
					</div>

					{/* Name, Role, Location */}
					<div>
						<h1 className="text-2xl font-bold flex items-center gap-3">
							{user.userData?.fullName || "Owner Name"}
							<span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full shadow">
								{user.userData?.role}
							</span>
						</h1>
						<p className="text-gray-500">{user.userData?.location || "Location"}</p>
					</div>
				</div>

				{/* Edit Profile Button */}
				<div className="mt-4 flex gap-3">
					<button
						onClick={() => setIsEditingUser(true)}
						className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
					>
						Edit Profile
					</button>
					<button className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300">
						Message
					</button>
				</div>
			</div>

			{/* Bio Section */}
			{/* <div className="px-6 mt-6 text-gray-700">
				<p>{user?.bio || "This is a pet lover who loves spending time with their furry friend!"}</p>
			</div> */}

			{/* Pet Carousel/Display Multiple Pets */}
			<div className="bg-white rounded-lg shadow-md p-6 mt-6">
				<div className="flex items-center justify-between mb-5">
					<h2 className="text-xl font-semibold">My Pets</h2>
					<button
						className="bg-blue-600 text-white hover:text-blue-700 hover:bg-white font-semibold py-1 px-3 rounded shadow inline-flex items-center"
						onClick={addPetFormPopUp}
					>
						<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
						</svg>
						Add Pet
					</button>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

					{
						petLists.map((pet) =>
							<PetCard key={pet._id} pet={pet} onDelete={() => deletePet(pet._id)} />
						)
					}
				</div>
			</div>

			{/* Post Feed */}
			<div className="mt-8">
				{/* <PostFeed userId={profile?.userId} /> */}
			</div>

			{/* =================================================================================================================== */}
			{/* *************************************** Edit form ***************************************************************** */}
			{/* =================================================================================================================== */}

			{/* Edit User details */}
			{isEditingUser && (
				<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
					<div className="bg-white p-6 rounded-lg shadow-md w-96">
						<h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
						<form onSubmit={updateUserInfo}>
							<label className="flex flex-col items-start cursor-pointer">
								{
									!userformData.avatar &&
									<div className="flex justify-center items-center bg-gray-100">
										<img
											src={user.userData.avatar?.url || null}
											alt="Cute pet"
											className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
										/>
									</div>
								}
								<input type="file" className="my-2" name='avatar' onChange={handelInput} />
							</label>
							{
								Object.entries(userformData).map(([field, value], i) => {

									if ((field === 'fullName') || (field === 'location')) {

										return (
											<div
												key={i}
												className='flex justify-between items-center w-full'
											>
												<label
													htmlFor={i}
													className='inline max-w-1/3'
												>
													{field}:
												</label>
												<input
													id={i}
													type="text"
													name={field}
													value={value || ""}
													onChange={handelInput}
													className="inline w-2/3 mt-2 p-2 border rounded"
													placeholder={field}
												/>
											</div>
										)
									};
								})
							}

							<div className="flex items-center justify-between">
								<label htmlFor="role" className='inline max-w-1/3'>Role:</label>
								<select
									id='role'
									name="role"
									value={userformData.role}
									onChange={handelInput}
									className="inline w-2/3 mt-2 p-2 border rounded"
								>
									<option value="" disabled>Select role</option>
									<option value="Owner">Owner</option>
									<option value="Shop Owner">Shop Owner</option>
									<option value="Vet">Vet</option>
								</select>
							</div>
							<div className="mt-4 flex justify-start gap-2 flex-row-reverse">
								<button
									className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
								>
									Update
								</button>
								<button
									type='button'
									onClick={() => setIsEditingUser(false)}
									className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* add new Pet Details */}
			{
				isAddPet && <PetForm onSubmit={addNewPet} onClose={addPetFormPopUp} />
			}
		</div>
	);
};

export default ProfilePage;
