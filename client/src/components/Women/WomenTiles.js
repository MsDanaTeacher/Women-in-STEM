import React, { useState } from 'react'
import Modal from "./Modal";
import Swal from 'sweetalert2';


export default function WomenTiles({woman, user}) {

  const [isOpen, setIsOpen] = useState(false);

  function handleClick(woman){
    if(user){
    fetch("/my_collections", {
      method: "POST",
      body: JSON.stringify({woman_id:woman.id, user_id: user.id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((r) => {
      if(r.ok) {
        r.json();
        Swal.fire(
          {
            text: 'Saved to collection!',
            imageUrl: 'https://cdn1.iconfinder.com/data/icons/science-206/128/science_avatar_experiment_female_education_Chemist_laboratory-512.png',
            imageWidth: 100,
            imageHeight: 100, 
            confirmButtonColor: "#71FFE5", 
          }
        )
      } else {
        Swal.fire(
          {
            title: 'Oops!',
            text: 'This awesome woman is already in your collection!',
            imageUrl: 'https://cdn2.iconfinder.com/data/icons/bioengineering-astute-vol-1/512/Chemical_Reaction-512.png',
            imageWidth: 100,
            imageHeight: 100, 
            confirmButtonColor: "#DD6B55", 
          }
        )
      }
    }
    )
    }
  }
  
  return (
    <div className='women-tile-box'>
    <div className='outer-women-tile-orange'></div>
    <div className="outer-women-tile-orange each-tile">
        <img src={woman.image_path} className='women-tile-image'/>
        <p className='line'>__________________</p>
        <p className='woman-tile-name'>{woman.name}</p>
        <button className='primaryBtn woman-tile-button' onClick={() => setIsOpen(true)}>Details</button><br />
        <button onClick={() => handleClick(woman)} className='woman-tile-button'>Save to Collection</button>
        {isOpen && <Modal setIsOpen={setIsOpen} woman={woman}/>}
    </div>
    </div>
  )
}
