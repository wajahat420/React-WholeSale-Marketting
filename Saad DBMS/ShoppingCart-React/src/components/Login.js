import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import '../css/login.css'

import axios from "axios"
import sweetAlert from 'sweetalert';
import {connect} from "react-redux";

class App extends Component {

    state = {
        email: "",
        password: "",
        error: null,
        // users: null
    };


    // componentDidMount() {
    //     // const users = localStorage.getItem("users");
    //     this.setState({ users: JSON.parse(users) })
    // }

    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleSignUp = event => {
        event.preventDefault()
        // fetch("https://res.cloudinary.com/recources/image")
        // .then(res => {
        //     console.log(res);
        // })

        
        const { email, password } = this.state;
        console.log("email",email,"password",password)
        if (!email.length || !password.length) {
            this.setState({ error: "please fill out all the details" })
            return false;
        } else {
            console.log("post req given ")
            this.setState({ error: "" })
            axios.post("/login",{
                email : this.state.email,
                password : this.state.password
            })
            .then(res => {
                // console.log("res.data",res.data)
                if(!res.data){
                    sweetAlert("Error!","Invalid Signin","warning")
                }else{
                    console.log("success signin")
                    this.props.userIsLogin(this.state.email)
                    this.props.history.push("/Item")
                }
            } )
        }
    };



    
    render() {

        const { email, password, error } = this.state;
        return (
            
            <div className="box">   
              <h3 className="loginaccount">LOG IN TO YOUR ACCOUNT</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSignUp}>

                            <div className="inputtext">
                                <label className="font-weight-bold small" htmlFor="email">Email address:</label>

                                <input
                                    type="email"
                                    id="email"
                                    className="userinputtext"
                                    placeholder="Enter email address here"
                                    name="email"
                                    onChange={this.handleOnchange}
                                    value={email}
                                />

                </div>
                <div className="inputtext">
                    <label className="font-weight-bold small" htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="userinputtext"
                            placeholder="Password here"
                            name="password"
                            autoComplete=''
                            onChange={this.handleOnchange}
                            value={password}
                        />
                </div>
                {error && <p className="text-red text-danger mt-3 mb-2 text-center">{error}</p>}
                <button onClick={() => this.handleSignUp} className="signinbtn"> Log In </button>
                </form>
                 </div>
                    <span className="registerbtn">Don't have an account ? <Link to="/Register">Register?</Link></span>
                    <br />
                </div>
              </div>
 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin : state.userLogin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userIsLogin : (email)  => {
            dispatch({
                type : "USER_LOGIN",
                Email : email
            }) 
        }
    }
}
  


export default connect(mapStateToProps, mapDispatchToProps)(App);