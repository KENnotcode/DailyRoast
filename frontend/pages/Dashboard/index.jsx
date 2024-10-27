import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect } from "react";
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
      <div className="bg-sidebarcolor pb-[27px]">
        <div className="flex absolute">
          <Sidebar/>
          <div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
