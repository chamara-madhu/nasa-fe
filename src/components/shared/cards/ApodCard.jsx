import React from "react";

const ApodCard = ({ title, url, explanation, date }) => {
  return (
    <div key={title} className="bg-white border border-gray-200 rounded-lg">
      <img
        className="object-cover w-full h-48 rounded-t-lg"
        src={url}
        alt={title}
        loading="lazy"
        srcSet={`${url}?w=300 300w, ${url}?w=600 600w`}
      />
      <div className="p-4">
        <h5 className="mb-2 text-xl font-bold">{title}</h5>
        <p className="text-base text-gray-700 text-justify">{explanation}</p>
        <p className="text-sm mt-3 text-gray-700">{date}</p>
      </div>
    </div>
  );
};

export default ApodCard;
