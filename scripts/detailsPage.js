paper.install(window);
window.onload = function() {
	// Setup directly from canvas id:
    paper.setup('canvas');
    const canvas = document.getElementById("canvas");
    const details = document.querySelector(".lable-details");
    const currentId = JSON.parse(localStorage.getItem("currentImage"));
    const files = JSON.parse(localStorage.getItem("files"));


    //getting current image file info from id..
    const currentFile=files.find(file=>file.id==currentId);
    console.log(currentFile)
    
    //placing image in center
    var raster = new paper.Raster({source:currentFile.image.src,  position: view.center});
    var center={x:250,y:200}

    //traversing thru detected objects
    for(let object of currentFile.json.objects){
        //random color for each object
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        var path = new Path.Rectangle([(center.x-(currentFile.image.width/2))+object.x,(center.y-(currentFile.image.height/2))+object.y], [object.width,object.height]);

        path.strokeColor='red';
        path.fillColor = "#" + randomColor;
        path.opacity = .4;
        var element = document.createElement("h3");
         element.innerText   = `${object.label} :- ${object.confidence}`
        element.style.color = "#" + randomColor;
        details.appendChild(element);
    }
};