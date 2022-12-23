import React, { useState, useEffect } from "react";
import CollectionTiles from "./CollectionTiles";
import KwlChart from "./KwlChart";
import EditProfile from "./EditProfile";

export default function CollectionContainer({ user, setUser }) {
  //holds the full set of data
  const [data, setData] = useState([]);
  //holds the data being displayed
  const [displayData, setDisplayData] = useState([]);
  //creating state for the search input
  const [search, setSearch] = useState("");
  //data filtered by name
  const [nameArray, setNameArray] = useState([]);

  const [womanClicked, setWomanClicked] = useState(false);
  const [chosenWoman, setChosenWoman] = useState([])
  const [editClicked, setEditClicked] = useState(false)
 

  function handleWomanClick(woman){
    setWomanClicked(prev => !prev)
    setChosenWoman(woman)
    console.log(chosenWoman , 'woman clicked')
    // console.log('woman clicked')
  }

  function handleBackClick(){
    setWomanClicked(prev => !prev)
  }
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  // filters displayed data based on search string
  function onSearch() {
    let newArray = nameArray.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayData(newArray);
  }

  function handleDelete(woman) {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if(confirmDelete) {
      fetch(`/my_collections/${woman.id}`, {
        method: "DELETE",
      });
      updatedCollection(woman);
    }
  }

  function updatedCollection(woman) {
    const rerenderedCollection = displayData.filter((el) => el.id !== woman.id);
    setDisplayData(rerenderedCollection);
  }

  useEffect(() => {
    fetch("/my_collections")
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        setDisplayData(data);
        setNameArray(data);
      });
    setSearch("");
  }, []);
  // console.log(data)
  useEffect(onSearch, [search, nameArray]);
  let profile = { ...user };

  function handleEditClicked(){
    setEditClicked(prev => !prev)
  }

  return (
    <>
    {womanClicked ? null : <div className="profile-div">
    <img
        src={profile.profile_image}
        style={{ borderRadius: "50%" }}
        className='profile-avatar'
      />
      <div className="edit-profile-div">
      <h2 className="name-collection">{profile.username}'s Collection</h2>
      <img onClick={handleEditClicked} className='edit-info-button' src='images/editicon.png'/>
      </div>
      <div>
        <input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="my-collection-search-bar"
        />
      </div>
      </div>}
    
      <div className="women-container">
        {womanClicked ? <KwlChart chosenWoman={chosenWoman} handleBackClick={handleBackClick} user={user}/> : displayData.map((el) => {
          return (
            <CollectionTiles
              key={el.woman_id}
              woman={el}
              handleDelete={handleDelete}
              user={user}
              handleWomanClick={handleWomanClick}
            />
          );
        })}
        {editClicked && <EditProfile user={user} setUser={setUser} setEditClicked={setEditClicked}/>}
      </div>
    </>
  );
}
