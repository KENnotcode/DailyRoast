import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import Sidebar from "@/components/sidebar/Sidebar";
import Head from "next/head";
import axios from 'axios';

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null); // Start with null or an object
  const [loading, setLoading] = useState(true); // Optional: Loading state

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // Adjust the API endpoint as needed
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProfileData(response.data[0]); // Get the first user or handle as needed
        } else {
          console.error('Received data is not an array or is empty:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, []);

  // Optional: Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  // Handle case where profileData is not available
  if (!profileData) {
    return <div>No user data available.</div>;
  }

  return (
    <>
      <Head>
        <title>Daily Roast My Profile</title>
        <meta name="description" content="Fresh coffee website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/BASTAfavicon.png" />
      </Head>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-[30px]">
          <div className="mt-[80px] rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
            <form className="space-y-4 max-w-lg">
              <Input
                placeholder="First Name"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
              />
              <Input
                placeholder="Last Name"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
              <div className="mt-6 flex space-x-4">
                <Button className="bg-red-500 text-white">Cancel</Button>
                <Button type="submit" className="bg-blue-500 text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


export default MyProfile;
