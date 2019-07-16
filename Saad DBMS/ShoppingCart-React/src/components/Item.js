import React, { Component } from 'react';
import '../index.css'

import Cart from './Cart/Cart';
import ProductGrid from './Cart/ProductGrid.js';
import FilterTabs from './Cart/FilterTabs.js';
import TitleBar from './Cart/TitleBar.js';

import {connect} from "react-redux";
import axios from 'axios';

// import Images from '../store/getimages';   

class App extends Component {
    constructor() {
        super();

        this.sendToCart = this.sendToCart.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.state = {
            images : [],
            imagesData : [],
            products: []
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
                    // console.log("yessssssss")
                }
            })
        })
        this.props.imagesData(temp)

    }


    sendToCart(newProduct) {
        this.setState({
            products: [...this.state.products, newProduct]
        })
    }
    applyFilter(category) {
        this.setState({
                ...this.state,
            productsToFilter: category
        })
    }
    deleteProduct(productToDelete) {
        console.log(`product to delete is ${productToDelete}`);
        console.log(productToDelete);
        this.setState({
            ...this.state,
            products: this.state.products.filter((singleProduct, key) => {
                return key !== productToDelete.productKey;
            })
        })
    }
      render() {
        console.log("images",this.state.images,this.state.images.length) 

        return (

                <div className="container">
                    <TitleBar title="E - Dealers | Items"></TitleBar>
                    <FilterTabs />
                        <div className="app-container container">
                            <div className="inner-container">
                                    <ProductGrid filterProducts={this.state.productsToFilter} onAddToCart={this.sendToCart}/>
                            </div>
                 
                                <Cart />
                          </div>
                </div>
        )
      }
    }


const mapStateToProps = (state) => {
    return {}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
