import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const CoffeeCard = ({
  id,
  image_url,
  name,
  price,
  description,
  region,
  weight,
  roast_level,
  flavor_profile,
  grind_option,
  active,
  handleClick,
  setTotalQuantity,
  addToCart
}) => {
  const [cartItem, setCartItem] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const formatList = (item) => {
    return Array.isArray(item) ? item.join(", ") : item;
  };

  const handleAddToCart = () => {
    const item = { id, name, price };
    addToCart(item);
  
    // Save to local storage
    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    localStorage.setItem("cartItems", JSON.stringify([...existingItems, item]));
  
    // Sync with Firebase
    syncCartWithFirebase([...existingItems, item]);
  };
  
  // Function to sync cart items with Firebase
  const syncCartWithFirebase = async (items) => {
    const response = await fetch("/api/syncCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
    return response.json();
  };

  return (
    <motion.div
      className={`${
        active === id ? "flex-[10]" : "flex-[2]"
      } relative flex items-center justify-center min-w-[250px] h-[450px] cursor-pointer bg-minicolor transition-[flex] ease-in-out duration-700 overflow-hidden border-gray-300 border rounded-lg shadow-lg`}
      onClick={openPopup} // Open the popup on click
    >
      {/* Coffee Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover rounded-xl"
          style={{ transform: "scale(1.53)" }} // Adjust as necessary
        />
      </div>

      {/* Product Details */}
      <div
        className={`absolute bottom-0 left-0 w-full p-4 rounded-b-xl bg-[rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col`}
        style={{ height: '220px' }} // Ensure consistent height
      >
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-[30px] font-semibold text-tahiti">{name}</h2>
            <p className="text-[20px] font-extralight text-tahiti mb-4">${price}</p>
          </div>

          {/* Align Add to Cart Button to the right */}
          <div className="flex justify-end mt-auto"> {/* This ensures the button is always at the bottom */}
            <button
              className="flex justify-center items-center bg-addtocartcolor px-4 py-2 rounded-lg hover:text-tahiti transition duration-300 mb-3"
              onClick={(e) => {
                e.stopPropagation();
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

      {/* Popup for Active State */}
      {isPopupOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-dark bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup} // Close popup on overlay click
        >
          <div
            className="bg-tahiti rounded-lg shadow-lg w-[797px] h-[494px] flex relative"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up to overlay
          >
            {/* Product Image */}
            <div className="w-1/2 h-full p-4 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center"style={{ transform: "scale(2.7)" }} >
                <Image
                  src={image_url}
                  alt={name}
                  width={900}
                  height={900}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-1/2 p-6 flex flex-col justify-between bg-minicolor rounded-lg">
              <div className="flex-grow overflow-auto max-h-[485px]">
                <h2 className="text-2xl font-bold mb-4">{name}</h2>
                <p className="text-lg mb-4">{description}</p>

                <ul>
                  <li>
                    <strong>Region:</strong> {region}
                  </li>
                  <li>
                    <strong>Weight:</strong> {weight}g
                  </li>
                  <li>
                    <strong>Roast Level:</strong> {roast_level}
                  </li>
                  <li>
                    <strong>Flavor Profile:</strong> {formatList(flavor_profile)}
                  </li>
                  <li>
                    <strong>Grind Option:</strong> {formatList(grind_option)}
                  </li>
                  <li>
                    For <strong>${price}</strong> only
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
    </motion.div>
  );
};

export default CoffeeCard;
