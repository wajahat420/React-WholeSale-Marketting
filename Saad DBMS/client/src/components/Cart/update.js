import React from "react"
import "../../css/update.css"
import swal from "sweetalert"
import axios from "axios"
import { Redirect } from 'react-router'

class Update extends React.Component{
    state = {
        price : "",
        stock : "",
        redirect : ""
    }

    change = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    update = (name)  => {
        console.log("nameee",name)
        const{price,stock} = this.state
        if(price === "" || stock === ""){
            swal("Enter all details!!","Not Submitted","error")
        }else if(parseInt(price).toString() !== price || parseInt(stock).toString() !== stock ){
            swal("Enter valid details!!","Not Submitted","error")
        }else{
            axios.post("/updateItem",{
                name : name,
                price : this.state.price,
                stock : this.state.stock
            })
            .then(res =>{
                if(res.data){
                    this.setState({redirect : <Redirect to="/"  />})
                    swal("Successfully Updated..","","success")
                }else{
                    swal("Unsuccessfull Update","Please Try Again","error")
                }

            } )
            .catch(err => console.log("error",err))
        }

        console.log("price",this.state.price)
        console.log("stock",this.state.stock)
    }

    render(){
        const redirect = this.state.redirect
        return(
            <div className="update">
                {redirect}
                <h1>Name : {this.props.name}</h1>
                <table>
                    <tbody>

                        <tr>
                            <td className="label"><label>Item Price</label></td>
                            <td><input className="price" type="text" 
                                    placeholder="Price" value={this.state.price}
                                    onChange={this.change} name="price" /></td>
                        </tr>
                        <tr>
                            <td className="label"><label>Item Stock</label></td>
                            <td><input className="stock" type="text" 
                                        placeholder="Stock" value={this.state.stock}
                                    onChange={this.change} name="stock" /></td>
                        </tr>
                    </tbody>
                </table>
                

                 <div className="bottom">
                     <input className="cancleBtn"  type="button"
                            onClick={this.props.cancle}  value="cancle"/>
                     <input className="updateBtn" type="button" 
                     onClick={() => this.update(this.props.name)}  value="update"/>
                 </div>
            </div>
        )
    }
}

export default Update