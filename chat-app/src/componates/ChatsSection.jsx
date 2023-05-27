import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../assets/profile_image.jpg";

import { useDispatch } from "react-redux";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { db } from "../backend/firebase";

function ChatsSection() {
  // const { reduxIsLoading, reduxIsError, reduxSearchResult } = useSelector(
  //   (state) => state.search
  // );
  const { isLoading, searchResult, isError, isFieldEmpty } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log("Current data:", doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log("##############");
  console.log(Object.entries(chats));

  //handle Select........
  const handleSelect = async () => {
    console.log("Selected....");
    const conbinedId =
      currentUser.uid > searchResult.fields.uid.stringValue
        ? currentUser.uid + searchResult.fields.uid.stringValue
        : searchResult.fields.uid.stringValue + currentUser.uid;
    console.log(conbinedId);
    try {
      console.log("try block started ....");
      const res = await getDoc(doc(db, "chats", conbinedId));
      console.log("selected tring..");
      console.log(res);
      console.log("selected tring end..");
      if (!res.exists()) {
        await setDoc(doc(db, "chats", conbinedId), { messages: [] });
        console.log("setDoc..");
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [conbinedId + ".userInfo"]: {
            uid: searchResult.fields.uid.stringValue,
            displayName: searchResult.fields.displayName.stringValue,
            photoURL: searchResult.fields.photoURL.stringValue,
          },
          [conbinedId + ".date"]: serverTimestamp(),
        });
        console.log("updateDoc");
        await updateDoc(
          doc(db, "userChats", searchResult.fields.uid.stringValue),
          {
            [conbinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [conbinedId + ".date"]: serverTimestamp(),
          }
        );
      }
      dispatch(isFieldEmpty({value:true}));
    } catch (err) {
      console.log("Error :", err);
    }
  };

  if (isLoading) {
    return (
      <div className="chatsSection">
        <span>Loading...</span>
      </div>
    );
  } else if (searchResult && !isFieldEmpty) {
    return (
      <div className="chatsSection">
        <div className="chats">
          <div className="userChat" onClick={handleSelect}>
            <img src={searchResult.fields.photoURL.stringValue} alt="" />
            <div className="userChatInfo">
              <div className="titleRow">
                <span>{searchResult.fields.displayName.stringValue}</span>
              </div>
              <div className="subTitleRow">
                <p>Hey there i am using ChatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div className="chatsSection">
        <span>Error</span>
      </div>
    );
  } else {
    return (
      <>
        {Object.entries(chats).map((data) => {
          
          return (
            <div className="chatsSection">
              <div className="chats">
                <div className="userChat">
                  <img src={data[1].userInfo?.photoURL} alt="" />
                  <div className="userChatInfo">
                    <div className="titleRow">
                      <span>{data[1].userInfo?.displayName}</span>
                      {/* <p className="messageTime">12:30</p> */}
                    </div>

                    <div className="subTitleRow">
                      <p>Hey there i am using ChatsApp </p>
                      {/* <span className="messageCount">23</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          console.log(data[1].userInfo.photoURL);
        })}
      </>
    );
  }
}

export default ChatsSection;
