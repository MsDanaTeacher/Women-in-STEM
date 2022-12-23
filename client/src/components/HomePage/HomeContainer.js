import React, {useState} from 'react'
import Login from "./Login";
import Signup from './Signup';

export default function HomeContainer({user,setUser}) {
  const [showLogin, setShowLogin] = useState(true);

  
  return (
    <div>
      {showLogin ?
      <Login user={user} setUser={setUser} setShowLogin={setShowLogin}/> :
      <Signup setUser={setUser} setShowLogin={setShowLogin}/>
}
    </div>
  )
}
