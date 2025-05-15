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

const ProfilePage = () => {
	let selectedPet;

	const user = useSelector(state => state.auth);
	const [loading, setLoading] = useState(true);
	const [petLists, setPetLists] = useState(null);
	const [formData, setFormData] = useState({});

	const dispatch = useDispatch();


	const [isEditingPet, setIsEditingPet] = useState(false);
	const [isEditingUser, setIsEditingUser] = useState(false);

	const [editedPetDetails, setEditedPetDetails] = useState({
		petName: "",
		petBreed: "",
		petAge: "",
		petActivities: "",
	});
	const [editedOwnerDetails, setEditedOwnerDetails] = useState({
		userName: "",
		fullName: "",
		email: "",
		password: "",
		location: "",
		role: "",
	});

	useEffect(() => {
		if (user.status) {
			setPetLists(user.userData.allPets);
			setFormData(user.userData);
			setLoading(!user.status);
		}
	}, [user.status, user.userData]);

	const updateUserInfo = async (e) => {
		e.preventDefault();

		config.updateDetails(formData)
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
			})
	}

	if (loading) return <p className="text-center mt-8">Loading profile...</p>;

	// const handleEditPetChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setEditedPetDetails((prevState) => ({
	// 		...prevState,
	// 		[name]: value,
	// 	}));
	// };

	// const handleSavePetDetails = () => {
	// 	setSelectedPet({
	// 		...selectedPet,
	// 		...editedPetDetails,
	// 	});
	// 	const updatedPets = profile.pets.map((pet) =>
	// 		pet.id === selectedPet.id ? { ...pet, ...editedPetDetails } : pet
	// 	);
	// 	setProfile({ ...profile, pets: updatedPets });
	// 	setIsEditingPet(false);
	// };

	const editUserDetails = (e) => {
		const { name, value } = e.target;

		setFormData((prevState) => (
			{
				...prevState,
				[name]: value
			}
		));
	};

	const addPet = async () => {

	}

	const deletePet = async (id) => {
		const isConfirm = await confirmation();

		if (isConfirm) {
			const res = await Pet.deletePet(id);
			successAlert(res.message);
			setPetLists(prev => prev.filter(pet => pet._id !== id));
		}
	};

	// return (
	// 	<Card />
	// )

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
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">My Pets</h2>
					<button 
						className="bg-blue-600 text-white hover:text-blue-700 hover:bg-white font-semibold py-1 px-3 rounded shadow inline-flex items-center"
						onClick={ addPet }
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
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

			{/* Pet Info */}
			<div className="bg-white rounded-lg shadow-md p-6 mt-6">
				<h2 className="text-xl font-semibold mb-4">Pet Details</h2>
				<div className="flex items-center">
					<img
						src={selectedPet?.avatar || "https://placekitten.com/200/200"}
						alt="Pet"
						className="w-24 h-24 rounded-full object-cover"
					/>
					<div className="ml-6">
						{isEditingPet ? (
							<>
								<input
									type="text"
									name="petName"
									value={editedPetDetails.petName}
									onChange={handleEditPetChange}
									className="block w-full mt-2 p-2 border rounded"
									placeholder="Pet Name"
								/>
								<input
									type="text"
									name="petBreed"
									value={editedPetDetails.petBreed}
									onChange={handleEditPetChange}
									className="block w-full mt-2 p-2 border rounded"
									placeholder="Pet Breed"
								/>
								<input
									type="text"
									name="petAge"
									value={editedPetDetails.petAge}
									onChange={handleEditPetChange}
									className="block w-full mt-2 p-2 border rounded"
									placeholder="Pet Age"
								/>
								<input
									type="text"
									name="petActivities"
									value={editedPetDetails.petActivities}
									onChange={handleEditPetChange}
									className="block w-full mt-2 p-2 border rounded"
									placeholder="Pet Activities"
								/>
								<button
									onClick={handleSavePetDetails}
									className="bg-green-500 text-white px-4 py-1 rounded mt-4 hover:bg-green-600"
								>
									Save
								</button>
							</>
						) : (
							<>
								<h3 className="text-lg font-bold">{selectedPet?.name || "Fluffy"}</h3>
								<p className="text-gray-500">{selectedPet?.type || "Dog"}</p>
								<p className="text-gray-500">Breed: {selectedPet?.breed}</p>
								<p className="text-gray-500">Age: {selectedPet?.age}</p>
								<button
									onClick={() => setIsEditingPet(true)}
									className="bg-blue-500 text-white px-4 py-1 rounded mt-4 hover:bg-blue-600"
								>
									Edit Pet Details
								</button>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Post Feed */}
			<div className="mt-8">
				{/* <PostFeed userId={profile?.userId} /> */}
			</div>

			{/* Edit User details */}
			{isEditingUser && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96">
						<h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
						<form onSubmit={updateUserInfo}>
							{
								Object.entries(formData).map(([field, value], i) => {

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
													onChange={editUserDetails}
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
									value={formData.role}
									onChange={editUserDetails}
									className="inline w-2/3 mt-2 p-2 border rounded"
								>
									<option value="" disabled>Select role</option>
									<option value="Owner">Owner</option>
									<option value="Shop Owner">Shop Owner</option>
									<option value="Vet">Vet</option>
								</select>
							</div>
							<div className="mt-4 flex justify-end gap-2">
								<button
									className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
								>
									Save
								</button>
								<button
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
		</div>
	);
};

export default ProfilePage;
