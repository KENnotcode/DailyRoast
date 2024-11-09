import Image from "next/image";
import { Dropdown, Space, Badge, Menu, Modal, Button } from "antd"; // Import Modal and Button from antd
import {
  DownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Navlink from "./Navlink";
import { CoffeTypes, linkList } from "@/utils/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Navbar = ({ totalQuantity, isSidebar }) => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const MAX_DISPLAY_ITEMS = 5;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/session", { withCredentials: true });
        setIsLoggedIn(!!response.data.sessionId); // Check if sessionId exists
        if (response.data.sessionId) {
          const userResponse = await axios.get("/api/auth/profile", { withCredentials: true });
          setUser (userResponse.data);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

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
      setNavbar(true);
    }
  }, [isSidebar]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(data);
    }
  }, [totalQuantity]);

  const totalQuantityInCart = cartItems?.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const uniqueProducts = Array.from(
    new Set(cartItems.map((item) => item.name))
  );

  const additionalProductsCount =
    uniqueProducts.length > MAX_DISPLAY_ITEMS
      ? uniqueProducts.length - MAX_DISPLAY_ITEMS
      : 0;

  const scrollToHome = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#home").then(() => {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setIsModalVisible(true); // Show modal if not logged in
    } else {
      router.push("/Dashboard/MyProfile"); // Navigate if logged in
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLoginRedirect = () => {
    setIsModalVisible(false);
    router.push("/SignupLogin?mode=login");
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
                      {item.price.toFixed(2)}
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
      <Menu.Item key="profile" onClick={handleProfileClick}>
        Profile
      </Menu.Item>
      <Menu.Item key="login">
        <Link href={{ pathname: "/SignupLogin", query: { mode: "login" } }}>
          Login
        </Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link href={{ pathname: "/SignupLogin", query: { mode: "signup" } }}>
          Sign Up
        </Link>
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

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div style={{ padding: "20px", textAlign: "center" }}>
          <InfoCircleOutlined
            style={{ fontSize: "50px", color: "#ff0000", marginBottom: "10px" }}
          />
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Access Denied
          </ h2>
          <p style={{ marginBottom: "20px" }}>
            To view your profile, please log in to your account.
          </p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            className="pt-4"
          >
            <Button
              onClick={handleLoginRedirect}
              style={{ borderColor: "#d9d9d9" }}
            >
              Log In
            </Button>
            <Button type="primary" danger onClick={handleCancel}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
