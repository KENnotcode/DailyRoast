import Head from "next/head";
import Homepage from "../sections/home.jsx";
import OurMenu from "@/sections/menu.jsx";
import About from "@/sections/about.jsx";
import Footer from "@/sections/footer.jsx";
import { CartProvider } from "@/components/CartContext.jsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [cardLength, setCardLength] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0); // Add this line

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getter = localStorage.getItem("data");
      const parseData = JSON.parse(getter);
      setCardLength(parseData?.length || 0);
    }
  }, []);

  return (
    <CartProvider>
      <div className="relative">
        <Head>
          <title>Daily Roast - Calbayog</title>
          <meta name="description" content="website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Homepage cardLength={cardLength} />
        <OurMenu setCardLength={setCardLength} setTotalQuantity={setTotalQuantity} /> {/* Fix here */}
        <About />
        <Footer />
      </div>
    </CartProvider>
  );
}