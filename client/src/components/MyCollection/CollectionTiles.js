import React, {useState} from 'react'
// import { Link } from "react-router-dom"
import CollectionModal from "./CollectionModal";
import KwlChart from './KwlChart';

export default function CollectionTiles({key, woman, handleDelete, user, handleWomanClick}) {

  const [isOpen, setIsOpen] = useState(false);
  const [notesClicked, setNotesClicked] = useState(false);
  const [womanChosen, setWomanChosen] = useState([])

  function handleNotesClick(woman){
    setNotesClicked(prev => !prev);
  }

  const allMyCollection = <div className='women-tile-box'>
  <div className='outer-women-tile-orange'></div>
  <div className="outer-women-tile-orange each-tile">
  <button onClick={() => handleDelete(woman)}className="remove-from-collection-button">X</button><br />
  <img src={woman.image_path} className='women-tile-image'/>
  <p className='woman-tile-name'>{woman.name}</p>
  <button className='woman-tile-button' onClick={() => setIsOpen(true)}>Details</button>
  {/* <Link to={`/womannotes/${user.id}/${woman.id}`} state={{ name: woman.name}} onClick={() => handleNotesClick(woman)}><p className="primaryBtn">Notes</p></Link> */}
  <p onClick={() => handleWomanClick(woman)} className='notes-button'>Notes</p>
  {isOpen && <CollectionModal setIsOpen={setIsOpen} woman={woman}/>}
  </div>
</div>


  return (
    <>
    {/* {notesClicked ? <KwlChart user={user} stuff={woman} key={key}/> : allMyCollection} */}
    {allMyCollection}
    </>
  )
}
