import React from "react"
import swal from "sweetalert"
import {connect} from "react-redux";
// import { Redirect } from 'react-router'
// import {NavLink} from 'react-router-dom';


class Logout extends React.Component{

    render(){
        var Logout = false
        swal({
            title: "Are you sure?",
            // text: "Your will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            closeOnConfirm: false
          },
          function(){
                console.log("this",this)
                swal("Successfully Logout", "", "success");
                this.props.history.push('/')  
                this.props.logout()
                          // return(<Redirect to="/Logout/true"/>)
            
        }.bind(this));
        if(!Logout){
            console.log("in if")
            this.props.history.goBack()
        }       // return(<Redirect to="/Logout/true"/>)
        
          return(
              <div>""</div>
          )

    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout : ()  => {
            dispatch({
                type : "LOGOUT"
            }) 
        }
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(Logout);
