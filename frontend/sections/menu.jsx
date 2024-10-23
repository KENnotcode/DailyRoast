import React, { useEffect, useState } from "react";
import Section from "@/components/Section";
import { RunningText, TitlePage } from "@/components/TypingText";

import CoffeeCard from "@/components/CoffeeCard";
import HotcoffeeCard from "@/components/HotCoffeeCard";
import PremiumTeaCard from "@/components/PremiumTeaCard";

import hotCoffeeProducts from "@/constant/hotcoffeedata";
import premiumTea from "@/constant/premiumteadata";

const OurMenu = ({ setTotalQuantity, setCardLength }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [hotcoffeeActive, setHotcoffeeActive] = useState(null);
  const [premiumTeaActive, setPremiumTeaActive] = useState(null);
  
  // Function to add items to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotalQuantity((prevQuantity) => prevQuantity + 1); // Update the total quantity
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, item])); // Update local storage
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
    setTotalQuantity(storedItems.length); // Update total quantity from local storage
  }, []);

  useEffect(() => {
    fetch("https://fake-coffee-api.vercel.app/api") // Ensure this is a correct API URL
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <>
      {/* Coffee Menu Section */}
      <Section id="coffee-menu">
        <RunningText />
        <TitlePage title="Coffee Menu" />
        <div id="coffee-menu" style={{ overflowX: "auto" }}>
          <div className="mt-[40px] flex flex-row min-h-[70vh] gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <CoffeeCard
                  key={product.id}
                  {...product}
                  active={activeProduct === product.id}
                  handleClick={() => setActiveProduct(product.id)}
                  setCardLength={setCardLength}
                  setTotalQuantity={setTotalQuantity}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        </div>
      </Section>

      {/* Premium Tea Section */}
      <Section id="premiumtea">
        <RunningText />
        <TitlePage title="Premium Tea" />
        <div id="premiumtea" style={{ overflowX: "auto" }}>
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {premiumTea.length > 0 ? (
              premiumTea.map((product) => (
                <PremiumTeaCard
                  key={product.id}
                  product={product}
                  active={premiumTeaActive === product.id}
                  handleClick={() => setPremiumTeaActive(product.id)}
                  setCardLength={setCardLength}
                  setTotalQuantity={setTotalQuantity}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <p>Loading premium tea produasdcts...</p>
            )}
          </div>
        </div>
      </Section>

      {/* Hot Coffee Section */}
      <Section id="hotcoffee">
        <RunningText />
        <TitlePage title="Hot Coffee" />
        <div id="hotcoffee" style={{ overflowX: "auto" }}>
          <div className="mt-[50px] flex flex-row min-h-[70vh] gap-2">
            {hotCoffeeProducts.length > 0 ? (
              hotCoffeeProducts.map((product) => (
                <HotcoffeeCard
                  key={product.id}
                  product={product}
                  active={hotcoffeeActive === product.id}
                  handleClick={() => setHotcoffeeActive(product.id)}
                  setCardLength={setCardLength}
                  setTotalQuantity={setTotalQuantity}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <p>Loading hot coffee products...</p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default OurMenu;
