import React from "react"
import axios from "axios"
import {connect} from "react-redux";


class Checking extends React.Component{
    constructor(){
        super()
        this.state = {
            images : [],
            imagesData : []
        }
        axios.get("/getImages")
        .then(res=>{

            console.log("images",res.data.images)
            console.log("imagesData",res.data.imagesData)
            const images = []
            res.data.images.forEach((elem) => {
                const obj = {
                    public_id : elem.public_id,
                    url : elem.url
                }
                images.push(obj)
            })
            this.setState({images : images,imagesData : res.data.imagesData })
            this.gatheringDataWithImg()
        })
        .catch(err => console.log("error",err))
    }


    gatheringDataWithImg = () => {
        const {images,imagesData} = this.state
        const temp = []
        images.forEach((image) => {
            imagesData.forEach((imagedata)=> {
                if(image.public_id === imagedata.imageID){
                    const completeImgObj = {
                        name : imagedata.name,
                        price : imagedata.price,
                        stock : imagedata.stock,
                        category : imagedata.category,
                        img : image.url
                    }
                    temp.push(completeImgObj)
                    console.log("yessssssss")
                }
            })
        })
        this.props.imagesData(temp)

    }

    render()   {
        console.log("images",this.state.images,this.state.images.length) 
        return(
            <div>
                {this.state.images.map((elem,index) => {
                    return(
                        <div key={Math.random() }>
                            <img  src={elem.url} alt="not found"></img>
                            <h1></h1>
                        </div>
                    )
                })}
                <div>test</div>
            </div>

            
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        imagesData : (arr)  => {
            dispatch({
                type : "IMAGES_DATA",
                imagesArr : arr
            }) 
        }

    }
}
  


export default connect(mapStateToProps, mapDispatchToProps)(Checking);

// export default Checking