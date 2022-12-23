import React from 'react'

export default function WishlistTile({wishlist, user, handleDeleteWishlist}) {

  const eachWishlist = <div className='wishlist-tile-box'>
  <div className='outer-wishlist-tile-orange'></div>
  <img src={wishlist.book.book_image} className='outer-wishlist-tile-orange each-wishlist-tile'/><br />
  <div className='my-wishlist-purchase-buttons'>
  <a href={wishlist.book.purchase} target="_blank" style={{textDecoration: 'none', color: '#8a8a8a'}} className='wishlist-purchase-button'>Purchase</a><br />
  <button onClick={() => handleDeleteWishlist(wishlist)} className='remove-from-wishlist'>Remove from wishlist</button>
  </div>
</div>

  return (
    <>
      {eachWishlist}
    </>
  )
}
