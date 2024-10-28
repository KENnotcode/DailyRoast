import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import Sidebar from "@/components/sidebar/Sidebar";
import Head from "next/head";

const MyProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleSaveChanges = () => {
    // Implement save changes logic here
    console.log("Profile changes saved");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Head>
        <title>Daily Roast My Profile</title>
        <meta name="description" content="freshcoffee website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/BASTAfavicon.png" />
      </Head>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-[30px]">
          <div className=" mt-[80px] rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Edit Your Profile</h2>
            <div className="space-y-4 max-w-lg">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email" />
              <Input.Password placeholder="Current Password" />
              <Input.Password placeholder="New Password" />
              <Input.Password placeholder="Confirm New Password" />
            </div>
            <div className="mt-6 flex space-x-4">
              <div className="">
                <div className="flex flex-row text-dark">
                  <span
                    onClick={handleCancel}
                    className="flex justify-center p-2 rounded-lg hover:bg-red hover:text-tahiti text-[13px]"
                  >
                    Cancel
                  </span>
                  <div className="flex flex-row text-dark">
                    <span onClick={handleSaveChanges} className="flex justify-center p-2 rounded-lg hover:bg-mlue hover:text-tahiti text-[13px]">Save Changes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;