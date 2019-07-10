import React , {Component} from 'react';
import {BrowserRouter , Route} from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/Navbar/Navbar'
import Items from './components/Item'

import Login from './components/Login'
import Register from './components/Register'
import Upload from "./components/UploadImage"

import Checking from "./components/images"
class App extends Component {

  render () {
    // console.log("in app",Images)
    return (

      <BrowserRouter>
        <div className='App'>
          {/* <Images/> */}
          <NavBar/>
          <Route path='/Home' component = {Home} /> 
          <Route path='/Images' component = {Checking} /> 

          <Route path='/Item' component = {Items} />
          {/* <Login/> */}
          <Route path='/Login' component = {Login} />
          <Route path='/Register' component = {Register} />
          <Route path='/Upload' component = {Upload} />

        </div>       
      </BrowserRouter>
    );
  }
}
export default App