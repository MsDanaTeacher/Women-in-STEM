import React, { useState, useEffect } from 'react'
import WomenTiles from './WomenTiles'

export default function WomenContainer({user}) {
  //holds the full set of data
  const [data, setData] = useState([])
  //holds the data being displayed
  const [displayData, setDisplayData] = useState([])
  //creating state for the search input
  const [search, setSearch] = useState("")
  //data filtered by name
  const [nameArray, setNameArray] = useState([])

  function handleSearchChange(e){
    setSearch(e.target.value)
  }
  
  //filters displayed data based on search string
  function onSearch(){
    let newArray = nameArray.filter((el) => 
    el.name.toLowerCase().includes(search.toLowerCase()))
    setDisplayData(newArray)
  }

  useEffect(() => {
    fetch("/women")
    .then((r) => r.json())
    .then((data) => {
      setData(data)
      setDisplayData(data)
      setNameArray(data)
      })
      setSearch("");
  }, [])
  
  useEffect(onSearch, [search, nameArray]);
  
  return (
    <div className='women-page-container'>
      <div>
      <p className='women-container-description'>Learn about awesome women in STEM. Save them to your collection to read about them later!</p>
      <input type="search" value={search} onChange={handleSearchChange} placeholder="Search..." className='women-container-search'/>
      </div>
      <div className='women-container'>
      {displayData.map((el) => (
        <WomenTiles key={el.name} woman={el} user={user}/>
      ))}
      </div>
    </div>
  )
}
