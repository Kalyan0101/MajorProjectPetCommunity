import React from "react";

const PetGallery = () => {
  const pets = [
    "/images/pet1.jpg",
    "/images/pet2.jpg",
    "/images/pet3.jpg",
    "/images/pet4.jpg",
  ]; // Placeholder paths

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Pet Gallery</h2>
      <div className="grid grid-cols-2 gap-2">
        {pets.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Pet"
            className="w-full h-24 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default PetGallery;
