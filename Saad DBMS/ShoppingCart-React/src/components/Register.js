import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'

import sweetAlert from 'sweetalert';
import axios from "axios"


class App extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            error: null,
            signupAs : ""
            // users: [],
            // loading: false
        };
    }


    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    

    handleSignUp = event => {
        event.preventDefault()

        console.log("signup btn")

        const { firstName, lastName, phone, email, password ,signupAs } = this.state;

        if (!firstName.length || !lastName.length || !phone.length || !email.length || !password.length || !signupAs.length ) {
            this.setState({ error: "please fill out all the details", loading: false })
            return false;
        }else if(phone.length !== 11 ){
            this.setState({error : "Phone Number must be of 11 Numbers"})
            return false
        } else if (password.length < 6) { 
            this.setState({ error: "password should contain atleast 6 charecters", loading: false })
            return false;
        } else {
            console.log("sending data")
            const regesterData = {
                signupAs : signupAs,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                password: password
            };

            axios.post("/register",regesterData)
            .then(res => { 
                if(res.data){
                    console.log("successful signup")
                    this.props.history.push("/Item")
                }else{
                    sweetAlert('Error!!', "Email address already exists", 'warning')
                }
            })

        }
    };

  


    render() {
        console.log("signupAs",this.state.signupAs)
        const { firstName, lastName, phone, email, password, error } = this.state;

        return (
                <div className="box-signup">
                     <h3 className="loginaccount">LET'S CREATE YOUR ACCOUNT :</h3>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={this.handleSignUp}>
                                            <div className="inputtext">
                                                <label className="font-weight-bold small" htmlFor="firstName">Your First Name?</label>
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    autoFocus
                                                    className="userinputtext"
                                                    placeholder="Enter first name"
                                                    name="firstName"
                                                    onChange={this.handleOnchange}
                                                    value={firstName}
                                                />

                                            </div>
                                            <div className="inputtext">
                                                <label className="font-weight-bold small" htmlFor="lastName">Your Last Name?</label>
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    className="userinputtext"
                                                    placeholder="Enter last name"
                                                    name="lastName"
                                                    onChange={this.handleOnchange}
                                                    value={lastName}
                                                />

                                            </div>
                                            <div className="inputtext">
                                                <label className="font-weight-bold small" htmlFor="phoneNumber">Your Phone Number?</label>
                                                <input
                                                    id="phoneNumber"
                                                    type="number"
                                                    className="userinputtext"
                                                    placeholder="Enter phone number"
                                                    name="phone"
                                                    onChange={this.handleOnchange}
                                                    value={phone}
                                                />

                                            </div>
                                            <div className="inputtext">
                                                <label className="font-weight-bold small" htmlFor="email">Your Email address?</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="userinputtext"
                                                    placeholder="Enter email address"
                                                    name="email"
                                                    onChange={this.handleOnchange}
                                                    value={email}
                                                />

                                            </div>
                                            <div className="inputtext">
                                                <label className="font-weight-bold small" htmlFor="password">Your Password?</label>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="userinputtext"
                                                    placeholder="Enter password"
                                                    name="password"
                                                    autoComplete=''
                                                    onChange={this.handleOnchange}
                                                    value={password}
                                                />
                                            </div>
                                            {error && <p className="text-center text-red text-danger mt-3 mb-2 ">{error}</p>}
                                            <div className="inputtext radio">
                                                <p>CREATE AS:</p>

                                                <label  htmlFor="shopkeeper">Shopkeeper</label>
                                                <input onClick={()=> this.setState({signupAs : "Shopkeeper"})}
                                                 name="grp1" value="Shopkeeper"  id="shopkeeper"
                                                 type="radio"/>

                                                <label  htmlFor="user">User</label>
                                                <input onClick={()=> this.setState({signupAs : "User"})}
                                                 name="grp1" value="User" id="user"
                                                 type="radio"/>
                                            </div>
                                            <div className="">
                                                <button  className="signinbtn">Sign Up</button>
                                            </div>
                                        </form>
                                    </div>
                            </div>
                                <span className="registerbtn">Have an account ? <Link to="/Login">Login</Link></span>
                    <br />
                </div>
        )
    }
}
export default App;
