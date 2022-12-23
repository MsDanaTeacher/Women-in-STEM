import React, {useState} from 'react'
import styles from "../Women/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

export default function EditProfile({user, setUser, setEditClicked}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [error, setError] = useState("");

    function handleEditProfileSubmit(e){
        e.preventDefault();
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                profile_image: profileImage,
            }),
        }).then((r) => {
            if(r.ok){
                r.json().then((user) => setUser(user));
                handleUserEdit();
                // setEditClicked(false);
            } else {
                r.json().then((error) => setError(error.error))
            }
        })
    }

    function handleUserEdit(){
        setPassword(user.password);
        setProfileImage(user.profile_image);
        setUsername(user.username);
    }
    
  return (
    <div>
        {/* <div className={styles.darkBG} onClick={() => setEditClicked(false)}> */}
 
 <div className={styles.centeredEdit}>
     <button className={styles.closeBtn} onClick={() => setEditClicked(false)}>
       <RiCloseLine style={{ marginBottom: "-3px" }} />
     </button>
     <div>
        {/* <div style={{display: "flex"}}>
         <h2>Edit Profile</h2>
         </div> */}
       </div>
       <div>
            <form onSubmit={handleEditProfileSubmit}>
            <div className='edit-and-save'>
            <h2 className='edit-profile-title'>Edit Profile</h2>
            <button className='save-button'>Save</button>
            </div>
            <div className='username-password-edit'>
            <div>
            <label className='edit-labels'>Username</label><br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='edit-input-boxes'></input>
            </div>
            <div>
            <label className='edit-labels'>Password</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='edit-input-boxes'></input>
            </div>
            </div>
            <label className='edit-profile-image'>Profile Image</label><br />
            <input type="profileImage" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} className='edit-profile-box'></input>
            {/* <button>Save</button> */}
            </form>

         </div>
   </div>
 </div>

  )
}
