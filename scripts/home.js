const inputImg = document.getElementById("file_input");
const inputJson = document.getElementById("json_input");
const button = document.getElementById("submit_btn");
const imageCardsContainer = document.querySelector(".image-display-container");
var currentImage = "";
//
let files = JSON.parse(localStorage.getItem("files")) || [];
var image="";
var json="";

//initial loading and diplaying files
window.onload = function(){
    renderImageCards(files);
}

imageCardsContainer.addEventListener("click",(e)=>{
    let clickedCard = e.target.closest("div").id;
    if(clickedCard!==""){
        currentImage = clickedCard;
        localStorage.setItem("currentImage",JSON.stringify(currentImage));
        window.open("image_detail.html","_self");
    }
    
});

//imagecard rendering function.
function renderImageCards(files){
    imageCardsContainer.innerHTML="";
    for(let file of files){
        // console.log(file.image.src);
        var card = document.createElement("div");
        card.setAttribute("class","container");
        card.setAttribute("id",file.id);
        card.innerHTML=`<img src="${file.image.src}"/>`
        imageCardsContainer.appendChild(card);
    }
}


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
        return;
    }
});


//function for getting json from input text area.
inputJson.addEventListener("change",()=>{
    try {
        const data  = JSON.parse(inputJson.value);
        if(data){
            json = data;
        }
    } catch (error) {
        json="";
        console.log("error while prasing json data",error);
        return;
    }
});


//input data submission handler
button.addEventListener("click",()=>{
    //checking whether any field is empty.
    if(image==="" || json===""){
        console.log("error in getting data");
        notie.alert({
            type: "warning",
            text: "Error in getting data please check inputs.",
            stay: false,
            time: 2, 
            position: "bottom"
          });
        return;
    }
    else{
        var id = Date.now();
        var object = {
            id : id,
            image : image,
            json : json
        };
        
        //chaecking for initial empty localstorage
        files.push(object);
        localStorage.setItem("files",JSON.stringify(files));
        image="";
        json="";
        inputImg.value="";
        inputJson.value="";
        renderImageCards(files);
        notie.alert({
            type: "success",
            text: "Image Added.",
            stay: false,
            time: 2, 
            position: "bottom"
          });
    }
});