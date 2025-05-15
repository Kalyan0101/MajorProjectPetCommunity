import React, { useState } from 'react'

const PetForm = ({ onSubmit }) => {

    // Pet Info States
    const [petFormData, setPetFormData] = useState({
        name: "",
        type: "",
        breed: "",
        yob: "",
        activity: "",
        petAvatar: null
    })

    const handelInput = (e) => {

        const { name, value, files } = e.target;

        if (name === "petAvatar") {
            setPetFormData(prev => (
                {
                    ...prev,
                    petAvatar: files[0]
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
        onSubmit(petFormData);
    }

    return (
        <form onSubmit={ handleSubmit }>
            {/* Pet Section */}
            <h3 className="section-title">🐾 Pet Info</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <label className="flex flex-col items-start cursor-pointer">
                    <input type="file" className="mb-1" onChange={handelInput} />
                    {petFormData.petAvatar && (
                        <span className="text-sm text-gray-600">
                            Selected: <strong>{petFormData.petAvatar.name}</strong>
                        </span>
                    )}
                </label>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <input type="text" placeholder="Pet Name" value={petFormData.petName} onChange={handelInput} className="input" />
                    <input type="text" placeholder="Type (Dog, Cat, etc.)" value={petFormData.petType} onChange={handelInput} className="input" />
                    <input type="text" placeholder="Breed" value={petFormData.breed} onChange={handelInput} className="input" />
                    <input type="number" placeholder="Year of Birth" value={petFormData.yob} onChange={handelInput} className="input" />
                    <input type="text" placeholder="Favorite Activities" value={petFormData.activity} onChange={handelInput} className="input" />
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
                Add Pet
            </button>
        </form>
    )
}

export default PetForm