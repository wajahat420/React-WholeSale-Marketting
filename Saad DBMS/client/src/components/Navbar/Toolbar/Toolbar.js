import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";

class Toolbar extends React.Component{
  

  // validateLogin = () => {
  //   console.log("inside validate")
  //   if(this.props.userLogin){
  //     swal({
  //       title: "Are you sure?",
  //       // text: "Your will not be able to recover this imaginary file!",
  //       type: "warning",
  //       showCancelButton: true,
  //       confirmButtonClass: "btn-danger",
  //       confirmButtonText: "Yes",
  //       closeOnConfirm: false
  //     },
  //     function(){
  //       console.log("hh")
  //       swal("Successfully Logout", "", "success");
  //       this.props.history.push('/')          // return(<Redirect to="/Logout/true"/>)
  //       // <NavLink to="/Logout/true"> abcd </NavLink>
        
  //       this.props.history.push("/")
  //     }.bind(this));
  //   } else{
  //     console.log("in else")
  //     this.props.history.push("/Login")

  //   }
  // } 

  render(){
    // console.log("Toolbar signupAs",this.props.signupAs)

    const userLogin = this.props.userLogin
    if(userLogin){
      var loginLogoutString = "/Logout"
    }else{
      loginLogoutString = "/Login"
    }

    return(
      <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo"><NavLink to="/">E - Dealers</NavLink></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/Item">Items</NavLink></li>
          <li><NavLink to="/About">About Us</NavLink></li>
          <li className={this.props.signupAs === "User" && "displayNone" }><NavLink to="/Upload"> Upload Item</NavLink></li>
          <li>  <NavLink to={loginLogoutString} >{userLogin ? "Logout" : "Login / Signup?"}</NavLink></li>
          {/* <NavLink to={loginLogoutString} ></NavLink> */}
          {/* onClick={this.validateLogin} */}
        </ul>
      </div>
    </nav>
  </header>

    )
  }
} 


const mapStateToProps = (state) => {
  return {
    signupAs : state.signupAs,
    userLogin : state.userLogin
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
      
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);
// export default toolbar;
