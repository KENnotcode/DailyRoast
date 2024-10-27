import Image from "next/image";
import { Dropdown, Space, Badge, Menu } from "antd";
import {
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons"; // Import UserOutlined
import Navlink from "./Navlink";
import { CoffeTypes, linkList } from "@/utils/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ totalQuantity, isSidebar }) => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const MAX_DISPLAY_ITEMS = 5;

  useEffect(() => {
    if (!isSidebar) {
      const changeBackground = () => {
        setNavbar(window.scrollY >= 100);
      };

      window.addEventListener("scroll", changeBackground);

      return () => {
        window.removeEventListener("scroll", changeBackground);
      };
    } else {
      // If in sidebar, set navbar to true to have a static background
      setNavbar(true);
    }
  }, [isSidebar]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(data);
    }
  }, [totalQuantity]);

  const totalQuantityInCart =
    cartItems && Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
      : 0;

  // Get unique product names from cartItems
  const uniqueProducts = Array.from(
    new Set(cartItems.map((item) => item.name))
  );

  // Count of additional products beyond the maximum display limit
  const additionalProductsCount =
    uniqueProducts.length > MAX_DISPLAY_ITEMS
      ? uniqueProducts.length - MAX_DISPLAY_ITEMS
      : 0;

  const scrollToHome = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartMenu = (
    <Menu>
      <div id="mouse">
        {cartItems.length > 0 ? (
          uniqueProducts.slice(0, MAX_DISPLAY_ITEMS).map((itemName) => {
            const item = cartItems.find((i) => i.name === itemName);
            return (
              <Menu.Item key={itemName}>
                <div className="flex justify-between gap-4">
                  <p>{itemName}</p>
                  <div className="flex gap-1 bg-[#b77b2e] rounded-md p-1 w-16">
                    <p className="flex justify-end px-3">
                      {item.price.toFixed(2)} {/* Display item price */}
                    </p>
                  </div>
                </div>
              </Menu.Item>
            );
          })
        ) : (
          <Menu.Item>No items in cart</Menu.Item>
        )}
      </div>
      <Menu.Item key="more-products">
        <div className="pl-2 flex justify-between items-center">
          <span>
            {cartItems.length > 0
              ? `${additionalProductsCount} More Product${
                  additionalProductsCount === 1 ? "" : "s"
                } in the Cart`
              : "0 Products in the Cart"}
          </span>
          <Link href="/cart">
            <button className="bg-addtocartcolor text-black hover:text-tahiti px-4 py-2 rounded-md ml-2">
              View My Shopping Cart
            </button>
          </Link>
        </div>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link href="/SignupLogin">Login</Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link href="/SignupLogin">Sign Up</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-10 ${
        navbar ? "bg-dark" : "bg-opacity-0"
      } duration-700 backdrop-blur-md bg-opacity-60 font-semibold text-tahiti pr-12 pl-4 py-2 pt-1 pb-1`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/transparentGIF.gif"
            alt="logo"
            width={135}
            height={135}
            onClick={scrollToHome}
            className="cursor-pointer duration-300 hover:scale-150"
          />
          <span
            className="text-2xl font-bold ml-2 cursor-pointer"
            onClick={scrollToHome}
          >
            Daily Roast
          </span>
        </div>
        <div>
          <ul className="flex gap-6 text-lg text-tahiti">
            {linkList.map((link) => {
              if (link.title === "Menu") {
                return (
                  <Dropdown
                    key={link.id}
                    arrow
                    overlay={
                      <Menu>
                        {CoffeTypes.map((data) => (
                          <Menu.Item key={data.id}>
                            <Navlink href={data.href} title={data.title} />
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                  >
                    <Space className="cursor-pointer text-white hover:text-menuitemcolor">
                      Menu <DownOutlined />
                    </Space>
                  </Dropdown>
                );
              }
              return (
                <Navlink key={link.id} href={link.href} title={link.title} />
              );
            })}
            {router.pathname !== "/cart" && (
              <div className="flex gap-2">
                <Dropdown overlay={cartMenu}>
                  <div className="hover:scale-150 transition-transform duration-300 ease-in-out mr-5">
                    <Badge count={totalQuantityInCart} offset={[10, 0]}>
                      <ShoppingCartOutlined
                        style={{ fontSize: 24, color: "white" }}
                      />
                    </Badge>
                  </div>
                </Dropdown>
                <Dropdown overlay={userMenu}>
                  <div className="hover:scale-150 transition-transform duration-300 ease-in-out">
                    <UserOutlined style={{ fontSize: 24, color: "white" }} />
                  </div>
                </Dropdown>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
