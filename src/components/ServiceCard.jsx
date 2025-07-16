import React from "react";

const ServiceCard = ({ service }) => {
  const { icon, title, description } = service;
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg hover:bg-[#CAEB66] transition duration-300 cursor-pointer">
      <div className="text-4xl text-primary mb-4 inline-flex items-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 line-clamp-2">{description}</p>
    </div>
  );
};

export default ServiceCard;
