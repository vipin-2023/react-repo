import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";

import ChatsSection from "./ChatsSection";

function Sidebar() {
  return (
    <div className="sideBar">
      <Navbar />
      <Search />
      <div className="chatsContainer">
        <ChatsSection />
      </div>
    </div>
  );
}

export default Sidebar;
