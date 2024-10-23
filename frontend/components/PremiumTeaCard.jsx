import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const PremiumTeaCard = ({
  product,
  active,
  handleClick,
  setCardLength,
  addToCart
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const { id, image, image_url, name, price, description, flavor } = product;

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
        active ? "flex-[10]" : "flex-[2]"
      } relative flex items-center justify-center min-w-[250px] h-[450px] cursor-pointer bg-minicolor transition-[flex] ease-in-out duration-700 overflow-hidden border-gray-300 border rounded-lg shadow-lg`}
      onClick={openPopup}
    >
      {/* Tea Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-xl"
          style={{ transform: "scale(1)" }}
        />
      </div>

      {/* Product Details */}
      <div
        className={`absolute bottom-0 left-0 w-full p-4 rounded-b-xl bg-[rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col`}
        style={{ height: "220px" }}
      >
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-[30px] font-semibold text-tahiti">{name}</h2>
            <p className="text-[20px] font-extralight text-tahiti mb-4">${price}</p>
          </div>

          <div className="flex justify-end mt-auto">
            <button
              className="flex justify-center items-center bg-addtocartcolor px-4 py-2 rounded-lg hover:text-tahiti transition duration-300 mb-3"
              onClick={(e) => {
                e.stopPropagation(); // Prevent popup from opening when adding to cart
                handleAddToCart();
              }}
            >
              <Image
                src="/ADDTUCARTicon.png"
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
          onClick={closePopup}
        >
          <div
            className="bg-tahiti rounded-lg shadow-lg w-[797px] h-[494px] flex relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Product Image */}
            <div className="w-1/2 h-full p-4 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center" style={{ transform: "scale(1)" }}>
                <Image
                  src={image_url}
                  alt={name}
                  width={1000}
                  height={1000}
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
                    <strong>Flavor:</strong> {flavor}
                  </li>
                  <li>
                    For <strong>${price}</strong> only
                  </li>
                </ul>
              </div>

              <button
                className="bg-red text-tahiti px-4 py-2 rounded-lg mt-4 self-end"
                onClick={closePopup}
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

export default PremiumTeaCard;