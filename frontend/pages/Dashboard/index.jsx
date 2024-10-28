import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Head from "next/head";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Daily Roast Dashboard</title>
        <meta name="description" content="freshcoffee website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" alt="icon" href="/BASTAfavicon.png" />
      </Head>
      <div className="flex">
        <div className="flex-grow">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
