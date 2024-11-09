import React from "react";
import { Menu } from "antd";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const handleProfile = (key) => {
    if (key === 'MyProfile') {
      router.push('/Dashboard/MyProfile'); // Correct path to MyProfile
    }
  };

  const handleCart = (key) => {
    if (key === 'Cart') { // Ensure the key matches the Menu.Item key
      router.push('/Dashboard/Cart'); // Correct path to Cart
    }
  };

  const handleShoppingHistory = (key) => {
    if (key === 'shoppingHistory') {
      // Define what happens when Shopping History is clicked
      console.log("Shopping History clicked");
    }
  };

  return (
    <div className="h-screen text-tahiti flex flex-col relative" style={{ width: "230px" }}>
      <div className="pt-20 relative flex items-center justify-center h-16">
        <Navbar isSidebar={true} />
      </div>
      <Menu mode="inline" className="font-semibold flex-1 overflow-y-auto bg-tahiti">
        <Menu.SubMenu key="manageProfile" title={<span>Manage My Profile</span>}>
          <Menu.Item key="MyProfile" onClick={() => handleProfile('MyProfile')}>
            <span>Profile</span>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="manageOrders" title={<span>My Orders</span>}>
          <Menu.Item key="cart" onClick={() => handleCart('Cart')}>
            <span>Cart</span>
          </Menu.Item>
          <Menu.Item key="shoppingHistory" onClick={() => handleShoppingHistory('shoppingHistory')}>
            <span>Shopping History</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;