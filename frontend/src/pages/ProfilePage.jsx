import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostFeed from '../components/Home/PostFeed.jsx'; // Posts by this user

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isEditingPet, setIsEditingPet] = useState(false);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
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
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        setProfile(response.data);
        setSelectedPet(response.data.pets[0]);  // Set the first pet as the selected pet
        setEditedOwnerDetails({
          userName: response.data.userName,
          fullName: response.data.fullName,
          email: response.data.email,
          password: response.data.password,
          location: response.data.location,
          role: response.data.role,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;

  const role = profile?.role || "Owner";

  const handlePetChange = (pet) => {
    setSelectedPet(pet);
    setEditedPetDetails({
      petName: pet?.name,
      petBreed: pet?.breed,
      petAge: pet?.age,
      petActivities: pet?.activities,
    });
  };

  const handleEditPetChange = (e) => {
    const { name, value } = e.target;
    setEditedPetDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSavePetDetails = () => {
    setSelectedPet({
      ...selectedPet,
      ...editedPetDetails,
    });
    const updatedPets = profile.pets.map((pet) => 
      pet.id === selectedPet.id ? { ...pet, ...editedPetDetails } : pet
    );
    setProfile({ ...profile, pets: updatedPets });
    setIsEditingPet(false);
  };

  const handleEditOwnerChange = (e) => {
    const { name, value } = e.target;
    setEditedOwnerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveOwnerDetails = () => {
    setProfile({
      ...profile,
      userName: editedOwnerDetails.userName,
      fullName: editedOwnerDetails.fullName,
      email: editedOwnerDetails.email,
      password: editedOwnerDetails.password,
      location: editedOwnerDetails.location,
      role: editedOwnerDetails.role,
    });
    setIsEditingOwner(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Cover Banner */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-100 to-pink-100 rounded-b-lg overflow-hidden shadow-md">
        <img
          src={profile?.coverImage || "https://place-puppy.com/800x300"}
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
              src={profile?.userAvatar || "https://place-puppy.com/200x200"}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* Name, Role, Location */}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {profile?.fullName || "Owner Name"}
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full shadow">
                {role}
              </span>
            </h1>
            <p className="text-gray-500">{profile?.location || "Location"}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setIsEditingOwner(true)}
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
      <div className="px-6 mt-6 text-gray-700">
        <p>{profile?.bio || "This is a pet lover who loves spending time with their furry friend!"}</p>
      </div>

      {/* Pet Carousel/Display Multiple Pets */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">My Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile?.pets?.map((pet, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg">
              <img
                src={pet.avatar || "https://placekitten.com/200/200"}
                alt="Pet"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">{pet.name}</h3>
                <p className="text-sm text-gray-500">Breed: {pet.breed}</p>
                <p className="text-sm text-gray-500">Age: {pet.age}</p>
                <p className="text-sm text-gray-500">Activities: {pet.activities}</p>
                <button
                  onClick={() => handlePetChange(pet)}
                  className="bg-blue-500 text-white px-4 py-1 rounded mt-4 hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
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
        <PostFeed userId={profile?.userId} />
      </div>

      {/* Edit Owner Modal */}
      {isEditingOwner && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="fullName"
              value={editedOwnerDetails.fullName}
              onChange={handleEditOwnerChange}
              className="block w-full mt-2 p-2 border rounded"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={editedOwnerDetails.email}
              onChange={handleEditOwnerChange}
              className="block w-full mt-2 p-2 border rounded"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={editedOwnerDetails.password}
              onChange={handleEditOwnerChange}
              className="block w-full mt-2 p-2 border rounded"
              placeholder="Password"
            />
            <input
              type="text"
              name="location"
              value={editedOwnerDetails.location}
              onChange={handleEditOwnerChange}
              className="block w-full mt-2 p-2 border rounded"
              placeholder="Location"
            />
            <select
              name="role"
              value={editedOwnerDetails.role}
              onChange={handleEditOwnerChange}
              className="block w-full mt-2 p-2 border rounded"
            >
              <option value="Owner">Owner</option>
              <option value="Shop Owner">Shop Owner</option>
              <option value="Vet">Vet</option>
            </select>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleSaveOwnerDetails}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingOwner(false)}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
