import React, {useState, useEffect} from 'react'
import BookTile from './BookTile';
import WishlistTile from './WishlistTile';


export default function BookContainer({user}) {

  const [bookData, setBookData] = useState([])
  const [displayBookData, setDisplayBookData] = useState([])
  const [titleArray, setTitleArray] = useState([])
  const [search, setSearch] = useState("")

  const [isChecked, setIsChecked] = useState(false)
  const [alphabetical, setAlphabetical] = useState([])
  const [wishlistClicked, setWishlistClicked] = useState(false)
  const [wishlistData, setWishlistData] = useState([])
  
  function onBookSearch(){
    let updatedBooks = titleArray.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))
    setDisplayBookData(updatedBooks)
  }
  console.log(displayBookData.sort().title)
  useEffect(() => {
    fetch("/books")
    .then((r) => r.json())
    .then((data) => {
      setBookData(data);
      setDisplayBookData(data);
      setTitleArray(data);
    })
    setSearch("");
  }, [])

  useEffect(() => {
    fetch("/wishlists")
    .then((r) => r.json())
    .then((data) => {
      setWishlistData(data)
    })
  }, [])
  useEffect(onBookSearch, alphabeticClicked, [search, titleArray, isChecked])
  // useEffect(onBookSearch, [search, titleArray])

  function handleBookSearchChange(e){
    setSearch(e.target.value)
  }

  function handleWishlist(){
    setWishlistClicked(prev => !prev)
  }
  function alphabeticClicked(e){
    setIsChecked(prev => !prev)
    if(!isChecked){
      setAlphabetical([...bookData])
      alphabetical.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
      
        return textA.localeCompare(textB);
      });
      // console.log(alphabetical)
      setDisplayBookData([...alphabetical])
      console.log(displayBookData)
  } 
  if(isChecked){
    setAlphabetical([...bookData])
    setDisplayBookData([...alphabetical])
    console.log(displayBookData)
  }
}
function handleDeleteWishlist(wishlist){
  let confirmDelete = window.confirm("Are you sure you want to remove this book from your wishlist?");
  if(confirmDelete){
    fetch(`/wishlists/${wishlist.book.id}`, {
      method: "DELETE",
    });
    updatedWishlist(wishlist);
  }
}

function updatedWishlist(wishlist){
  const rerenderedWishlist = wishlistData.filter((el) => el.id !== wishlist.id);
  setWishlistData(rerenderedWishlist);
}

  return (
    <div>
     {wishlistClicked 
     ?
     <>
     <button onClick={handleWishlist} className='my-wishlist-back-button'>back</button><br /><div className='my-wishlist'><p>{user.username}'s Wishlist</p></div>
     <div className="women-container">
     {wishlistData.map((el) => {
      return (<WishlistTile key={el.id} wishlist={el} user={user} handleDeleteWishlist={handleDeleteWishlist}/> )
     })
}
</div>
     </>
     : 
     <>
     <div>
     <div className='wishlist-button-and-icon'>
     <img src="images/wishlist.png" className='wishlist-image'/>
     <button onClick={handleWishlist} className='my-wishlist-button'>My Wishlist</button>
     </div>
     <br />
     <p className='wishlist-container-description'>Find great read aloud books to add to your classroom library!</p>
     </div>
    <div className='search-and-alphabet-checkbox'>
      <input type="search" placeholder='Search books...' value={search} onChange={handleBookSearchChange} className='wishlist-container-search'/>
      <p className='alphabet-sort-description'>Sort alphabetically</p><input type="checkbox" onChange={alphabeticClicked} className='wishlist-checkbox'/>
    </div>
      <div className="wishlist-container">
      {displayBookData.map((el) => {
        return ( <BookTile key={el.id} book={el} user={user}/> )
      })}
      </div>
      </>}
    </div>
  )
}
