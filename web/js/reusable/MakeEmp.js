function MakeEmp ( imgFile, name, title ) { //theCondition, thePrice, style
    
    var ele = document.createElement("div");
    ele.classList.add("emp"); // adds styling to ele - see emp.css rules for ".emp"
    
     // create img tag. Will be styled by rules (in obj.css) for ".emp img"
    var myImage = document.createElement("img");
    myImage.src = imgFile;
    ele.appendChild(myImage);
    
    // create h3 tag. Will be styled by rules (in obj.css) for ".emp h3"
    var myName = document.createElement("h3");
    myName.innerHTML = name; 
    ele.appendChild(myName);
    
    // create h4 tag. Will be styled by rules (in obj.css) for ".emp h4"
    var myTitle = document.createElement("h4");
    myTitle.innerHTML = title; 
    ele.appendChild(myTitle);

    return ele;
}