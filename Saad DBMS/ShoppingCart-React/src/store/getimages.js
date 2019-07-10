import axios from "axios"
import React from "react"
import {connect} from "react-redux";


class Images extends React.Component{
    constructor(){
        super()

        this.state ={
            imagesArr : [],
            response : false,
            count : 0
        }    
        axios.get("/getImages")
       .then(res => {
           this.setState({imagesArr : res.data,response : true})
           // imagesArr = res.data
           console.log("res",res.data)
       })   
    }

    render() {
        // console.log("render",this.state.imagesArr)
        if(this.state.response){
            this.getImages()
        }
        // this.componentDidMount()
        // console.log("render")
        return <div>i</div>
    }

    getImages = () => {
        // console.log("images",this.state.imagesArr)
        const imagesURL = this.state.imagesArr.map(elem => {
            return elem.url
        })
        this.setState({imagesArr : imagesURL,response : false})
        console.log("imagesURL",imagesURL)
    }

    

}



const mapStateToProps = (state) => {
    return {
        userLogin : state.userLogin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getImages : (arr)  => {
            dispatch({
                type : "GET_IMAGES",
                imagesArr : arr
            }) 
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Images);