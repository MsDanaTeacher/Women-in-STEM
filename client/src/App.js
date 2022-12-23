import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomeContainer from "./components/HomePage/HomeContainer";
import WomenContainer from "./components/Women/WomenContainer";
import BookContainer from "./components/BookPage/BookContainer";
import CollectionContainer from "./components/MyCollection/CollectionContainer";
import NavBar from "./NavBar";
import "./App.css";
import KwlChart from "./components/MyCollection/KwlChart";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok){
        r.json().then((user) => setUser(user));
      }
    });
  }, []);


  return (
    <>
    <div className="App">
    <NavBar user={user} setUser={setUser}/>
    {/* <Login/> */}
    <Switch>
          <Route path="/women"><WomenContainer user={user}/></Route>
          <Route path="/books"><BookContainer user={user}/></Route>
          <Route path="/mycollection"><CollectionContainer user={user} setUser={setUser}/></Route>
          {/* <Route path={`/womannotes/:userid/:womanid`}><KwlChart user={user}/></Route> */}
          <Route exact path="/"><HomeContainer user={user} setUser={setUser}/></Route>
          <Route path="*"><h1>Oops, this page has not been created yet!</h1></Route>
    </Switch>
    </div>
    </>
  );
}

export default App;