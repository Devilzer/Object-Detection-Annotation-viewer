const inputImg = document.getElementById("file_input");
const inputJson = document.getElementById("json_input");
const button = document.getElementById("submit_btn");
let detections = JSON.parse(localStorage.getItem("detections")) || [];
var image="";
var json="";

inputImg.addEventListener("change",()=>{
    try {
        const file = inputImg.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load',()=>{
                image = reader.result;
                console.log(image);
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
    //chaecking whether any field is empty.
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
            detections.push(object);
            localStorage.setItem("detections",JSON.stringify(detections));
        
        image="";
        json="";
        inputImg.value="";
        inputJson.value="";
    }
});