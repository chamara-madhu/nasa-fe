import React from "react";

const MarsRoverCard = ({ id, img_src, camera, rover, earth_date, sol }) => {
  return (
    <div key={id} className="bg-white border border-gray-200 rounded-lg">
      <img
        className="object-cover w-full h-48 rounded-t-lg"
        src={img_src}
        alt={camera.full_name}
        loading="lazy"
        srcSet={`${img_src}?w=300 300w, ${img_src}?w=600 600w`}
      />
      <div className="p-4">
        <h5 className="mb-2 text-xl font-bold">{camera.full_name}</h5>
        <p className="text-base text-gray-700">Camera: {camera.name}</p>
        <p className="text-base text-gray-700">Rover: {rover.name}</p>
        <p className="text-base text-gray-700">Earth Date: {earth_date}</p>
        <p className="text-base text-gray-700">SOL: {sol}</p>
        <p className="text-base text-gray-700">Status: {rover.status}</p>
        <p className="text-base text-gray-700">
          Total Photos: {rover.total_photos}
        </p>
        <p className="text-base text-gray-700">ID: {id}</p>
      </div>
    </div>
  );
};

export default MarsRoverCard;
