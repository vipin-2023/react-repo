import React from 'react';
import Chat from "../componates/Chat";
import Sidebar from "../componates/Sidebar";
function Home() {
  
  
  return (
   <div className="home">
    <div className="container">
        <Sidebar/>
        <Chat/>
    </div>
   </div>
  )
}

export default Home