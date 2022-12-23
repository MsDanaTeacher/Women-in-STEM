import React from 'react'
import Swal from 'sweetalert2';

export default function BookTile({book, handleWishlistClick, user}) {

  function handleWishlistClick(book){
    if(user){
      fetch("/wishlists", {
        method: "POST",
        body: JSON.stringify({book_id: book.id, user_id: user.id}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((r) => {
        if(r.ok){
          r.json();
          Swal.fire(
            {
              text: 'Saved to wishlist!',
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
              text: 'This book is already on your wishlist!',
              imageUrl: 'https://cdn2.iconfinder.com/data/icons/bioengineering-astute-vol-1/512/Chemical_Reaction-512.png',
              imageWidth: 100,
              imageHeight: 100, 
              confirmButtonColor: "#DD6B55", 
            }
          )
        }
      })
    }
  }
  
  return (

   <div className='wishlist-tile-box'>
    <div className='outer-wishlist-tile-orange'></div>
        <img src={book.book_image} className='outer-wishlist-tile-orange each-wishlist-tile'/><br />
        <div className='wishlist-purchase-buttons'>
    <button onClick={() => handleWishlistClick(book)} className='wishlist-purchase-buttons'>Add to Wishlist</button><br />
    <a href={book.purchase} target="_blank" className='wishlist-purchase-buttons' style={{textDecoration: 'none'}}>Purchase</a>
    </div>
    </div>

  )
}
