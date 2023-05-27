import { Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useContext } from "react";

import Logout from "../assets/more.png";
import { auth } from "../backend/firebase";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { currentUser } = useContext(AuthContext);
  

  // useEffect(() => {
  //   console.log("Profile:-", currentUser?.photoURL);
  // }, [currentUser]);

  return (
    <div className="navBar">
      <div className="user">
        <img id="profilePic" src={currentUser.photoURL} />
      </div>
      <img onClick={handleClick} id="logOut" src={Logout} alt="" />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => signOut(auth)}>log out</MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
