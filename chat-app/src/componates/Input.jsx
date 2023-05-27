import React from "react";

import Attach from "../assets/attach-file.png";
// import Mic from "../assets/microphone.png";
import Smile from "../assets/smile.png";
import Send from "../assets/send.png";

function Input() {
  return (
    <div className="chatBox">
      <img id="smile" src={Smile} alt="" />
      <img id="attach" src={Attach} alt="" />
      <input placeholder="Type a message" type="text" name="" id="" />

      <img id="send" src={Send} alt="" />
    </div>
  );
}

export default Input;
