import React, { useState } from 'react'
import Pet from '../../backend/pet.backend';
import { useDispatch } from 'react-redux';
import { successAlert } from '../alert/success.alert.js'
import authService from '../../backend/auth.js';
import { login as storeLogin } from '../../store/authSlice.store.js';

const PetForm = ({ onSubmit, onClose, petDetails = '' }) => {

    const dispatch = useDispatch();

    // Pet Info States
    const [petFormData, setPetFormData] = useState({
        name: petDetails?.name || "",
        animalType: petDetails?.animalType || "",
        breed: petDetails?.breed || "",
        yob: petDetails?.yob || "",
        activity: petDetails?.activity || "",
        avatar: null
    })

    const handelInput = (e) => {
        const { name, value, files } = e.target;

        if (name === "avatar") {
            setPetFormData(prev => (
                {
                    ...prev,
                    [name]: files[0]
                }
            ))
        } else {
            setPetFormData(prev => (
                {
                    ...prev,
                    [name]: value
                }
            ))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (petDetails) {
            petFormData._id = petDetails._id;
            Pet.updatePetDetails(petFormData)
                .then(async (res) => {
                    if (res.success) {
                        const user = await authService.getCurrentUser();
                        dispatch(storeLogin(user.data));
                        successAlert(res.message);
                        onClose();
                    }
                })
                .catch((err) => { 
                    console.log(err);                    
                })

        } else {
            onSubmit(petFormData);
        }
    }

    return (
        <form
            className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30'
            onSubmit={handleSubmit}
        >
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Pet Section */}
                <h3 className="section-title">🐾 Add Pet</h3>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <label className="flex flex-col items-start cursor-pointer">
                        {
                            petDetails && !petFormData.avatar &&
                            <div className="flex justify-center items-center bg-gray-100">
                                <img
                                    src={petDetails.avatar?.url || null}
                                    alt="Cute pet"
                                    className="w-full max-w-md h-auto rounded-lg shadow-md object-cover"
                                />
                            </div>
                        }
                        <input type="file" className="my-2" name='avatar' onChange={handelInput} />
                    </label>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <input type="text" placeholder="Pet Name" name='name' value={petFormData.name} onChange={handelInput} className="input" />
                        {
                            !petDetails &&

                            <input type="text" placeholder="Type (Dog, Cat, etc.)" name='animalType' value={petFormData.animalType} onChange={handelInput} className="input" />
                        }
                        <input type="text" placeholder="Breed" name='breed' value={petFormData.breed} onChange={handelInput} className="input" />
                        <input type="number" placeholder="Year of Birth" name='yob' value={petFormData.yob} onChange={handelInput} className="input" />
                        <input type="text" placeholder="Favorite Activities" name='activity' value={petFormData.activity} onChange={handelInput} className="input" />
                    </div>
                </div>
                <div className="flex justify-between items-center flex-row-reverse my-3">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                        {
                            petDetails
                                ?
                                "Update Pet"
                                :
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Pet
                                </>
                        }

                    </button>
                    <button
                        type='button'
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PetForm