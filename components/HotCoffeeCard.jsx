import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const HotcoffeeCard = ({
  coffee, // Accept single coffee object
  active,
  handleClick,
  setTotalQuantity,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null); // State for selected coffee

  const openPopup = () => {
    setSelectedCoffee(coffee);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCoffee(null);
  };

  // Function to get the total count of items in the cart
  const getCount = () => {
    const data = JSON.parse(localStorage.getItem("cartItems")) || [];
    return data.reduce((total, item) => total + item.quantity, 0);
  };

  const handleAddToCart = () => {
    const prevData = localStorage.getItem("cartItems") || "[]";
    let parsedData = JSON.parse(prevData);

    // Check if item with the same ID already exists
    const existingItemIndex = parsedData.findIndex((item) => item.id === coffee.id);

    if (existingItemIndex !== -1) {
      // Item already exists, increment its quantity
      parsedData[existingItemIndex].quantity += 1;
    } else {
      // Item doesn't exist, add it to the local storage
      parsedData.push({ ...coffee, quantity: 1 });
    }

    // Update local storage with modified or new data
    localStorage.setItem("cartItems", JSON.stringify(parsedData));
    setTotalQuantity(getCount());
  };

  return (
    <>
      <motion.div
        key={coffee.id}
        className={`${
          active === coffee.name ? "flex-[10]" : "flex-[2]"
        } relative flex items-center justify-center min-w-[250px] h-[450px] cursor-pointer bg-minicolor transition-[flex] ease-in-out duration-700 overflow-hidden border-gray-300 border rounded-lg`}
        onClick={openPopup} // Open the popup on click
      >
        {/* Coffee Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={coffee.image}
            alt={coffee.name}
            fill
            className="object-cover rounded-xl"
            style={{ transform: "scale(1.2)" }} // Adjust as necessary
          />
        </div>

        {/* Product Details */}
        <div
          className={`absolute bottom-0 left-0 w-full p-4 rounded-b-xl bg-[rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col`}
          style={{ height: '220px' }} // Ensure consistent height
        >
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-[30px] font-semibold text-tahiti">{coffee.name}</h2>
              <p className="text-[20px] font-extralight text-tahiti mb-4">${coffee.price.toFixed(2)}</p>
            </div>

            {/* Align Add to Cart Button to the right */}
            <div className="flex justify-end mt-auto">
              <button
                className="flex justify-center items-center bg-addtocartcolor px-4 py-2 rounded-lg hover:text-tahiti transition duration-300 mb-3"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening the popup
                  handleAddToCart();
                }} // Add to cart functionality
              >
                <Image
                  src="/ADDTUCARTicon.png" // Ensure this path is correct
                  width={20}
                  height={20}
                  alt="Cart Icon"
                />
                <span className="ml-2 text-white">Add to cart</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popup for Active State */}
      {isPopupOpen && selectedCoffee && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup} // Close popup on overlay click
        >
          <div
            className="bg-tahiti rounded-lg shadow-lg w-[797px] h-[494px] flex relative"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to overlay
          >
            {/* Product Image */}
            <div className="w-1/2 h-full p-4 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center" style={{ transform: "scale(1.5)" }}>
                <Image
                  src={selectedCoffee.image} // Use the correct property for image
                  alt={selectedCoffee.name}
                  width={900}
                  height={900}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-1/2 p-6 flex flex-col justify-between bg-minicolor rounded-lg">
              <div className="flex-grow overflow-auto max-h-[485px]">
                <h2 className="text-2xl font-bold mb-4">{selectedCoffee.name}</h2>
                <ul>
                  <li>
                    <strong>Description:</strong> {selectedCoffee.description}
                  </li>
                  <li>
                    <strong>Ratio:</strong> {selectedCoffee.ratio}
                  </li>
                  <li>
                    <strong>Size:</strong> {selectedCoffee.size}
                  </li>
                  <br />
                  <li className="text-lg">
                    For <strong>${selectedCoffee.price.toFixed(2)}</strong> only!
                  </li>
                </ul>
              </div>

              <button
                className="bg-red text-tahiti px-4 py-2 rounded-lg mt-4 self-end"
                onClick={closePopup} // Close button functionality
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotcoffeeCard;