import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from "react-loading";

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 

  const handleSubmbit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      if (email.trim() === "" || password.trim() === "") {
        return;
      }
      setError(false);
      setLoading(true);
      const rep = await signInWithEmailAndPassword(auth, email, password);
      console.log(rep);

      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
      
        setError(true)
      } else {
        console.log("Some error");
      }
      // console.log(".............................................");
      // console.log(err);
      // setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Login</span>
        <span className="title">ChatsApp</span>

        <form onSubmit={handleSubmbit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" autoComplete="on" />
          {loading ? (
            <button style={{ cursor: "not-allowed", background: "#6b6b6b" }} disabled={true} >
              {" "}
              <ReactLoading
                height={33}
                width={33}
                type={"balls"}
                color="#fff"
              />
            </button>
          ) : (
            <button>sign in</button>
          )}

          {error && (
            <span style={{ color: "red", margin: "auto" }}>
              Invalid email or password
            </span>
          )}
           {/* <span style={{ color: "red", margin: "auto" }}>
              Something went wrong
            </span> */}
        </form>
        <p>
          Don't have an account ? <Link to="/Register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
