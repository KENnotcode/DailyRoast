import React, { useState } from "react";
import { Menu } from "antd";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const handleMenuClick = (key) => {
    if (key === 'MyProfile') {
      router.push('/Dashboard/MyProfile'); // Redirect to the MyProfile page
    }
    // Add other routes here as needed
    console.log(`Navigating to: ${key}`);
  };

  return (
    <div
      className="h-screen text-tahiti flex flex-col relative"
      style={{ width: "230px" }}
    >
      <div className=" pt-20 relative flex items-center justify-center h-16">
        <div className="h-screen text-tahiti flex flex-col relative" style={{ width: "230px" }}>
          <Navbar isSidebar={true} />
        </div>
      </div>
      <Menu mode="inline" className="font-semibold flex-1 overflow-y-auto bg-tahiti">
        <Menu.SubMenu key="manageProfile" title={<span>Manage My Profile</span>}>
          <Menu.Item key="profile" onClick={() => handleMenuClick('MyProfile')}>
            <span>Profile</span>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="manageOrders" title={<span>My Orders</span>}>
          <Menu.Item key="cart" onClick={() => handleMenuClick('cart')}>
            <span>Cart</span>
          </Menu.Item>
          <Menu.Item key="shoppingHistory" onClick={() => handleMenuClick('shoppingHistory')}>
            <span>Shopping History</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;