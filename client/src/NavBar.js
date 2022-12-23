import React from 'react'
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function NavBar({user, setUser}) {
  const history = useHistory();

  function handleLogoutClick(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if(r.ok){
        setUser(null);
      }
    });
    history.push("/")
  }
  
  return (
    <>
      {user ?
        <div className='header'>
          <h3 className='logo'>Women in STEM</h3>
            <Link to="/" style={{textDecoration: 'none', color: '#8a8a8a'}} className='hover-underline-animation'>Home</Link>
            <Link to="/women" style={{textDecoration: 'none', color: '#8a8a8a'}} className='hover-underline-animation'>Rad Women</Link>
            <Link to="/books" style={{textDecoration: 'none', color: '#8a8a8a'}} className='hover-underline-animation'>Literature</Link>
            <Link to="/mycollection" style={{textDecoration: 'none', color: '#8a8a8a'}} className='hover-underline-animation'>My Collection</Link>
            <button onClick={handleLogoutClick} className='logout-button'>Logout</button> 
       </div>
       : 
       <div className='login-page-navbar'>
       <h3 className='just-logo'>Women in STEM</h3>
       </div>
      }
     </>
  )
}
