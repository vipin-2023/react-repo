import React from "react";

import Profile from "../assets/profile_image.jpg";
import More from "../assets/more.png";
import Input from "./Input";

import SearchIcon from "../assets/search_icon.png";
import Messages from "./Messages";

function Chat() {
  return (
    <div className="chat">
      <div className="chatHeader">
        <div className="chatInfo">
          <img src={Profile} alt="" />
          <div className="chatProfileText">
            <span>Name Long long long</span>
            <span id="lastSeen">last seen reciently</span>
          </div>
        </div>
        <div className="chatIcons">
          <img src={SearchIcon} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  );
}

export default Chat;
