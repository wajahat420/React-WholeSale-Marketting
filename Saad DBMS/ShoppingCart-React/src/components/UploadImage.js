import React from "react"
import "../css/UploadImage.css"
import axios from "axios"
import sweetalert from "sweetalert"



class Upload extends React.Component {

    state = {
        imageURL : "",
        name : "",
        price : "",
        stock : "",
        category : "",
        loading : false
    }

    encodeBase64(URL){
        // String.prototype.compress("abcd")
        let a = lzw_encode(URL)
        this.setState({imageURL : a})
        // console.log("length",a.length)
        // localStorage.setItem("imageURL" , a)
        // console.log("compressed",a)
        // axios.post("/upload",{
        //     imageURL : URL
        // })
        // .then(res => console.log("uploadImage req send",res))
        // .catch(err => console.log("error in req",err))
        function lzw_encode(s) {
            var dict = {};
            var data = (s + "").split("");
            var out = [];
            var currChar;
            var phrase = data[0];
            var code = 256;
            for (let i=1; i<data.length; i++) {
                currChar=data[i];
                if (dict[phrase + currChar] != null) {
                    phrase += currChar;
                }
                else {
                    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                    dict[phrase + currChar] = code;
                    code++;
                    phrase=currChar;
                }
            }
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            for (let i=0; i<out.length; i++) {
                out[i] = String.fromCharCode(out[i]);
            }
            // console.log("in lzw",s)
            return out.join("");
        }
    }

    change = (event) => {
        // console.log("change func")
        this.setState({[event.target.name] : event.target.value})
    }

    upload = () => {   
        var{imageURL,name,price,stock,category} = this.state
   
        // console.log("stock",this.state.stock)

        if(category.toLowerCase() === "fruit"){
            category = "fruits"
        }
        else if(category.toLowerCase() === "vegetable"){
            category = "vegetables"
        }

        if(imageURL === "" || name === "" || price === "" || stock === "" ||
         category === "") {
            sweetalert("Not Submit","Please fill all details","warning")
        }
        else if(category.toLowerCase() !== "fruits" && category.toLowerCase() !==
         "vegetables" && category.toLowerCase() !== "grocery" ){
            sweetalert("Wrong Category","Please Enter a valid Category","warning")
        }
        else if(parseInt(price).toString() !== price){
            sweetalert("Wrong Price","Please Enter a Number","warning")
        }
        else if(parseInt(stock).toString() !== stock){
            sweetalert("Wrong Stock","Please Enter a Number","warning")
        }
        else{

            // console.log("fileName",this.state.fileName,"dataURL",this.state.dataURL)
            this.setState({loading : true})


            axios.post("/upload",{
                imageURL : this.state.imageURL,
                name : this.state.name,
                price : this.state.price,
                stock : this.state.stock,
                category : this.state.category.toLowerCase(),
                adminEntry : true
            })
            .then(res =>{
                this.setState({loading : false})
                if(res.data){
                    sweetalert("Successfully Submit","","success")
                    console.log("successfully uploaded data")
                    this.setState({imageURL : "",name:"",price:"",stock:"",category:""})
                }
                else{
                    sweetalert("Not Submit","Please try again","error")
                }
            })    
            .catch(err => {
                this.setState({loading : false})
                sweetalert("Not Submit","Please try again","error")
                console.log("error",err)
            })
        }
    }
    file =  (event) => {
        const input = event.target;
            // console.log("event",event.target.value)
            const reader = new FileReader();
            reader.onload = () => {
                console.log("onload ")

                const dataURL = reader.result;
                // const fileName = input.files[0].name
                this.setState({imageURL : dataURL})
                // console.log("dataURL",dataURL.length)
                // this.encodeBase64(dataURL)

        }
        reader.onloadstart = () => {
            console.log("load start")
        }
        reader.onloadend = () => {
            console.log("load end")
        }    
        reader.readAsDataURL(input.files[0]);

    }

    render(){
        // console.log("stock",this.state.stock)
        // console.log("name",this.state.name)
        // console.log("price",this.state.price)
        // console.log("category",this.state.category)
        // console.log("price",this.state.imageURL)

        // console.log("URL",this.state.dataURL)
        return(
            <div className=" upload-image">
                <h1>INSERT DATA</h1>
                <div className={this.state.loading ?"lds-ring" : ""}>
                    <div></div>
                    <div></div>

                </div>
                
                <p className="file">
                    <label htmlFor="fileName">Image => </label>
                    <input id="fileName"  type="file"  onChange={  this.file}   /> <br/>
                </p>

                <input type="text" name="name" value={this.state.name} onChange={this.change}   placeholder="Name"></input> <br/>
                <input name="price" value={this.state.price} onChange={this.change} type="text" placeholder="Price"></input> <br/>
                <div className=""></div>
                {/* <div className=""></div> */}
                <input name="stock" value={this.state.stock} onChange={this.change} type="text" placeholder="Stock"></input> <br/>
                <input name="category" value={this.state.category} onChange={this.change} type="text" placeholder="Category"></input> <br/>


                <input onClick={ this.upload} type="button" value="Submit"/>
            </div>
        )
    }
}

export default Upload