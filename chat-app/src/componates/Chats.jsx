import React from "react";

function Chats(props) {
  

  // if (search) {
  //   if (SearchEmpty) {
  //     return (
  //       <div className="chats">
  //         <div className="userChat">
  //           <h1>not found</h1>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="chats">
  //         <div className="userChat">
  //           <ReactLoading height={33} width={33} type={"balls"} color="#ddd" />
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  return (
    <div className="chats">
      <div className="userChat">
        <img src={props.result.photoURL.stringValue} alt="" />
        <div className="userChatInfo">
          <div className="titleRow">
            <span>{props.result.displayName.stringValue}</span>
          </div>

          <div className="subTitleRow">
            <p>Hey there i am using ChatsApp </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
