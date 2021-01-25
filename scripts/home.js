const inputImg = document.getElementById("file_input");
const inputJson = document.getElementById("json_input");
const button = document.getElementById("submit_btn");
//
let files = JSON.parse(localStorage.getItem("files")) || [];
var image="";
var json="";

// function for getting the uploaded img file.
inputImg.addEventListener("change",()=>{
    try {
        const file = inputImg.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load',()=>{
                var newImg = new Image();
                newImg.src = reader.result;
                newImg.addEventListener('load',()=>{
                    var imgData = {
                        src : reader.result,
                        width : newImg.width,
                        height : newImg.height
                    };
                    image = imgData;
                });
            });
        }
        else{
            image="";
        }
    } catch (error) {
        image="";
        console.log("error in loading image ",error);
    }
});

//function for getting json from input text area.
inputJson.addEventListener("change",()=>{
    try {
        const data  = JSON.parse(inputJson.value);
        if(data){
            json = data;
            console.log(json);
        }
    } catch (error) {
        json="";
        console.log("error while prasing json data",error);
    }
});

button.addEventListener("click",()=>{
    //checking whether any field is empty.
    if(image==="" || json===""){
        console.log("error in getting data");
    }
    else{
        var id = Date.now();
        var object = {
            id : id,
            image : image,
            json : json
        };
        console.log(object);
        //chaecking for initial empty localstorage
            files.push(object);
            localStorage.setItem("files",JSON.stringify(files));
        
        image="";
        json="";
        inputImg.value="";
        inputJson.value="";
    }
});