import React, { useState } from 'react'
import PetForm from './PetForm';

const PetCard = ({ pet, onDelete }) => {

    const [isEditingPet, setIsEditingPet] = useState(false);   
    
    const year = new Date().getFullYear();
    let age = year - pet.yob;
    if(age == 0){
        age = '<1'
    };

    const petFormPopup = () => {
        setIsEditingPet(prev => !prev);
    };

    

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg">
            <img
                src={pet.avatar?.url || null}
                alt="Pet"
                className="w-full h-32 object-cover rounded-lg"
            />
            <div className="mt-4">
                <h3 className="text-lg font-bold text-center">{pet.name}</h3>
                <p className="text-sm text-gray-500"><strong>Animal:</strong> {pet?.animalType}</p>
                <p className="text-sm text-gray-500"><strong>Breed:</strong> {pet?.breed}</p>
                <p className="text-sm text-gray-500"><strong>Age(y):</strong> {age}</p>
                <p className="text-sm text-gray-500"><strong>Activity(s):</strong> {pet?.activity}</p>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={ petFormPopup }
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                        Edit Details
                    </button>
                    <button
                        onClick={ onDelete }
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded shadow transition duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {
                isEditingPet && <PetForm petDetails={pet} onClose={petFormPopup}/>
            }

        </div>
    )
}

export default PetCard