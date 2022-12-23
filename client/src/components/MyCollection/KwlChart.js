import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function KwlChart({ chosenWoman, user, handleBackClick }) {
  const location = useLocation();
  const womanInfo = location;
  // console.log(chosenWoman, 'chosen woman');

  const [modalOpen, setModalOpen] = useState(false);
  const [yellowOpen, setYellowOpen] = useState(false);
  const [blueOpen, setBlueOpen] = useState(false);
  const [know, setKnow] = useState("");
  const [allKnow, setAllKnow] = useState([]);
  const [wonder, setWonder] = useState("");
  const [allWonder, setAllWonder] = useState([]);
  const [learn, setLearn] = useState("");
  const [allLearn, setAllLearn] = useState([]);

  // // let wom = {...woman}
  // console.log(location.woman);
  // console.log(know, "know");
  console.log(learn);
  function handleOrangeClick(e) {
    setModalOpen(true);
    console.log("true");
  }

  function handleYellowClick(e) {
    setYellowOpen(true);
    console.log("true");
  }

  function handleBlueClick(e) {
    setBlueOpen(true);
    console.log("true");
  }

  function handleCloseModal() {
    if (modalOpen) {
      setModalOpen(false);
    } else if (yellowOpen) {
      setYellowOpen(false);
    } else {
      setBlueOpen(false);
    }
  }
  function handleKnowSubmit(e) {
    e.preventDefault();
    if (user) {
      fetch(`/knows/${user.id}/${chosenWoman.id}`, {
        method: "POST",
        body: JSON.stringify({
          know: know,
          user_id: user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((data) => setAllKnow([...allKnow, data]));
    }
    // console.log(allKnow, 'knows updated')
    setKnow("");
  }

  function handleWonderSubmit(e){
    e.preventDefault();
    if(user){
      fetch(`/wonders/${user.id}/${chosenWoman.id}`, {
        method: "POST",
        body: JSON.stringify({
          wonder: wonder,
          user_id: user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((r) => r.json())
      .then((data) => setAllWonder([...allWonder, data]));
    }
    setWonder("");
  }

  function handleLearnSubmit(e){
    e.preventDefault();
    if(user){
      fetch(`/learns/${user.id}/${chosenWoman.id}`, {
        method: "POST",
        body: JSON.stringify({
          learn: learn,
          user_id: user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((r) => r.json())
      .then((data) => setAllLearn([...allLearn, data]));
    }
    setLearn("");
  }

  useEffect(() => {
    fetch(`/knows/${user.id}/${chosenWoman.id}`)
      .then((r) => r.json())
      .then((data) => {
        setAllKnow(data);
        console.log(allKnow, 'knows')
      });
  }, []);

  useEffect(() => {
    fetch(`/wonders/${user.id}/${chosenWoman.id}`)
    .then((r) => r.json())
    .then((data) => {
      setAllWonder(data);
      console.log(allWonder, 'wonders')
    });
  }, []);

  useEffect(() => {
    fetch(`/learns/${user.id}/${chosenWoman.id}`)
    .then((r) => r.json())
    .then((data) => {
      setAllLearn(data);
      console.log(allLearn, 'learns')
    });
  }, []);

  function handleDelete(el){
    console.log('deleted', el)
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if(confirmDelete && user){
      fetch(`/knows/${user.id}/${el.id}`, {
        method: "DELETE",
      });
      updatedOrangePostIts(el)
    }
  }

  function handleWonderDelete(el){
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if(confirmDelete && user){
      fetch(`/wonders/${user.id}/${el.id}`, {
        method: "DELETE",
      });
      updatedYellowPostIts(el)
    }
  }

  function handleLearnDelete(el){
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if(confirmDelete && user){
      fetch(`/learns/${user.id}/${el.id}`, {
        method: "DELETE",
      });
      updatedBluePostIts(el)
    }
  }

  function updatedOrangePostIts(el){
    const rerenderedOrangePostIts = allKnow.filter((post) => post.id !== el.id);
    setAllKnow(rerenderedOrangePostIts)
  }

  function updatedYellowPostIts(el){
    const rerenderedYellowPostIts = allWonder.filter((post) => post.id !== el.id);
    setAllWonder(rerenderedYellowPostIts)
  }

  function updatedBluePostIts(el){
    const rerenderedBluePostIts = allLearn.filter((post) => post.id !== el.id);
    setAllLearn(rerenderedBluePostIts)
  }

  return (
    <div>
        <button onClick={handleBackClick} className='kwl-back-button'>back</button>
      <div
        className="kwl-whole-chart-div"
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <p className="kwl-name">{chosenWoman.name}</p>
            <img src={chosenWoman.image_path} height="180px" width="190px"/>
            <h4 className="add-postit-font">Add a post-it!</h4>
          </div>
          <div
            className="left-postit-div"
          >
            <div
              style={{
                width: "5vw",
                height: "5vw",
                backgroundColor: "#FFCD1D",
              }}
              onClick={(e) => handleOrangeClick(e)}
            ></div>
            <div
              style={{
                width: "5vw",
                height: "5vw",
                backgroundColor: "#FAF472",
              }}
              onClick={(e) => handleYellowClick(e)}
            ></div>
            <div
              style={{
                width: "5vw",
                height: "5vw",
                backgroundColor: "#71FFE5",
              }}
              onClick={(e) => handleBlueClick(e)}
            ></div>
          </div>
          {modalOpen && !yellowOpen && !blueOpen ? (
            <form onSubmit={handleKnowSubmit}>
              <input
                type="text"
                placeholder="What I know..."
                value={know}
                onChange={(e) => setKnow(e.target.value)}
                className="orange-input-postit"
              />
              <br />
              <div className="save-and-x">
              <button className="save-postit">Save</button>
              <button onClick={handleCloseModal} className="x-button">X</button>
              </div>
            </form>
          ) : null}
          {yellowOpen && !modalOpen && !blueOpen ? (
            <form onSubmit={handleWonderSubmit}>
              <input
                type="text"
                placeholder="What I wonder..."
                value={wonder}
                onChange={(e) => setWonder(e.target.value)}
                className="yellow-input-postit"
              />
              <br />
              <div className="save-and-x">
              <button className="save-postit">Save</button>
              <button onClick={handleCloseModal} className="x-button">X</button>
              </div>
            </form>
          ) : null}
          {blueOpen && !modalOpen && !yellowOpen ? (
            <form onSubmit={handleLearnSubmit}>
              <input
                type="text"
                placeholder="What I learned..."
                value={learn}
                onChange={(e) => setLearn(e.target.value)}
                className="blue-input-postit"
              />
              <br />
              <div className="save-and-x">
              <button className="save-postit">Save</button>
              <button onClick={handleCloseModal} className="x-button">X</button>
              </div>
            </form>
          ) : null}
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="chart-divs"
          >
            <div
              style={{
                width: "20vw",
                height: "5vh",
                backgroundColor: "#FFCD1D",
                color: "white",
              }}
              className="chart-headers"
            >
              What I know
            </div>
            <div style={{display: "flex", flexWrap: "wrap", textAlign: "center", justifyContent: "center", alignItems: "center", height: "50vh", overflow: "scroll"}}>
            {allKnow.map((el) => {
              return <div  className="orange-postits"><button onClick={() => handleDelete(el)} className='remove-postit'>x</button><p className="notes">{el.know}</p></div>
            })}
            </div>
          </div>
          <div
            className="chart-divs"
          >
            <div
              style={{
                width: "20vw",
                height: "5vh",
                backgroundColor: "#FAF472",
                color: "white",
              }}
              className="chart-headers"
            >
              What I wonder
            </div>
            <div style={{display: "flex", flexWrap: "wrap", textAlign: "center", justifyContent: "center", alignItems: "center", height: "50vh", overflow: "scroll"}}>
            {allWonder.map((el) => {
              return <div className="yellow-postits"><button onClick={() => handleWonderDelete(el)} className='remove-postit'>x</button><p className="notes">{el.wonder}</p></div>
            })}
            </div>
          </div>
          <div
            className="chart-divs"
          >
            <div
              style={{
                width: "20vw",
                height: "5vh",
                backgroundColor: "#71FFE5",
                color: "white",
              }}
              className="chart-headers"
            >
              What I learned
            </div>
            <div style={{display: "flex", flexWrap: "wrap", textAlign: "center", justifyContent: "center", alignItems: "center", height: "50vh", overflow: "scroll"}}>
            {allLearn.map((el) => {
              return <div className="blue-postits"><button onClick={() => handleLearnDelete(el)} className='remove-postit'>x</button><p className="notes">{el.learn}</p></div>
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
