import React,{useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";

function App() {
  const [{basket},dispatch]=useStateValue();

  //useEffect runs based on given condition
  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user is logged in..
        dispatch({
          type:"SET_USER",
          user:authUser,
        });
      }
      else{
        //user logged out..
        dispatch({
          type:"SET_USER",
          user:null,
        });
      }
    });
    return ()=>{
      unsubscribe();
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/checkout">
          <Header/>
          <Checkout/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
