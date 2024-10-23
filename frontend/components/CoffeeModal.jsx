import React from "react";
import Image from 'next/image'

const CoffeeModal = ({ isOpen, onRequestClose, coffee }) => {
  if (!isOpen || !coffee) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button className="absolute top-2 right-2" onClick={onRequestClose}>
          X
        </button>
        <Image src={coffee.imgUrl} alt={coffee.title} width={300} height={200} className="rounded" />
        <h2 className="text-2xl font-bold mt-4">{coffee.title}</h2>
        <p className="text-lg mt-2">${coffee.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CoffeeModal;
