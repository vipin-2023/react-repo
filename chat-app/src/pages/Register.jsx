import React, { useState } from "react";
import Add from "../assets/photo.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../backend/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Compressor from "compressorjs";
function Register() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [upload, setUpload] = useState(false);

  const navigate = useNavigate();

  const handleSubmbit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log("file :");
    console.log(file);
    try {
      if (
        displayName.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
      ) {
        return;
      }
      console.log("..............");
      console.log(displayName);

      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      new Compressor(file, {
        convertSize: 20,

        quality: 0.38, // 0.6 can also be used, but its not recommended to go below.
        success: (result) => {
          setLoading(true);
          console.log("compress result :");
          console.log(result);
          const uploadTask = uploadBytesResumable(storageRef, result);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              console.log(snapshot.state);
              // switch (snapshot.state) {
              //   case "paused":
              //     setUpload(true);
              //     console.log("Upload is paused");
              //     break;
              //   case "running":
              //     setUpload(true);
              //     console.log("Upload is running..");
              //     break;

              //   default:
              //     console.log("default...");
              //     break;
              // }
              // if(progress===100){
              //   navigate("/");

              // }
            },
            (error) => {
              setUploadError(true);
              console.log("Error while uploading...");
            },
            () => {
              setLoading(true);
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  console.log("Inside 1");
                  updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  })
                    .then(
                      console.log("Inside 2"),
                      setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                      })
                    )
                    .then(
                      console.log("Inside 3"),
                      setDoc(doc(db, "userChats", res.user.uid), {}));
                  console.log("getDowloadURL ....");

                  console.log("setDoc ....users");

                  console.log("setDoc ....userChats");
                  navigate("/");
                }
              );
            }
          );
        },
      });
    } catch (error) {
      setError(true);
      setLoading(false);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Register</span>
        <span className="title">ChatsApp</span>

        <form onSubmit={handleSubmbit}>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" autoComplete="on" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label disabled={upload} htmlFor="file">
            <img src={Add} alt="" />
            <span>Add Your Profile Pick</span>{" "}
          </label>
          {loading ? (
            <button
              style={{ cursor: "not-allowed", background: "#6b6b6b" }}
              disabled={true}
            >
              {" "}
              <ReactLoading
                height={33}
                width={33}
                type={"balls"}
                color="#fff"
              />
            </button>
          ) : (
            <button>sign up</button>
          )}
          {error && (
            <span style={{ color: "red", margin: "auto" }}>
              Something went wrong
            </span>
          )}
          {uploadError && (
            <span style={{ color: "red", margin: "auto" }}>upload failed</span>
          )}
        </form>
        <p>
          You do have an account ? <Link to="/Login">Log in </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
