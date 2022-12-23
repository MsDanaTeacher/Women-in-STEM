import React, {useState} from 'react'
import Welcome from './Welcome';
import Swal from 'sweetalert2';

export default function Login({user, setUser, setShowLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        .then((r) => {
            setIsLoading(false);
            if(r.ok) {
                r.json().then((user) => setUser(user)).then(setUsername(""), setPassword(""));
            } else {
                r.json().then((err) => setErrors(err.errors));
                Swal.fire({
                    title: 'Oops!',
                    text: 'Please fill in all required fields!',
                    imageUrl: 'https://cdn2.iconfinder.com/data/icons/bioengineering-astute-vol-1/512/Chemical_Reaction-512.png',
                    imageWidth: 100,
                    imageHeight: 100, 
                    confirmButtonColor: "#DD6B55", 
                  }
                  )
            }
        });
    }
  return (
    <div className='login-div'>
        <img src="images/woman.jpg" width="50%" height="auto"/>
        {!user ?<div style={{display: "block", width:"40%", marginTop: '6vh'}}><div><h2 style={{color: "#71FFE5"}}>Hey, Teacher!</h2><h4 className='login-description'>You're doing great work. Keep educating your students about women in STEM!</h4></div><div><form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className='login-form' style={{marginTop: '1vh'}}/><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='login-form'/><br />
            <button className='sign-in-button'>Sign In</button>
            <p className='not-a-member'>Not a member? Sign up <button onClick={() => setShowLogin(false)} className='sign-up-here-button'>here</button>!</p>
        </form>
        </div>
        </div>
        :
        <Welcome username={user.username}/>
  }
    </div>
  )
}
