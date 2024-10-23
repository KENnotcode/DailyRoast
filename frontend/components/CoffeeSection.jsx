import React, { useEffect, useState } from "react";
import CoffeeCard from "./CoffeeCard";

const CoffeeSection = () => {
  const [icedCoffees, setIcedCoffees] = useState([]);

  useEffect(() => {
    fetch("https://fake-coffee-api.vercel.app/api")
      .then((res) => res.json())
      .then((data) => setIcedCoffees(data)); // Make sure to adjust according to the API structure
  }, []);

  const handleCardClick = (id) => {
    console.log("Clicked on coffee id:", id);
    // Implement your modal or details view logic here
  };

  return (
    <section id="IcedCoffee" className="my-10">
      <h1 className="text-3xl text-center">Iced Coffee</h1>
      <div className="mt-8 flex flex-row overflow-x-auto gap-4">
        {icedCoffees.map((coffee) => (
          <CoffeeCard
            key={coffee.id}
            id={coffee.id}
            imgUrl={coffee.image_url} // Adjust this field based on the API response
            title={coffee.title} // Adjust this field based on the API response
            price={coffee.price} // Adjust this field based on the API response
            handleClick={handleCardClick}
          />
        ))}
      </div>
    </section>
  );
};

export default CoffeeSection;
