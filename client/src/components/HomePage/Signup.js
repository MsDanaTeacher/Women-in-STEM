import React, {useState} from 'react'
import Swal from 'sweetalert2';

export default function Signup({setUser, setShowLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    function handleSignUpSubmit(e){
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                profile_image: profileImage,
            }),
        }).then((r) => {
            setIsLoading(false);
            if(r.ok){
                r.json().then((user) => setUser(user));
                Swal.fire(
                    ({
                        text: 'Welcome to our community!',
                        imageUrl: 'https://cdn1.iconfinder.com/data/icons/science-206/128/science_avatar_experiment_female_education_Chemist_laboratory-512.png',
                        imageWidth: 100,
                        imageHeight: 100, 
                        confirmButtonColor: "#71FFE5", 
                      }
                      )
                  )
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
        })
        ;
    }
  return (
    <div className='signup-div'>
        <img src="images/woman.jpg" width="50%" height="auto"/>
        <div style={{display: "block", width:"40%", marginTop: '6vh'}}><div><h2 style={{color: "#71FFE5"}}>Welcome Educators!</h2><h4 className='signup-description'>Sign up today to start teaching your students about women in STEM!</h4></div><div></div>
        <form onSubmit={handleSignUpSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='signup-form'/><br />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='signup-form'/><br />
            <input type="text" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='Password confirmation' className='signup-form'/><br />
            <input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder='Profile image' className='signup-form'/><br />
            <button className='sign-in-button'>Sign Up!</button>
        </form>
        <p className='already-a-member'>Have an account? Log in <button onClick={() => setShowLogin(true)} className='sign-up-here-button'>here</button>!</p>
        </div>
    </div>
  )
}
