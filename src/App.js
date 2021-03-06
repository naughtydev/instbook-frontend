import React, {useEffect, createContext, useReducer, useContext} from "react";
import {useHistory, BrowserRouter as Router } from "react-router-dom";
import {reducer, initialState} from './reducer/reducer'
import { Switch, Route } from "react-router";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Menu from "./components/screens/Menu";
import Home from "./components/screens/Home";
import Profile from './components/screens/Profile'
import "./style/style.scss";
import { ToastProvider} from 'react-toast-notifications'
import  '../src/axios-instance'

export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    if (user) dispatch({ type: "USER", payload: user });
    else history.push("/signin");
  },[]);

 
  return(
    <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/signin">
      <Login />
    </Route>
    <Route path="/signup">
      <Register />
    </Route>
    <Route path="/user/:username">
      <Profile />
    </Route>
  </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
      <UserContext.Provider value={{state, dispatch}}>
        <ToastProvider>
      <Router>
        <Menu />
        <Routing />
      </Router>
      </ToastProvider>
      </UserContext.Provider>
  );
}

export default App;
