import React, { useState, useEffect } from "react";
import axios from "axios";

const PetGallery = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/pets");
        setPets(res.data);
      } catch (error) {
        console.error("Error fetching pet images:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Pet Gallery</h2>
      <div className="grid grid-cols-2 gap-2">
        {pets.length > 0 ? (
          pets.map((pet, index) => (
            <img
              key={index}
              src={pet.imageUrl}
              alt="Pet"
              className="w-full h-24 object-cover rounded-md"
            />
          ))
        ) : (
          <p>No pets available.</p>
        )}
      </div>
    </div>
  );
};

export default PetGallery;
